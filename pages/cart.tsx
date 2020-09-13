import { Grid, useMediaQuery } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Card from "../src/components/Card";
import Column from "../src/components/Column";
import CustomButton from "../src/components/CustomButton";
import CustomSelect from "../src/components/CustomSelect";
import EmptyPage from "../src/components/EmptyPage";
import FreeDeliveryMeter from "../src/components/FreeDeliveryMeter";
import Icon from "../src/components/Icon";
import Padding from "../src/components/Padding";
import PaymentType from "../src/components/PaymentType";
import SimpleText from "../src/components/SimpleText";
import SizedBox from "../src/components/SizedBox";
import Title from "../src/components/Title";
import { useCart } from "../src/hooks/use-cart";
import theme from "../src/theme/theme";
import Shipping from "../src/types/CartShipping";
import { cloudinaryImage } from "../src/utils/image";
import {
  CartFooter,
  CartItem,
  CartItemImage,
  CartItems,
  Color,
  Description,
  ImagePrice,
  Label,
  MainColumn,
  MoreInfo,
  Price,
  Qty,
  Row,
  SideColumn,
  Size,
  StyledCartContainer,
  Subvalue,
  TitleAndRemove,
  Value,
} from "../styles/pages/cart";

function Cart(): JSX.Element {
  const router = useRouter();

  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));
  const cartContext = useCart();
  const [showEdit, setShowEdit] = useState(false);
  const [deliveryType, setDeliveryType] = useState(null);
  // const [postalCode, setPostalCode] = useState(36309012);
  const [postalCode] = useState(36309012);

  // Scroll to top when page is loaded
  if (process.browser) window.scrollTo(0, 0);

  const _goToProducts = () => {
    router.push("/products");
  };

  const _getItemMaxQty = (qty: number) => {
    if (!qty) return [{ title: "1", value: 1 }];
    const qtyList = [];

    for (let index = 1; index <= qty; index++) {
      qtyList.push({ title: index.toString(), value: index });
    }

    return qtyList;
  };

  const _getItemSizes = (sizes: Array<string>) => {
    if (sizes) {
      return sizes.map((item) => ({ title: item, value: item }));
    } else {
      return [{ title: "M", value: "M" }];
    }
  };

  const _getItemColors = (colors: Array<string>) => {
    if (!colors) {
      return [
        { title: "Azul Escuro", value: "Azul Escuro" },
        { title: "Bege", value: "Bege" },
        { title: "Cinza", value: "Cinza" },
        { title: "Dourado", value: "Dourado" },
        { title: "Laranja", value: "Laranja" },
        { title: "Marrom", value: "Marrom" },
        { title: "Ouro", value: "Ouro" },
        { title: "Preto", value: "Preto" },
        { title: "Rosa", value: "Rosa" },
        { title: "Vermelho", value: "Vermelho" },
      ];
    } else {
      return colors.map((item) => ({ title: item, value: item }));
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
            }).format(cartContext.cart.shipping.value)}
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
          }).format(cartContext.cart.shipping.value)}
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
    <StyledCartContainer>
      {cartContext.cart.items.length > 0 && (
        <>
          <MainColumn isSmartPhone={isSmartPhone}>
            <Card padding={false}>
              <SizedBox height={isSmartPhone ? 32 : 16}></SizedBox>
              <Padding horizontal={16}>
                <Title size={18}>Sacola de Compras</Title>
              </Padding>
              <SizedBox height={16}></SizedBox>
              <CartItems>
                {cartContext.cart.items.map((item, index) => (
                  <CartItem key={item.id} showBackground={index % 2 === 0}>
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
                    <Column>
                      <TitleAndRemove>
                        <Title>{item.title}</Title>
                        <SizedBox width={16}></SizedBox>
                        <Icon
                          size={16}
                          type="remove"
                          onClick={() => cartContext.removeFromCart(item.id)}
                        ></Icon>
                      </TitleAndRemove>
                      <SizedBox height={8}></SizedBox>
                      <Description>{item.description}</Description>
                      <SizedBox height={8}></SizedBox>
                      <MoreInfo>
                        {isSmartPhone && !showEdit && (
                          <Padding horizontal={6}>
                            <>
                              <Row spaceBetween>
                                <Color>Cor: {item.cartColor}</Color>
                                <SizedBox width={8}></SizedBox>
                                <Size>Tam.: {item.cartSize}</Size>
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
            <Card>
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
                      value={cartContext.cart.shipping.type}
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
                <Title>Cupom de Desconto</Title>
                <SizedBox height={8}></SizedBox>
                <SimpleText>Tem cupom? Adicione na próxima tela.</SimpleText>
                <SizedBox height={24}></SizedBox>
                <Title>Nós aceitamos:</Title>
                <SizedBox height={16}></SizedBox>
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
                      <PaymentType border type="visa" size={42}></PaymentType>
                    </Grid>
                    <Grid item xs={2}>
                      <PaymentType border type="amex" size={42}></PaymentType>
                    </Grid>
                    <Grid item xs={2}>
                      <PaymentType border type="aura" size={42}></PaymentType>
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
                      <PaymentType border type="elo" size={42}></PaymentType>
                    </Grid>
                    <Grid item xs={2}>
                      <PaymentType
                        border
                        type="hipercard"
                        size={42}
                      ></PaymentType>
                    </Grid>
                    <Grid item xs={2}>
                      <PaymentType border type="jcb" size={42}></PaymentType>
                    </Grid>
                    <Grid item xs={2}>
                      <PaymentType border type="boleto" size={42}></PaymentType>
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
                <SizedBox height={8}></SizedBox>
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
              </CartFooter>
            </Card>
          </SideColumn>
        </>
      )}

      {cartContext.cart.items.length === 0 && (
        <Column>
          <SizedBox height={72}></SizedBox>
          <EmptyPage
            buttonAction={_goToProducts}
            buttonText="Explorar"
            icon="bag"
            subtitle="Não perca tempo, adicione os melhores produtos."
            title="A sacola está vazia"
          ></EmptyPage>
          <SizedBox height={72}></SizedBox>
        </Column>
      )}
    </StyledCartContainer>
  );
}

export default Cart;
