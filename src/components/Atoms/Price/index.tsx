import React from "react";
import styled from "styled-components";
import Colors from "../../../enums/Colors";

const StyledPrice = styled.div<{ spaceBetween: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${(props) =>
    props.spaceBetween ? "space-between" : "flex-start"};
  padding: 4px 0;
  border-top-width: 0px;
  border-top-color: ${Colors.VERY_LIGHT_GRAY};
  border-top-style: solid;
`;

const PriceText = styled.span`
  font-family: Commissioner, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  color: ${Colors.PRIMARY};
  letter-spacing: -0.5px;
`;

const OldPrice = styled.span`
  font-family: Commissioner, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  font-weight: 700;
  font-size: 11px;
  line-height: 10px;
  text-decoration-line: line-through;
  color: ${Colors.SECONDARY};
  margin-left: 5px;
  letter-spacing: -0.5px;
`;

const Discount = styled.div`
  background: ${Colors.PARADISE_PINK};
  border-radius: 12px;
  padding: 3px 6px;
  margin-left: 10px;
`;

const DiscountText = styled.span`
  align-items: center;
  color: ${Colors.WHITE};
  font-family: Commissioner, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: bold;
  line-height: 90%;
  text-align: center;
  display: flex;
`;

function Price({
  price,
  priceWhenNew,
  spaceBetween = true,
}: {
  price: number;
  priceWhenNew: number;
  spaceBetween?: boolean;
}): JSX.Element {
  return (
    <StyledPrice spaceBetween={spaceBetween}>
      <div>
        <PriceText>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(price)}
        </PriceText>
        <OldPrice>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(priceWhenNew)}
        </OldPrice>
      </div>
      <Discount>
        <DiscountText>
          -{Math.round((1 - price / priceWhenNew) * 100)}%
        </DiscountText>
      </Discount>
    </StyledPrice>
  );
}

export default Price;
