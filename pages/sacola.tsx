import { Grid, useMediaQuery } from "@material-ui/core";
import Axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Card from "../src/components/Card";
import CartItem from "../src/components/CartItem";
import CheckBoxWithLabel from "../src/components/CheckboxWithLabel";
import Column from "../src/components/Column";
import CustomButton from "../src/components/CustomButton";
import CustomSelect from "../src/components/CustomSelect";
import CustomTextField from "../src/components/CustomTextField";
import EmptyPage from "../src/components/EmptyPage";
import FreeDeliveryMeter from "../src/components/FreeShippingMeter";
import Layout from "../src/components/Layout";
import Padding from "../src/components/Padding";
import PaymentType from "../src/components/PaymentType";
import SimpleText from "../src/components/SimpleText";
import SizedBox from "../src/components/SizedBox";
import Title from "../src/components/Title";
import { useCart } from "../src/hooks/cart/useCart";
import Shipping from "../src/modules/cart/CartShipping";
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
  Subvalue,
  Value,
} from "../styles/pages/cart";

function Cart({ menu }: { menu: Menu }): JSX.Element {
  const router = useRouter();

  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));
  const cartContext = useCart();

  const [deliveryType, setDeliveryType] = useState(null);

  const [postalCode] = useState("12345678");
  const [hasCoupon, setHasCoupon] = useState(false);

  // Scroll to top when page is loaded
  useEffect(() => {
    if (process.browser) window.scrollTo(0, 0);
  }, []);

  const _goToHome = () => {
    typeof window !== "undefined" && router.push("/");
  };

  const _getDeliveryTypes = () => {
    return [
      { title: "Normal (R$ 40)", value: "normal" },
      { title: "Expresso (R$ 50)", value: "express" },
    ];
  };

  const _updateDeliveryFee = () => {
    if (!deliveryType) return;
    let _shipping: Shipping = null;

    switch (deliveryType) {
      case "express":
        _shipping = {
          postalCode,
          type: "express",
          value: 50,
        };
        break;
      case "normal":
      default:
        _shipping = {
          postalCode,
          type: "normal",
          value: 40,
        };
        break;
    }
    cartContext.setShipping(_shipping);
  };

  const _getShippingValue = () => {
    if (cartContext.cart.freeShipping) {
      if (cartContext.cart.subtotal < cartContext.cart.freeShippingValue) {
        return (
          <Value>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(cartContext.cart.shipping?.value || 0)}
          </Value>
        );
      } else {
        return <Value>GRÁTIS</Value>;
      }
    } else {
      return (
        <Value>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(cartContext.cart.shipping?.value || 0)}
        </Value>
      );
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

  useEffect(() => {
    _updateDeliveryFee();
  }, [deliveryType]);

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
                        <CustomSelect
                          value={cartContext.cart?.shipping?.type}
                          setValue={setDeliveryType}
                          items={_getDeliveryTypes()}
                        ></CustomSelect>
                        <SizedBox height={16}></SizedBox>
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
