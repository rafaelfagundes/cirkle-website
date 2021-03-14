import { useMediaQuery } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import Colors from "../../../enums/Colors";
import theme from "../../../theme/theme";

const Title = styled.div`
  font-family: Commissioner, sans-serif;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  margin-right: 10px;
  color: ${Colors.SECONDARY};
`;

const Options = styled.div<{ isSmartphone: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: ${(props) => (props.isSmartphone ? 0 : 16)}px;
  justify-content: center;
`;

const Option = styled.div<{ active: boolean; isSmartphone: boolean }>`
  cursor: pointer;
  font-family: Commissioner, sans-serif;
  font-weight: ${(props) => (props.active ? 700 : 400)};
  opacity: ${(props) => (props.active ? 1 : 0.75)};
  color: ${Colors.PRIMARY};
  &:hover {
    text-decoration: underline;
  }
  letter-spacing: -0.2px;
  font-size: ${(props) => (props.isSmartphone ? 14 : 14)}px;
`;

const Separator = styled.div`
  width: 1px;
  background-color: #ddd;
  height: 16px;
  margin: 0 10px 0 10px;
`;

export enum OPTIONS {
  DEFAULT = "default",
  L_PRICE = "l_price",
  H_PRICE = "h_price",
  RECENTS = "recents",
}

function ListOrderSwitch({
  value,
  setValue,
}: {
  value: string | string[];
  setValue: React.Dispatch<React.SetStateAction<OPTIONS>>;
}): JSX.Element {
  const isSmartphone = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Options isSmartphone={isSmartphone}>
      {!isSmartphone && <Title>Ordernar:</Title>}
      <Option
        active={value === OPTIONS.DEFAULT}
        onClick={() => setValue(OPTIONS.DEFAULT)}
        isSmartphone={isSmartphone}
      >
        Padrão
      </Option>
      <Separator></Separator>
      <Option
        active={value === OPTIONS.L_PRICE}
        onClick={() => setValue(OPTIONS.L_PRICE)}
        isSmartphone={isSmartphone}
      >
        Menor Preço
      </Option>
      <Separator></Separator>
      <Option
        active={value === OPTIONS.H_PRICE}
        onClick={() => setValue(OPTIONS.H_PRICE)}
        isSmartphone={isSmartphone}
      >
        Maior Preço
      </Option>
      <Separator></Separator>
      <Option
        active={value === OPTIONS.RECENTS}
        onClick={() => setValue(OPTIONS.RECENTS)}
        isSmartphone={isSmartphone}
      >
        Recentes
      </Option>
    </Options>
  );
}

export default ListOrderSwitch;
