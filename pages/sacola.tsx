import { Grid, useMediaQuery } from "@material-ui/core";
import Axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Card from "../src/components/Atoms/Card";
import Column from "../src/components/Atoms/Column";
import CustomButton from "../src/components/Atoms/CustomButton";
import CustomTextField, {
  getCustomTextFieldValue,
  setCustomTextFieldValue,
} from "../src/components/Atoms/CustomTextField";
import Padding from "../src/components/Atoms/Padding";
import PaymentType from "../src/components/Atoms/PaymentType";
import SelectMenu, { SelectItem } from "../src/components/Atoms/SelectMenu";
import SizedBox from "../src/components/Atoms/SizedBox";
import Subtitle from "../src/components/Atoms/Subtitle";
import TextLink from "../src/components/Atoms/TextLink";
import Title from "../src/components/Atoms/Title";
import CartItem from "../src/components/Molecules/CartItem";
import FreeDeliveryMeter from "../src/components/Molecules/FreeShippingMeter";
import EmptyPage from "../src/components/Templates/EmptyPage";
import Layout from "../src/components/Templates/Layout";
import Colors from "../src/enums/Colors";
import { useAuth } from "../src/hooks/auth/useAuth";
import { useCart } from "../src/hooks/cart/useCart";
import Menu from "../src/modules/menu/Menu";
import theme from "../src/theme/theme";
import {
  CartFooter,
  CartItems,
  Label,
  MainColumn,
  Row,
  SideColumn,
  StyledCartContainer,
  Value,
} from "../styles/pages/cart";

function Cart({ menu }: { menu: Menu }): JSX.Element {
  const router = useRouter();

  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));
  const cartContext = useCart();
  const authContext = useAuth();
  const postalCode = useRef(null);

  const [shippingLoading, setShippingLoading] = useState(false);

  const [hasCoupon, setHasCoupon] = useState(false);

  // Scroll to top when page is loaded
  useEffect(() => {
    if (process.browser) window.scrollTo(0, 0);
  }, []);

  const _goToHome = () => {
    typeof window !== "undefined" && router.push("/");
  };

  const _goTo = (route: string) => {
    typeof window !== "undefined" && router.push(route);
  };

  const _getShippingValue = () => {
    const shippingValue = cartContext.cart.shippingList.filter(
      (item) => item.selected
    )[0]?.secondaryValue;

    if (cartContext.cart.freeShipping) {
      if (cartContext.cart.subtotal < cartContext.cart.freeShippingValue) {
        if (shippingValue) {
          return (
            <Value>
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(shippingValue)}
            </Value>
          );
        } else {
          return "";
        }
      } else {
        return <Value>GRÁTIS</Value>;
      }
    } else {
      if (shippingValue) {
        return (
          <Value>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(shippingValue)}
          </Value>
        );
      } else {
        return "";
      }
    }
  };

  const _showShippingSelect = () => {
    if (cartContext.cart.freeShipping) {
      if (cartContext.cart.subtotal < cartContext.cart.freeShippingValue) {
        return true;
      }
      return false;
    } else {
      return true;
    }
  };

  const _isShippingPaid = () => {
    if (cartContext.cart.freeShipping) {
      if (cartContext.cart.subtotal < cartContext.cart.freeShippingValue) {
        return true;
      }
      return false;
    } else {
      return false;
    }
  };

  const setShippingList = (list: Array<SelectItem>) => {
    cartContext.setShippingList(list);
  };

  const calculateShipping = async (_postalCode = null) => {
    setShippingLoading(true);
    if (typeof _postalCode === "string") {
      await cartContext.calculateShipping(_postalCode);
    } else {
      await cartContext.calculateShipping(getCustomTextFieldValue(postalCode));
    }
    setShippingLoading(false);
  };

  const calculatePredefinedPostalCode = async () => {
    const userAddress = authContext.user.addresses.filter(
      (address) => address.mainAddress
    );
    if (userAddress) {
      setCustomTextFieldValue(postalCode, userAddress[0].postalCode);
      calculateShipping(userAddress[0].postalCode);
    }
  };

  const userDefaultAddress = () => {
    const userAddress = authContext.user.addresses.filter(
      (address) => address.mainAddress
    );
    if (userAddress) {
      return userAddress[0].postalCode;
    }
  };

  const userHasSavedAddress = () => {
    return authContext.user.addresses.length;
  };

  useEffect(() => {
    if (cartContext?.cart?.items?.length) {
      const _postalCode =
        getCustomTextFieldValue(postalCode) ||
        cartContext?.cart?.shipping?.postalCode;

      if (_postalCode) {
        calculateShipping(_postalCode);
      }
    }
  }, [cartContext.cart.items.length]);

  return (
    <Layout menu={menu}>
      <>
        <StyledCartContainer>
          {cartContext?.cart?.items?.length > 0 && (
            <>
              <MainColumn isSmartPhone={isSmartPhone}>
                <Card padding={false} shadow={false}>
                  <SizedBox height={isSmartPhone ? 32 : 16}></SizedBox>
                  <Padding horizontal={16}>
                    <Title size={18}>Sacola de Compras</Title>
                  </Padding>
                  <SizedBox height={16}></SizedBox>
                  <CartItems>
                    {cartContext?.cart?.items.map((item, index) => (
                      <CartItem
                        key={index}
                        item={item}
                        showBackground={index % 2 === 0}
                        showSelects
                      ></CartItem>
                    ))}
                  </CartItems>
                </Card>
              </MainColumn>
              <SizedBox width={isSmartPhone ? 0 : 16}></SizedBox>
              <SideColumn isSmartPhone={isSmartPhone}>
                <Card shadow={false}>
                  <CartFooter isSmartPhone={isSmartPhone}>
                    <Row spaceBetween>
                      <Label>Subtotal</Label>
                      <Value>
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(cartContext.cart.subtotal)}
                      </Value>
                    </Row>
                    <SizedBox height={16}></SizedBox>
                    <Row spaceBetween>
                      <Label>Frete</Label>
                      {_getShippingValue()}
                    </Row>
                    {_isShippingPaid() && (
                      <>
                        <SizedBox height={16}></SizedBox>
                        <Subtitle size={14} bold>
                          Simular Frete
                        </Subtitle>
                        <SizedBox height={16}></SizedBox>
                        <Row spaceBetween>
                          <CustomTextField
                            ref={postalCode}
                            type="postalCode"
                            initialValue={
                              cartContext?.cart?.shipping?.postalCode
                            }
                          >
                            CEP de Destino
                          </CustomTextField>
                          <CustomButton
                            onClick={calculateShipping}
                            loading={shippingLoading}
                          >
                            Calcular
                          </CustomButton>
                        </Row>
                        <SizedBox height={8}></SizedBox>
                        {userHasSavedAddress() && (
                          <>
                            <TextLink
                              onClick={calculatePredefinedPostalCode}
                              color={Colors.SECONDARY}
                              size={14}
                            >
                              {`Calcular para ${userDefaultAddress()}?`}
                            </TextLink>
                            <SizedBox height={8}></SizedBox>
                          </>
                        )}
                      </>
                    )}

                    {_showShippingSelect() && (
                      <>
                        {!cartContext?.cart?.loadingShipping &&
                          cartContext?.cart?.shippingList?.length > 0 && (
                            <>
                              <SizedBox height={16}></SizedBox>
                              <SelectMenu
                                items={cartContext.cart.shippingList}
                                setSelected={setShippingList}
                                title="Selecione o frete"
                                errorText=""
                                radioButtonList
                              ></SelectMenu>
                            </>
                          )}
                      </>
                    )}
                    <SizedBox height={16}></SizedBox>
                    {_isShippingPaid() && (
                      <>
                        <FreeDeliveryMeter
                          current={cartContext.cart.subtotal}
                          max={cartContext.cart.freeShippingValue}
                        ></FreeDeliveryMeter>
                        <SizedBox height={24}></SizedBox>
                      </>
                    )}
                    <Row spaceBetween>
                      <Label>Total</Label>
                      <Value>
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(cartContext.cart.total)}
                      </Value>
                    </Row>
                    <SizedBox height={16}></SizedBox>
                    <Row>
                      <CustomButton
                        width={340}
                        variant="contained"
                        type="success"
                        onClick={() => _goTo("/comprar/envio")}
                      >
                        Comprar
                      </CustomButton>
                    </Row>
                    <SizedBox height={24}></SizedBox>

                    {/* <CheckBoxWithLabel
                      value={hasCoupon}
                      onClick={() => setHasCoupon(!hasCoupon)}
                      label="Tenho um cupom de desconto"
                    ></CheckBoxWithLabel>
                    <SizedBox height={hasCoupon ? 8 : 0}></SizedBox>

                    <OpacityAnimation animate={hasCoupon}>
                      <CustomTextField type="coupon" showIcon>
                        Insira seu cupom de desconto
                      </CustomTextField>
                    </OpacityAnimation> */}

                    <SizedBox height={hasCoupon ? 24 : 16}></SizedBox>
                    <Title>Aceitamos</Title>
                    <SizedBox height={10}></SizedBox>
                    <>
                      <Grid container spacing={8}>
                        <Grid item xs={2}>
                          <PaymentType
                            border
                            type="mastercard"
                            size={42}
                          ></PaymentType>
                        </Grid>
                        <Grid item xs={2}>
                          <PaymentType
                            border
                            type="visa"
                            size={42}
                          ></PaymentType>
                        </Grid>
                        <Grid item xs={2}>
                          <PaymentType
                            border
                            type="amex"
                            size={42}
                          ></PaymentType>
                        </Grid>
                        <Grid item xs={2}>
                          <PaymentType
                            border
                            type="dinersclub"
                            size={42}
                          ></PaymentType>
                        </Grid>
                        <Grid item xs={2}>
                          <PaymentType
                            border
                            type="elo"
                            size={42}
                          ></PaymentType>
                        </Grid>
                      </Grid>
                      <SizedBox height={16}></SizedBox>
                      <Grid container spacing={8}>
                        <Grid item xs={2}>
                          <PaymentType
                            border
                            type="hipercard"
                            size={42}
                          ></PaymentType>
                        </Grid>
                        <Grid item xs={2}>
                          <PaymentType
                            border
                            type="boleto"
                            size={42}
                          ></PaymentType>
                        </Grid>
                        <Grid item xs={2}>
                          <PaymentType
                            border
                            type="loterica"
                            size={42}
                          ></PaymentType>
                        </Grid>
                      </Grid>
                      <SizedBox height={16}></SizedBox>
                    </>
                    {/* <SizedBox height={24}></SizedBox>
                    <Title>Compartilhar Sacola</Title>
                    <SizedBox height={10}></SizedBox>
                    <Row>
                      <CustomButton
                        type="success"
                        variant="outlined"
                        icon="whatsapp"
                        onClick={null}
                        width={180}
                      >
                        Via WhatsApp
                      </CustomButton>
                      <SizedBox width={10}></SizedBox>
                      <CustomButton
                        type="primary"
                        variant="outlined"
                        onClick={null}
                        width={150}
                      >
                        Via E-mail
                      </CustomButton>
                    </Row>
                    <SizedBox height={10}></SizedBox>
                    <SimpleText size={0.8}>
                      Compartilhe para continuar em outro aparelho ou envie para
                      outra pessoa concluir a compra
                    </SimpleText> */}
                  </CartFooter>
                </Card>
              </SideColumn>
            </>
          )}

          {cartContext?.cart?.items?.length === 0 && (
            <Column>
              <SizedBox height={72}></SizedBox>
              <EmptyPage
                buttonAction={_goToHome}
                buttonText="Explorar"
                icon="bag"
                subtitle="Não perca tempo, adicione os melhores produtos."
                title="A sacola está vazia"
              ></EmptyPage>
              <SizedBox height={72}></SizedBox>
            </Column>
          )}
        </StyledCartContainer>
      </>
    </Layout>
  );
}

export async function getStaticProps(): Promise<any> {
  const menuUrl = `${process.env.API_ENDPOINT}/menu`;
  const menuResult = await Axios.get(menuUrl);
  const menu = menuResult.data;

  return {
    props: {
      menu,
    },
    revalidate: 60,
  };
}

export default Cart;
