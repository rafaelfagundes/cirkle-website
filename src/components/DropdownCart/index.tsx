import { Popover, useMediaQuery, useTheme } from "@material-ui/core";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Colors } from "../../theme/theme";
import CustomButton from "../CustomButton";
import Icon from "../Icon";
import SizedBox from "../SizedBox";

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

const Title = styled.span`
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  color: ${Colors.TYRIAN_PURPLE};
  font-size: 18px;
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

function DropdownCart(): JSX.Element {
  const theme = useTheme();
  const isSmartphone = useMediaQuery(theme.breakpoints.down("xs"));

  const cartButton = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const cartItems = [
    {
      id: "d5b321a3-6ed3-41f3-aa2a-f970435f63d6",
      sku: "10bfbaeb-daad-4f8a-ab4b-7d76f208283c",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      price: 499.99,
      title: "Nike Free",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      qty: 1,
      color: "Laranja",
      size: "38",
    },
    {
      id: "8e896ae1-7b24-4bb2-b7dd-af1d7f29d112",
      sku: "9b5e7ae7-9c20-4d05-9afd-bb652ddf55d0",
      image:
        "https://images.unsplash.com/photo-1545289414-1c3cb1c06238?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      price: 399.99,
      title: "Puma One",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      qty: 1,
      color: "Azul Escuro",
      size: "38",
    },
    {
      id: "87eb4a73-1522-48ca-8204-cba367769038",
      sku: "ecbfbcf7-c426-487d-a508-ce83332dcad5",
      image:
        "https://images.unsplash.com/photo-1581067675198-463d66478d0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1239&q=80",
      price: 359.99,
      title: "Nike Air Force 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      qty: 1,
      color: "Bege",
      size: "38",
    },
  ];

  return (
    <>
      <IconHolder
        ref={cartButton}
        onClick={() => setIsOpen(true)}
        onMouseOver={isSmartphone ? null : () => setIsOpen(true)}
      >
        <Icon type="bag"></Icon>
      </IconHolder>
      <StyledCart
        id="cart-dropdown"
        open={isOpen}
        anchorEl={cartButton.current}
        onClose={() => setIsOpen(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{
          onMouseLeave: () => setTimeout(() => setIsOpen(false), 250),
        }}
      >
        <CartHeader>
          <CartHeaderText>Minha Sacola</CartHeaderText>
          <CartHeaderNumber>{cartItems.length}</CartHeaderNumber>
        </CartHeader>
        <CartItems height={window.innerHeight}>
          {cartItems.map((item, index) => (
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
                  <Icon size={16} type="trash"></Icon>
                </PriceAndButton>
              </Column>
            </CartItem>
          ))}
        </CartItems>
        <SizedBox height={16}></SizedBox>

        <Row spaceBetween padding>
          <Label>Subtotal</Label>
          <Value>R$ 400,00</Value>
        </Row>
        <SizedBox height={16}></SizedBox>
        <Row padding>
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
      </StyledCart>
    </>
  );
}

export default DropdownCart;
