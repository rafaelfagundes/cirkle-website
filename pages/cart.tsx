import { Grid, useMediaQuery } from "@material-ui/core";
import Axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Card from "../src/components/Card";
import CheckBoxWithLabel from "../src/components/CheckboxWithLabel";
import Column from "../src/components/Column";
import CustomButton from "../src/components/CustomButton";
import CustomSelect from "../src/components/CustomSelect";
import CustomTextField from "../src/components/CustomTextField";
import EmptyPage from "../src/components/EmptyPage";
import FreeDeliveryMeter from "../src/components/FreeShippingMeter";
import Icon from "../src/components/Icon";
import Layout from "../src/components/Layout";
import Padding from "../src/components/Padding";
import PaymentType from "../src/components/PaymentType";
import SimpleText from "../src/components/SimpleText";
import SizedBox from "../src/components/SizedBox";
import Title from "../src/components/Title";
import { useCart } from "../src/hooks/cart/useCart";
import Shipping from "../src/modules/cart/CartShipping";
import Color from "../src/modules/color/Color";
import Menu from "../src/modules/menu/Menu";
import Size from "../src/modules/size/Size";
import theme from "../src/theme/theme";
import { cloudinaryImage } from "../src/utils/image";
import {
  CartFooter,
  CartItem,
  CartItemImage,
  CartItems,
  Description,
  ImagePrice,
  Label,
  MainColumn,
  MoreInfo,
  OpacityAnimation,
  Price,
  Qty,
  Row,
  SideColumn,
  StyledCartContainer,
  StyledColor,
  StyledSize,
  Subvalue,
  TitleAndRemove,
  Value,
} from "../styles/pages/cart";

function Cart({ menu }: { menu: Menu }): JSX.Element {
  const router = useRouter();

  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));
  const cartContext = useCart();
  const [showEdit, setShowEdit] = useState(false);
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

  const _getItemMaxQty = (qty: number) => {
    if (!qty) return [{ title: "1", value: 1 }];
    const qtyList = [];

    for (let index = 1; index <= qty; index++) {
      qtyList.push({ title: index.toString(), value: index });
    }

    return qtyList;
  };

  const _getItemSizes = (sizes: Array<Size>) => {
    if (sizes) {
      return sizes.map((item) => ({ title: item.value, value: item.value }));
    } else {
      return [{ title: "N/D", value: "N/D" }];
    }
  };

  const _getItemColors = (colors: Array<Color>) => {
    if (!colors) {
      return [{ title: "N/D", value: "N/D" }];
    } else {
      return colors.map((item) => ({ title: item.name, value: item.name }));
    }
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
            }).format(cartContext.cart.freeShippingValue)}
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
          }).format(cartContext.cart.freeShippingValue)}
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
                      <CartItem key={item.id} showBackground={index % 2 === 0}>
                        <Link href={`/products/${item.uid}`}>
                          <span style={{ cursor: "pointer" }}>
                            <ImagePrice>
                              <CartItemImage
                                image={cloudinaryImage(item.image, 112)}
                                size={90}
                              ></CartItemImage>
                              <SizedBox height={8}></SizedBox>
                              <Price>
                                {new Intl.NumberFormat("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                }).format(item.price)}
                              </Price>
                            </ImagePrice>
                          </span>
                        </Link>
                        <Column>
                          <Link href={`/products/${item.uid}`}>
                            <span style={{ cursor: "pointer" }}>
                              <TitleAndRemove>
                                <Title>{item.title}</Title>
                                <SizedBox width={16}></SizedBox>
                                <Icon
                                  size={16}
                                  type="remove"
                                  onClick={() =>
                                    cartContext.removeFromCart(item.id)
                                  }
                                ></Icon>
                              </TitleAndRemove>
                              <SizedBox height={8}></SizedBox>
                              <Description isSmartphone={isSmartPhone}>
                                {item.description}
                              </Description>
                              <SizedBox height={16}></SizedBox>
                            </span>
                          </Link>
                          <MoreInfo>
                            {isSmartPhone && !showEdit && (
                              <Padding horizontal={6}>
                                <>
                                  <Row spaceBetween>
                                    <StyledColor>
                                      Cor: {item.cartColor}
                                    </StyledColor>
                                    <SizedBox width={8}></SizedBox>
                                    <StyledSize>
                                      Tam.: {item.cartSize}
                                    </StyledSize>
                                    <SizedBox width={8}></SizedBox>
                                    <Qty>Qtd.: {item.cartQty}</Qty>
                                  </Row>
                                  <SizedBox height={8}></SizedBox>
                                  <Row spaceBetween>
                                    <CustomButton
                                      type="primary"
                                      variant="outlined"
                                      onClick={() => setShowEdit(true)}
                                      width={200}
                                      small
                                    >
                                      Editar Cor/Tam/Qtd
                                    </CustomButton>
                                  </Row>
                                </>
                              </Padding>
                            )}
                            {(!isSmartPhone || showEdit) && (
                              <>
                                <SizedBox width={8}></SizedBox>
                                <CustomSelect
                                  items={_getItemColors(item.colors)}
                                  label="Cor"
                                  value={item.cartColor || ""}
                                  setValue={(value) =>
                                    cartContext.updateColor(item.id, value)
                                  }
                                ></CustomSelect>
                                <SizedBox width={8}></SizedBox>
                                <CustomSelect
                                  items={_getItemSizes(item.sizes)}
                                  label="Tamanho"
                                  value={item.cartSize || ""}
                                  setValue={(value) =>
                                    cartContext.updateSize(item.id, value)
                                  }
                                ></CustomSelect>
                                <SizedBox width={8}></SizedBox>
                                <CustomSelect
                                  items={_getItemMaxQty(item.qty)}
                                  label="Quantidade"
                                  value={item.cartQty || ""}
                                  setValue={(value) =>
                                    cartContext.updateQuantity(item.id, value)
                                  }
                                ></CustomSelect>
                              </>
                            )}
                          </MoreInfo>
                          {isSmartPhone && showEdit && (
                            <>
                              <SizedBox height={16}></SizedBox>
                              <Padding horizontal={8}>
                                <CustomButton
                                  type="primary"
                                  variant="contained"
                                  onClick={() => setShowEdit(false)}
                                  small
                                >
                                  Pronto
                                </CustomButton>
                              </Padding>
                            </>
                          )}
                          <SizedBox height={4}></SizedBox>
                        </Column>
                      </CartItem>
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
                    <SimpleText>
                      Ao compartilhar você pode continuar em outro aparelho ou
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

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getStaticProps(): Promise<any> {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library

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
