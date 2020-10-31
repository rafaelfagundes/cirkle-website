import { Grid, useMediaQuery } from "@material-ui/core";
import Axios from "axios";
import _orderBy from "lodash/orderBy";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Card from "../src/components/Card";
import CartItem from "../src/components/CartItem";
import CheckBoxWithLabel from "../src/components/CheckboxWithLabel";
import Column from "../src/components/Column";
import CustomButton from "../src/components/CustomButton";
import CustomTextField from "../src/components/CustomTextField";
import EmptyPage from "../src/components/EmptyPage";
import FreeDeliveryMeter from "../src/components/FreeShippingMeter";
import Layout from "../src/components/Layout";
import Padding from "../src/components/Padding";
import PaymentType from "../src/components/PaymentType";
import SelectMenu, {
  AssetType,
  SelectItem,
} from "../src/components/SelectMenu";
import SimpleText from "../src/components/SimpleText";
import SizedBox from "../src/components/SizedBox";
import Title from "../src/components/Title";
import { useCart } from "../src/hooks/cart/useCart";
import Menu from "../src/modules/menu/Menu";
import ShippingData from "../src/modules/shippingData/ShippingData";
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
  Subvalue,
  Value,
} from "../styles/pages/cart";

function Cart({ menu }: { menu: Menu }): JSX.Element {
  const router = useRouter();

  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));
  const cartContext = useCart();

  const postalCode = useRef(null);

  const [hasCoupon, setHasCoupon] = useState(false);
  const [shippingList, setShippingList] = useState([]);
  const [shippingLoading, setShippingLoading] = useState(false);

  const [initialLoading, setInitialLoading] = useState(false);

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

  const _calculateShipping = async () => {
    const _postalCode =
      postalCode.current?.children[0].value ||
      cartContext?.cart?.shipping?.postalCode;

    if (!_postalCode) {
      return false;
    }

    const shippingData: ShippingData = {
      to: {
        postal_code: _postalCode,
      },
      products: [],
    };

    cartContext.cart.items.forEach((item) => {
      shippingData.products.push({
        height: item.pHeight,
        id: item.uid,
        insurance_value: item.price,
        length: item.pLength,
        quantity: item.cartQty,
        weight: item.pWeight,
        width: item.pWidth,
      });
    });

    try {
      setShippingLoading(true);
      const response = await Axios.post("/shippingcalc", shippingData);

      const _shippingList: Array<SelectItem> = [];

      const _sortedResponse = _orderBy(response.data, ["price"], ["asc"]);

      _sortedResponse.forEach((item: any) => {
        const selected = item.id === cartContext?.cart?.shipping?.id;

        if (!item?.error) {
          _shippingList.push({
            assetType: AssetType.IMAGE,
            selected,
            text: `${item?.company?.name} ${item.name}`,
            value: item.id,
            assetValue: item?.company?.picture,
            secondaryText: `${item.currency} ${item.price} (${item.delivery_range.min} à ${item.delivery_range.max} dias úteis)`,
            secondaryValue: item.price,
          });
        }
      });

      setShippingList(_shippingList);
      setShippingLoading(false);
    } catch (error) {
      setShippingLoading(false);
      console.log("_calculateShipping -> error", error);
    }
  };

  useEffect(() => {
    const shipping = shippingList.filter((item) => item.selected);

    if (shipping.length === 1) {
      cartContext.setShipping({
        id: shipping[0].value,
        postalCode: postalCode.current?.children[0].value.replace("-", ""),
        type: shipping[0].text,
        value: shipping[0].secondaryValue,
      });
    }
  }, [shippingList]);

  // useEffect(() => {
  //   // console.log("cartcontext refresh", initialLoading);
  //   if (cartContext?.cart?.shipping?.postalCode && !initialLoading) {
  //     console.log("calcular inicialmente", initialLoading);
  //     setInitialLoading(true);
  //     _calculateShipping();
  //   }
  // }, [cartContext]);

  useEffect(() => {
    _calculateShipping();
  }, [cartContext.cart.items.length]);

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
                    {_showShippingSelect() && (
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
                            onClick={_calculateShipping}
                            loading={shippingLoading}
                          >
                            Calcular
                          </CustomButton>
                        </Row>
                        {false && (
                          <Row spaceBetween>
                            <Subvalue>Rua Frederico Ozanan, 150</Subvalue>
                            <CustomButton
                              type="primary"
                              variant="outlined"
                              onClick={null}
                              small
                            >
                              Alterar
                            </CustomButton>
                          </Row>
                        )}
                        {shippingList.length > 0 && (
                          <>
                            <SizedBox height={16}></SizedBox>
                            <SelectMenu
                              items={shippingList}
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
