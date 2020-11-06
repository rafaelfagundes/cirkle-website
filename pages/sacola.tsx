import { Grid, useMediaQuery } from "@material-ui/core";
import Axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import Card from "../src/components/Card";
import CartItem from "../src/components/CartItem";
import Center from "../src/components/Center";
import CheckBoxWithLabel from "../src/components/CheckboxWithLabel";
import Column from "../src/components/Column";
import CustomButton from "../src/components/CustomButton";
import CustomTextField from "../src/components/CustomTextField";
import EmptyPage from "../src/components/EmptyPage";
import FreeDeliveryMeter from "../src/components/FreeShippingMeter";
import Layout from "../src/components/Layout";
import LinkButton from "../src/components/LinkButton";
import LoadingAnimation from "../src/components/LoadingAnimation";
import Padding from "../src/components/Padding";
import PaymentType from "../src/components/PaymentType";
import SelectMenu, {
  AssetType,
  SelectItem,
} from "../src/components/SelectMenu";
import SimpleText from "../src/components/SimpleText";
import SizedBox from "../src/components/SizedBox";
import Title from "../src/components/Title";
import { useAuth } from "../src/hooks/auth/useAuth";
import { useCart } from "../src/hooks/cart/useCart";
import Address from "../src/modules/address/Address";
import Menu from "../src/modules/menu/Menu";
import theme from "../src/theme/theme";
import {
  CartFooter,
  CartItems,
  Label,
  MainColumn,
  OpacityAnimation,
  Row,
  SideColumn,
  StyledCartContainer,
  Value,
} from "../styles/pages/cart";

function Cart({ menu }: { menu: Menu }): JSX.Element {
  const router = useRouter();

  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));
  const cartContext = useCart();

  const postalCode = useRef(null);

  const [hasCoupon, setHasCoupon] = useState(false);

  const [showCEPField, setShowCEPField] = useState(false);

  const authContext = useAuth();
  const { data: addressData, error } = useSWR("/addresses", {
    initialData: authContext?.user?.addresses,
  });
  if (error) console.log("Address loading error", error);

  // Scroll to top when page is loaded
  useEffect(() => {
    if (process.browser) window.scrollTo(0, 0);
  }, []);

  const _goToHome = () => {
    typeof window !== "undefined" && router.push("/");
  };

  const _getShippingValue = () => {
    if (cartContext.cart.freeShipping) {
      if (cartContext.cart.subtotal < cartContext.cart.freeShippingValue) {
        if (cartContext.cart.shipping?.value) {
          return (
            <Value>
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(cartContext.cart.shipping?.value)}
            </Value>
          );
        } else {
          return "";
        }
      } else {
        return <Value>GRÁTIS</Value>;
      }
    } else {
      if (cartContext.cart.shipping?.value) {
        return (
          <Value>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(cartContext.cart.shipping?.value || 0)}
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

  const _showFreeDeliveryMeter = () => {
    if (cartContext.cart.freeShipping) {
      if (cartContext.cart.subtotal < cartContext.cart.freeShippingValue) {
        return true;
      }
      return false;
    } else {
      return false;
    }
  };

  const _showShippingCEPField = () => {
    if (!authContext.user) return true;
    return showCEPField;
  };

  const _showAddressList = () => {
    if (!authContext.user) return false;
    return !showCEPField;
  };

  const setShippingList = (list: Array<SelectItem>) => {
    cartContext.setShippingList(list);
  };

  const setAddress = (items: Array<SelectItem>) => {
    const selectedAddress = items.find((item: SelectItem) => item.selected);

    if (selectedAddress) {
      const address = addressData.find(
        (item: Address) => item.postalCode === selectedAddress.value
      );

      cartContext.setAddress(address);
    }
  };

  const getUserAddresses = () => {
    const finalItems: Array<SelectItem> = [];
    addressData?.forEach((address: Address) => {
      let selectedAddress = false;

      if (address.postalCode === cartContext.cart.address?.postalCode) {
        selectedAddress = true;
      }

      finalItems.push({
        assetType: AssetType.NONE,
        selected: selectedAddress,
        text: `${address.street}, ${address.number}`,
        value: address.postalCode,
        secondaryText: `${address.city} - ${address.state}`,
      });
    });

    return finalItems;
  };

  const setPostalCode = () => {
    console.log("postalCode", postalCode.current.children[0].value);

    cartContext.setShipping({
      id: null,
      postalCode: postalCode.current.children[0].value,
      type: null,
      value: null,
    });
  };

  return (
    <Layout menu={menu}>
      <>
        <StyledCartContainer>
          {cartContext.cart.items.length > 0 && (
            <>
              <MainColumn isSmartPhone={isSmartPhone}>
                <Card padding={false} shadow={false}>
                  <SizedBox height={isSmartPhone ? 32 : 16}></SizedBox>
                  <Padding horizontal={16}>
                    <Title size={18}>Sacola de Compras</Title>
                  </Padding>
                  <SizedBox height={16}></SizedBox>
                  <CartItems>
                    {cartContext.cart.items.map((item, index) => (
                      <CartItem
                        key={index}
                        item={item}
                        showBackground={index % 2 === 0}
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
                    {_showAddressList() && (
                      <>
                        <SizedBox height={14}></SizedBox>
                        <SelectMenu
                          items={getUserAddresses()}
                          setSelected={setAddress}
                          title="Endereços Cadastrados"
                          placeholder="Selecione o endereço cadastrado"
                          errorText=""
                        ></SelectMenu>
                        <SizedBox height={8}></SizedBox>
                      </>
                    )}
                    {_showShippingCEPField() && (
                      <>
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
                            onClick={setPostalCode}
                            loading={cartContext.cart.loadingShipping}
                          >
                            Calcular
                          </CustomButton>
                        </Row>
                        <SizedBox height={8}></SizedBox>
                      </>
                    )}

                    {authContext.user && (
                      <LinkButton
                        onClick={() => setShowCEPField(!showCEPField)}
                      >
                        {showCEPField
                          ? "Mostrar endereços cadastrados"
                          : "Calcular por CEP"}
                      </LinkButton>
                    )}

                    {_showShippingSelect() && (
                      <>
                        {!cartContext.cart.loadingShipping &&
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
                        {cartContext.cart.loadingShipping && (
                          <>
                            <SizedBox height={16}></SizedBox>
                            <Center>
                              <LoadingAnimation
                                color
                                size={48}
                              ></LoadingAnimation>
                            </Center>
                            <SizedBox height={16}></SizedBox>
                          </>
                        )}
                      </>
                    )}
                    <SizedBox height={16}></SizedBox>
                    {_showFreeDeliveryMeter() && (
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
                        onClick={null}
                      >
                        Comprar
                      </CustomButton>
                    </Row>
                    <SizedBox height={24}></SizedBox>

                    <CheckBoxWithLabel
                      value={hasCoupon}
                      onClick={() => setHasCoupon(!hasCoupon)}
                      label="Tenho um cupom de desconto"
                    ></CheckBoxWithLabel>
                    <SizedBox height={hasCoupon ? 8 : 0}></SizedBox>

                    <OpacityAnimation animate={hasCoupon}>
                      <CustomTextField type="coupon" showIcon>
                        Insira seu cupom de desconto
                      </CustomTextField>
                    </OpacityAnimation>

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
                            type="aura"
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
                      </Grid>
                      <SizedBox height={16}></SizedBox>
                      <Grid container spacing={8}>
                        <Grid item xs={2}>
                          <PaymentType
                            border
                            type="discover"
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
                            type="jcb"
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
                      </Grid>
                      <SizedBox height={16}></SizedBox>
                      <Grid container spacing={8}>
                        <Grid item xs={2}>
                          <PaymentType
                            border
                            type="bank_transfer"
                            size={42}
                          ></PaymentType>
                        </Grid>
                      </Grid>
                    </>
                    <SizedBox height={24}></SizedBox>
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
                    </SimpleText>
                  </CartFooter>
                </Card>
              </SideColumn>
            </>
          )}

          {cartContext.cart.items.length === 0 && (
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
