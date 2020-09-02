import { Grid, useMediaQuery } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Column from "../src/components/Column";
import CustomButton from "../src/components/CustomButton";
import CustomSelect from "../src/components/CustomSelect";
import EmptyBag from "../src/components/EmptyBag";
import FreeDeliveryMeter from "../src/components/FreeDeliveryMeter";
import Icon from "../src/components/Icon";
import Padding from "../src/components/Padding";
import PaymentType from "../src/components/PaymentType";
import SimpleText from "../src/components/SimpleText";
import SizedBox from "../src/components/SizedBox";
import Title from "../src/components/Title";
import Colors from "../src/enums/Colors";
import { useCart } from "../src/hooks/use-cart";
import theme from "../src/theme/theme";
import Shipping from "../src/types/Shipping";
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
  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));
  const cartContext = useCart();
  const [showEdit, setShowEdit] = useState(false);
  const [deliveryType, setDeliveryType] = useState(null);
  const [postalCode, setPostalCode] = useState(36309012);

  // const newItem: NewItem = {
  //   id: "27b5f262-85a1-483d-a86a-b17cbaf0d697",
  //   sku: "TABAUATFRADEL8575",
  //   color: "Branca/Amarela",
  //   image:
  //     "https://images.unsplash.com/photo-1504659913281-61817e6e2e9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",
  //   description: "Meia para simular a vida de besta do Didi Mocó",
  //   price: 30,
  //   qty: 2,
  //   size: "M",
  //   title: "Meia Didi Mocó",
  // };

  // const updateItem: NewItem = {
  //   id: "27b5f262-85a1-483d-a86a-b17cbaf0d697",
  //   sku: "TABAUATFRADEL8575",
  //   color: "Branca/Amarela",
  //   image:
  //     "https://images.unsplash.com/photo-1504659913281-61817e6e2e9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",
  //   description: "Meia para simular a vida de besta do Didi Mocó",
  //   price: 30,
  //   qty: 4,
  //   size: "M",
  //   title: "Meia Didi Mocó",
  // };

  const _getItemMaxQty = (id: string) => {
    console.log("id", id);
    return [
      { title: "1", value: 1 },
      { title: "2", value: 2 },
      { title: "3", value: 3 },
      { title: "4", value: 4 },
    ];
  };

  const _getItemSizes = (id: string) => {
    console.log("id", id);
    return [
      { title: "36", value: "36" },
      { title: "37", value: "37" },
      { title: "38", value: "38" },
      { title: "39", value: "39" },
      { title: "40", value: "40" },
      { title: "41", value: "41" },
      { title: "42", value: "42" },
      { title: "43", value: "43" },
      { title: "44", value: "44" },
      { title: "45", value: "45" },
      { title: "P", value: "P" },
      { title: "M", value: "M" },
      { title: "G", value: "G" },
      { title: "GG", value: "GG" },
    ];
  };

  const _getItemColors = (id: string) => {
    console.log("id", id);
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
    // console.log("Frete grátis", cartContext.cart.freeShipping);
    // console.log("Frete grátis a partir de", cartContext.cart.freeShippingValue);
    // console.log("Subtotal", cartContext.cart.subtotal);

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
          <MainColumn
            isSmartPhone={isSmartPhone}
            style={{
              display: "flex",
              flex: 2,
              flexDirection: "column",
              backgroundColor: Colors.WHITE,
            }}
          >
            <Padding horizontal={16}>
              <Title size={18}>Sacola de Compras</Title>
            </Padding>
            <SizedBox height={16}></SizedBox>
            <CartItems>
              {cartContext.cart.items.map((item, index) => (
                <CartItem key={item.id} showBackground={index % 2 === 0}>
                  <ImagePrice>
                    <CartItemImage image={item.image} size={90}></CartItemImage>
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
                      <Icon
                        size={16}
                        type="remove-fill"
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
                              <Color>Cor: {item.color}</Color>
                              <SizedBox width={8}></SizedBox>
                              <Size>Tam.: {item.size}</Size>
                              <SizedBox width={8}></SizedBox>
                              <Qty>Qtd.: {item.qty}</Qty>
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
                            items={_getItemColors(item.id)}
                            label="Cor"
                            value={item.color}
                            setValue={(value) =>
                              cartContext.updateColor(item.id, value)
                            }
                          ></CustomSelect>
                          <SizedBox width={8}></SizedBox>
                          <CustomSelect
                            items={_getItemSizes(item.id)}
                            label="Tamanho"
                            value={item.size}
                            setValue={(value) =>
                              cartContext.updateSize(item.id, value)
                            }
                          ></CustomSelect>
                          <SizedBox width={8}></SizedBox>
                          <CustomSelect
                            items={_getItemMaxQty(item.id)}
                            label="Quantidade"
                            value={item.qty}
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
          </MainColumn>
          <SizedBox width={isSmartPhone ? 0 : 16}></SizedBox>
          <SideColumn isSmartPhone={isSmartPhone}>
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
                    <PaymentType border type="discover" size={42}></PaymentType>
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
              <Title>Compartilhar Carrinho</Title>
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
                  icon="email"
                  onClick={null}
                  width={150}
                >
                  Via E-mail
                </CustomButton>
              </Row>
            </CartFooter>
          </SideColumn>
        </>
      )}

      {cartContext.cart.items.length === 0 && (
        <Column>
          <SizedBox height={72}></SizedBox>
          <EmptyBag></EmptyBag>
          <SizedBox height={72}></SizedBox>
        </Column>
      )}
    </StyledCartContainer>
  );
}

export default Cart;
