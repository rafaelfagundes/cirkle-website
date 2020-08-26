import { useMediaQuery } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Column from "../src/components/Column";
import CustomButton from "../src/components/CustomButton";
import CustomSelect from "../src/components/CustomSelect";
import Icon from "../src/components/Icon";
import Padding from "../src/components/Padding";
import SizedBox from "../src/components/SizedBox";
import Title from "../src/components/Title";
import { Shipping, useCart } from "../src/hooks/use-cart";
import theme, { Colors } from "../src/theme/theme";

const StyledCartContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Label = styled.span`
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  text-transform: uppercase;
  letter-spacing: -0.25px;
  font-size: 16px;
  color: ${Colors.TYRIAN_PURPLE};
  font-weight: 700;
`;

const Value = styled.span`
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  text-transform: uppercase;
  letter-spacing: -0.25px;
  font-size: 16px;
  color: ${Colors.FOREST_GREEN_CRAYOLA};
  font-weight: 700;
`;

const Subvalue = styled.span`
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  letter-spacing: -0.25px;
  font-size: 13px;
  color: ${Colors.PRIMARY};
  font-weight: 500;
`;

const Row = styled.div<{ padding?: boolean; spaceBetween?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${(props) =>
    props.spaceBetween ? "space-between" : "center"};
  padding: ${(props) => (props.padding ? "0 16px" : 0)};
`;

const CartItems = styled.div``;

const CartItem = styled.div<{ showBackground: boolean }>`
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  background-color: ${(props) =>
    props.showBackground ? "rgba(0, 0, 0, 0.025)" : "transparent"};
`;

const CartItemImage = styled.div<{ image: string; size: number }>`
  background-image: ${(props) => `url("${props.image}");`};
  background-color: #cccccc;
  height: ${(props) => props.size * 1.25}px;
  width: ${(props) => props.size}px;
  min-width: 90px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
`;

const Description = styled.span`
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  color: ${Colors.TYRIAN_PURPLE};
  font-size: 16px;
  margin-left: 6px;
`;

const MoreInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  font-size: 14px;
`;

const Price = styled.span`
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  color: ${Colors.DARK_SEA_GREEN};
  font-weight: 700;
`;

const Color = styled.span`
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  color: ${Colors.TYRIAN_PURPLE};
`;

const Size = styled.span`
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  color: ${Colors.TYRIAN_PURPLE};
`;

const Qty = styled.span`
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  color: ${Colors.TYRIAN_PURPLE};
`;

const TitleAndRemove = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-left: 6px;
`;

const ImagePrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
`;

const CartFooter = styled.div<{ isSmartPhone: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  ${(props) => (props.isSmartPhone ? `width: 100%;` : "")};
  margin-bottom: ${(props) => (props.isSmartPhone ? "32px" : 0)};
`;

function Cart(): JSX.Element {
  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));
  const cartContext = useCart();
  const [showEdit, setShowEdit] = useState(false);
  const [deliveryType, setDeliveryType] = useState("normal");
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
    ];
  };

  const _getItemColors = (id: string) => {
    console.log("id", id);
    return [
      { title: "Preta", value: "Preta" },
      { title: "Vermelha", value: "Vermelha" },
      { title: "Azul Escuro", value: "Azul Escuro" },
      { title: "Rosa", value: "Rosa" },
      { title: "Laranja", value: "Laranja" },
      { title: "Bege", value: "Bege" },
    ];
  };

  const _getDeliveryTypes = () => {
    return [
      { title: "Normal (R$ 40)", value: "normal" },
      { title: "Expresso (R$ 50)", value: "express" },
    ];
  };

  const _updateDeliveryFee = () => {
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

  useEffect(() => {
    _updateDeliveryFee();
  }, [deliveryType]);

  return (
    <StyledCartContainer>
      <Padding horizontal={0} vertical={32}>
        <>
          <Padding horizontal={16} vertical={0}>
            <Title size={18}>Sacola de Compras</Title>
          </Padding>
          <SizedBox height={8}></SizedBox>
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
                      type="trash"
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
                      <CustomButton
                        type="primary"
                        variant="contained"
                        onClick={() => setShowEdit(false)}
                        small
                      >
                        Pronto
                      </CustomButton>
                    </>
                  )}
                  <SizedBox height={4}></SizedBox>
                </Column>
              </CartItem>
            ))}
          </CartItems>
        </>
      </Padding>
      <SizedBox width={isSmartPhone ? 0 : 32}></SizedBox>

      <CartFooter isSmartPhone={isSmartPhone}>
        <Padding vertical={isSmartPhone ? 0 : 32} horizontal={0}>
          <>
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
              <Value>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(cartContext.cart.shipping.value)}
              </Value>
            </Row>
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
            <SizedBox height={32}></SizedBox>
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
                width={300}
                variant="contained"
                type="success"
                onClick={null}
              >
                Comprar
              </CustomButton>
            </Row>
            <SizedBox height={8}></SizedBox>
          </>
        </Padding>
      </CartFooter>
    </StyledCartContainer>
  );
}

export default Cart;
