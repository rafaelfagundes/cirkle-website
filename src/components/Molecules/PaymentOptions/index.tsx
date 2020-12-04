import { useMediaQuery } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import theme from "../../../theme/theme";
import Icon from "../../Atoms/Icon";
import RadioButton from "../../Atoms/RadioButton";
import Row from "../../Atoms/Row";
import SimpleText from "../../Atoms/SimpleText";

const PaymentItem = styled.div<{ isSmartPhone: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  margin-right: ${(props) => (props.isSmartPhone ? 10 : 30)}px;
`;

const Button = styled.div<{ active: boolean; isSmartPhone: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.active ? "#FBEFF7" : "transparent")};
  box-sizing: border-box;
  width: ${(props) => (props.isSmartPhone ? 103 : 160)}px;
  height: ${(props) => (props.isSmartPhone ? 103 : 160)}px;
  padding: ${(props) => (props.isSmartPhone ? 6 : 20)}px;
  margin-left: ${(props) => (props.isSmartPhone ? 2 : 10)}px;
  border-radius: 8px;
`;

const IconHolder = styled.div<{ size: number }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TextHolder = styled.div`
  height: 20px;
`;

interface PaymentOptionsProps {
  option: string;
  setOption: React.Dispatch<React.SetStateAction<string>>;
}

const payments = [
  {
    id: "cc",
    desc: "Cartão de Crédito ou Débito",
    icon: "payment-cc",
    size: 64,
  },
  {
    id: "barcode",
    desc: "Boleto Bancário",
    icon: "payment-barcode",
    size: 78,
  },
  {
    id: "pix",
    desc: "PIX",
    icon: "payment-pix",
    size: 62,
  },
];

function PaymentOptions(props: PaymentOptionsProps): JSX.Element {
  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Row>
      {payments.map((item) => (
        <PaymentItem
          key={item.id}
          onClick={() => props.setOption(item.id)}
          isSmartPhone={isSmartPhone}
        >
          {!isSmartPhone && (
            <RadioButton
              onClick={() => props.setOption(item.id)}
              value={props.option === item.id}
            ></RadioButton>
          )}
          <Button active={props.option === item.id} isSmartPhone={isSmartPhone}>
            <IconHolder size={isSmartPhone ? 52 : 78}>
              <Icon
                size={isSmartPhone ? item.size / 1.5 : item.size}
                type={item.icon}
                onClick={() => props.setOption(item.id)}
              ></Icon>
            </IconHolder>
            <TextHolder>
              <SimpleText bold centered size={isSmartPhone ? 0.7 : 0.9}>
                {item.desc}
              </SimpleText>
            </TextHolder>
          </Button>
        </PaymentItem>
      ))}
    </Row>
  );
}

export default PaymentOptions;
