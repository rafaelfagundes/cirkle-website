import { Popover, useMediaQuery } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import CustomButton from "../src/components/CustomButton";
import Icon from "../src/components/Icon";
import Padding from "../src/components/Padding";
import SizedBox from "../src/components/SizedBox";
import Title from "../src/components/Title";
import { CartItem as NewItem, useCart } from "../src/hooks/use-cart";
import theme, { Colors } from "../src/theme/theme";

const IconHolder = styled.div`
  width: 36px;
  height: 36px;
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const StyledCart = styled(Popover)``;

const CartHeader = styled.div`
  background-color: ${Colors.TYRIAN_PURPLE};
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 8px 8px 16px;
`;

const CartHeaderText = styled.span`
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  text-transform: uppercase;
  letter-spacing: -0.25px;
  font-size: 16px;
  color: ${Colors.WHITE};
  font-weight: 700;
`;

const CartHeaderNumber = styled.span`
  flex-direction: row;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  text-transform: uppercase;
  letter-spacing: -0.25px;
  font-size: 14px;
  color: ${Colors.TYRIAN_PURPLE};
  font-weight: 700;
  background-color: ${Colors.WHITE};
  width: 22px;
  height: 22px;
  border-radius: 11px;
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

const CartText = styled.p`
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  text-transform: uppercase;
  letter-spacing: 0px;
  font-size: 14px;
  color: ${Colors.RED_PINK};
  font-weight: 700;
`;

const Row = styled.div<{ padding?: boolean; spaceBetween?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${(props) =>
    props.spaceBetween ? "space-between" : "center"};
  padding: ${(props) => (props.padding ? "0 16px" : 0)};
`;

const CartItems = styled.div<{ height: number }>`
  max-height: ${(props) => props.height - 250}px;
  overflow: scroll;
`;

const CartItem = styled.div<{ showBackground: boolean }>`
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${(props) =>
    props.showBackground ? "rgba(0, 0, 0, 0.025)" : "transparent"};
`;

const CartItemImage = styled.div<{ image: string; size: number }>`
  background-image: ${(props) => `url("${props.image}");`};
  background-color: #cccccc;
  height: ${(props) => props.size}px;
  width: ${(props) => props.size * 0.75}px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin-right: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Description = styled.span`
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  color: ${Colors.TYRIAN_PURPLE};
  /* background-color: ${Colors.TYRIAN_PURPLE}; */
  font-size: 16px;
  max-width: 300px;
`;

const MoreInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
`;

const PriceAndButton = styled(MoreInfo)``;

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

function Cart(): JSX.Element {
  const isSmartphone = useMediaQuery(theme.breakpoints.down("sm"));
  const cartContext = useCart();

  const newItem: NewItem = {
    id: "27b5f262-85a1-483d-a86a-b17cbaf0d697",
    sku: "TABAUATFRADEL8575",
    color: "Branca/Amarela",
    image:
      "https://images.unsplash.com/photo-1504659913281-61817e6e2e9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",
    description: "Meia para simular a vida de besta do Didi Mocó",
    price: 30,
    qty: 2,
    size: "M",
    title: "Meia Didi Mocó",
  };

  const updateItem: NewItem = {
    id: "27b5f262-85a1-483d-a86a-b17cbaf0d697",
    sku: "TABAUATFRADEL8575",
    color: "Branca/Amarela",
    image:
      "https://images.unsplash.com/photo-1504659913281-61817e6e2e9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",
    description: "Meia para simular a vida de besta do Didi Mocó",
    price: 30,
    qty: 4,
    size: "M",
    title: "Meia Didi Mocó",
  };

  return (
    <Padding horizontal={isSmartphone ? 16 : 0} vertical={32}>
      <>
        <Title>Sacola de Compras</Title>
        <CartHeader>
          <CartHeaderText>Minha Sacola</CartHeaderText>
          <CartHeaderNumber>{cartContext.cart.items.length}</CartHeaderNumber>
        </CartHeader>
        <CartItems height={window.innerHeight}>
          {cartContext.cart.items.map((item, index) => (
            <CartItem key={item.id} showBackground={index % 2 !== 0}>
              <CartItemImage image={item.image} size={120}></CartItemImage>
              <Column>
                <Title>{item.title}</Title>
                <SizedBox height={2}></SizedBox>
                <Description>{item.description}</Description>
                <SizedBox height={4}></SizedBox>
                <MoreInfo>
                  <Color>Cor: {item.color}</Color>
                  <Size>Tam.: {item.size}</Size>
                  <Qty>Qtd.: {item.qty}</Qty>
                </MoreInfo>
                <SizedBox height={4}></SizedBox>
                <PriceAndButton>
                  <Price>
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(item.price)}
                  </Price>
                  <Icon
                    size={16}
                    type="trash"
                    onClick={() => cartContext.removeFromCart(item.id)}
                  ></Icon>
                </PriceAndButton>
              </Column>
            </CartItem>
          ))}
        </CartItems>
        <SizedBox height={16}></SizedBox>

        <Row spaceBetween padding>
          <Label>Subtotal</Label>
          <Value>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(cartContext.cart.subtotal)}
          </Value>
        </Row>
        <SizedBox height={16}></SizedBox>
        <Row padding>
          <CustomButton
            width={200}
            variant="outlined"
            type="primary"
            onClick={() => cartContext.addToCart(newItem)}
          >
            Adicionar Item
          </CustomButton>
          <SizedBox width={16}></SizedBox>
          <CustomButton
            width={200}
            variant="outlined"
            type="primary"
            onClick={() => cartContext.updateItem(updateItem)}
          >
            Atualizar Item
          </CustomButton>
          <SizedBox width={16}></SizedBox>
          <CustomButton
            width={200}
            variant="outlined"
            type="primary"
            onClick={null}
          >
            Ver Sacola
          </CustomButton>
          <SizedBox width={16}></SizedBox>
          <CustomButton
            width={200}
            variant="contained"
            type="success"
            onClick={null}
          >
            Comprar
          </CustomButton>
        </Row>
        <SizedBox height={8}></SizedBox>
        <Row>
          <CartText>Frete Grátis para Compras Acima de R$200</CartText>
        </Row>
      </>
    </Padding>
  );
}

export default Cart;
