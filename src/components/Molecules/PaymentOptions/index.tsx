import { useMediaQuery } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import theme from "../../../theme/theme";
import RadioButton from "../../Atoms/RadioButton";
import SimpleText from "../../Atoms/SimpleText";

const OptionsHolder = styled.div<{ isSmartPhone: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.isSmartPhone ? "column" : "row")};
`;

const PaymentItem = styled.div<{ active: boolean; isSmartPhone: boolean }>`
  display: flex;
  flex: ${(props) => (props.isSmartPhone ? "1" : "none")};
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  background-color: ${(props) => (props.active ? "#CAE4FB" : "transparent")};
  border-radius: 4px;
  padding-left: ${(props) => (props.isSmartPhone ? 10 : 12)}px;
  padding-right: ${(props) => (props.isSmartPhone ? 10 : 12)}px;
`;

const Button = styled.div<{ isSmartPhone: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin-left: 10px;
`;

const TextHolder = styled.div``;

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
    id: "loterica",
    desc: "Pagar na Lotérica",
    icon: "banker",
    size: 78,
  },
];

function PaymentOptions(props: PaymentOptionsProps): JSX.Element {
  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <OptionsHolder isSmartPhone={isSmartPhone}>
      {payments.map((item) => (
        <PaymentItem
          key={item.id}
          onClick={() => props.setOption(item.id)}
          isSmartPhone={isSmartPhone}
          active={props.option === item.id}
        >
          <RadioButton
            onClick={() => props.setOption(item.id)}
            value={props.option === item.id}
          ></RadioButton>

          <Button isSmartPhone={isSmartPhone}>
            <TextHolder>
              <SimpleText centered={isSmartPhone} size={0.9}>
                {item.desc}
              </SimpleText>
            </TextHolder>
          </Button>
        </PaymentItem>
      ))}
    </OptionsHolder>
  );
}

export default PaymentOptions;
