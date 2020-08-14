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
  background-color: ${Colors.RED_PINK};
  flex-direction: row;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
`;

const CartHeaderText = styled.span`
  font-family: FuturaPT;
  text-transform: uppercase;
  letter-spacing: -0.25px;
  font-size: 16px;
  color: ${Colors.WHITE};
  font-weight: 700;
`;

const Label = styled.span`
  font-family: FuturaPT;
  text-transform: uppercase;
  letter-spacing: -0.25px;
  font-size: 16px;
  color: ${Colors.TYRIAN_PURPLE};
  font-weight: 700;
`;

const Value = styled.span`
  font-family: FuturaPT;
  text-transform: uppercase;
  letter-spacing: -0.25px;
  font-size: 16px;
  color: ${Colors.FOREST_GREEN_CRAYOLA};
  font-weight: 700;
`;

const CartText = styled.p`
  font-family: FuturaPT;
  text-transform: uppercase;
  letter-spacing: -0.25px;
  font-size: 11px;
  color: ${Colors.TYRIAN_PURPLE};
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

function DropdownCart(): JSX.Element {
  const theme = useTheme();
  const isSmartphone = useMediaQuery(theme.breakpoints.down("xs"));

  const cartButton = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

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
        PaperProps={{ onMouseLeave: () => setIsOpen(false) }}
      >
        <CartHeader>
          <CartHeaderText>Sua Sacola de Compras</CartHeaderText>
        </CartHeader>
        <SizedBox height={16}></SizedBox>
        <Row spaceBetween padding>
          <Label>Subtotal</Label>
          <Value>R$ 400,00</Value>
        </Row>
        <SizedBox height={16}></SizedBox>
        <Row padding>
          <CustomButton variant="outlined" type="secondary">
            Ver Sacola
          </CustomButton>
          <SizedBox width={16}></SizedBox>
          <CustomButton variant="contained" type="success">
            Comprar
          </CustomButton>
        </Row>
        <SizedBox height={8}></SizedBox>
        <Row>
          <CartText>Frete Grátis para Compras Acima de R$ 200</CartText>
        </Row>
      </StyledCart>
    </>
  );
}

export default DropdownCart;
