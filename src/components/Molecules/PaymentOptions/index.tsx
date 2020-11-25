import React from "react";
import styled from "styled-components";
import Icon from "../../Atoms/Icon";
import RadioButton from "../../Atoms/RadioButton";
import Row from "../../Atoms/Row";

const PaymentItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  margin-right: 30px;
`;

const Button = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* border: ${(props) => (props.active ? "none" : "1px solid #d2d2d2")}; */
  background-color: ${(props) => (props.active ? "#FBEFF7" : "transparent")};
  box-sizing: border-box;
  width: 160px;
  height: 150px;
  padding: 20px;
  margin-left: 10px;
  border-radius: 20px;
`;

const PaymentText = styled.div`
  text-align: center;
  margin-top: 10px;
  font-family: Commissioner, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
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
  return (
    <Row>
      {payments.map((item) => (
        <PaymentItem key={item.id} onClick={() => props.setOption(item.id)}>
          <RadioButton
            onClick={() => props.setOption(item.id)}
            value={props.option === item.id}
          ></RadioButton>
          <Button active={props.option === item.id}>
            <Icon
              size={item.size}
              type={item.icon}
              onClick={() => props.setOption(item.id)}
            ></Icon>
            <PaymentText>{item.desc}</PaymentText>
          </Button>
        </PaymentItem>
      ))}
    </Row>
  );
}

export default PaymentOptions;
