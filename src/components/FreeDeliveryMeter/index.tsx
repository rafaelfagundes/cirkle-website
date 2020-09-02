import React from "react";
import styled from "styled-components";
import { Colors } from "../../theme/theme";
import Icon from "../Icon";

const TruckPosition = styled.div``;

const Truck = styled.div<{ value: number }>`
  width: 24px;
  height: 24px;

  position: relative;
  left: ${(props) => `calc(${props.value}% - 12px)`};

  animation: MoveUpDown 1000ms linear infinite;

  @keyframes MoveUpDown {
    0% {
      bottom: 0px;
      transform: rotate(4deg);
    }
    25% {
      bottom: -2px;
      transform: rotate(4deg);
    }
    50% {
      bottom: 1px;
      transform: rotate(-4deg);
    }
    75% {
      transform: rotate(0deg);
      bottom: 1px;
    }
    100% {
      bottom: 1px;
      transform: rotate(8deg);
    }
  }
`;

const Text = styled.span<{ color: string }>`
  color: ${(props) => props.color};
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-size: 0.85rem;
  line-height: 2rem;
  font-weight: bold;
`;

const StyledLinearProgress = styled.div<{ value: number; color: string }>`
  background-color: ${Colors.LIGHT_GRAY};
  /* border-radius: 4px; */

  & > div {
    background-color: ${(props) => props.color};
    width: ${(props) => props.value}%;
    /* Adjust with JavaScript */
    height: 10px;
    /* border-radius: 4px; */
  }
`;

function FreeDeliveryMeter({
  current = 50,
  max = 1000,
}: {
  current: number;
  max: number;
}): JSX.Element {
  const complete = max - current <= 0;
  const position = (current / max) * 100;

  return (
    <>
      <TruckPosition>
        <Truck value={complete ? 100 : position}>
          <Icon type="delivery-truck"></Icon>
        </Truck>
      </TruckPosition>
      <StyledLinearProgress
        value={complete ? 100 : position}
        color={complete ? Colors.MONEY : Colors.SECONDARY}
      >
        <div></div>
      </StyledLinearProgress>

      {}

      {!complete && (
        <Text color={Colors.SECONDARY}>{`Faltam ${new Intl.NumberFormat(
          "pt-BR",
          {
            style: "currency",
            currency: "BRL",
          }
        ).format(max - current)} para o frete ser grátis`}</Text>
      )}
      {complete && <Text color={Colors.MONEY}>Oba! O frete é grátis!</Text>}
    </>
  );
}

export default FreeDeliveryMeter;
