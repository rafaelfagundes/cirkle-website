import React from "react";
import styled from "styled-components";
import Colors from "../../enums/Colors";
import Row from "../Row";

const StyledPrice = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 4px 0;
  border-top-width: 0px;
  border-top-color: ${Colors.VERY_LIGHT_GRAY};
  border-top-style: solid;
`;

const PriceText = styled.span`
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  color: ${Colors.PRIMARY};
  letter-spacing: -0.5px;
`;

const OldPrice = styled.span`
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-weight: 700;
  font-size: 11px;
  line-height: 10px;
  text-decoration-line: line-through;
  color: ${Colors.SECONDARY};
  margin-left: 5px;
  letter-spacing: -0.5px;
`;

const Discount = styled.div`
  background: ${Colors.RED_CRAYOLA};
  border-radius: 12px;
  padding: 3px 6px;
`;

const DiscountText = styled.span`
  align-items: center;
  color: ${Colors.WHITE};
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: bold;
  line-height: 90%;
  text-align: center;
  display: flex;
`;

function Price({
  price,
  priceWhenNew,
}: {
  price: number;
  priceWhenNew: number;
}): JSX.Element {
  return (
    <StyledPrice>
      <Row>
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
      </Row>
      <Discount>
        <DiscountText>
          -{Math.round((1 - price / priceWhenNew) * 100)}%
        </DiscountText>
      </Discount>
    </StyledPrice>
  );
}

export default Price;
