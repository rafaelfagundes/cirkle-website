import Cleave from "cleave.js/react";
import React, { useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import styled from "styled-components";
import Colors from "../../../../enums/Colors";
import Column from "../../../Atoms/Column";
import Row from "../../../Atoms/Row";
import SizedBox from "../../../Atoms/SizedBox";
import Subtitle from "../../../Atoms/Subtitle";

const PaymentForm = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const InputFrame = styled.div`
  padding: 10px;
  border: 2px solid ${Colors.PRIMARY};
  max-width: 310px;
  border-radius: 4px;
`;

const CardNumber = styled(Cleave)`
  border: none;
  outline: none;
  font-family: Commissioner, sans-serif;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  width: 100%;
`;

const CardHolder = styled.input`
  border: none;
  outline: none;
  font-family: Commissioner, sans-serif;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  width: 100%;
`;

const ExpirationDate = styled(Cleave)`
  border: none;
  outline: none;
  font-family: Commissioner, sans-serif;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  max-width: 120px;
`;

const CVC = styled.input`
  border: none;
  outline: none;
  font-family: Commissioner, sans-serif;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  max-width: 120px;
`;

function CreditCard(): JSX.Element {
  const [name, setName] = useState("");
  const [cvc, setCvc] = useState("");
  const [focused, setFocused] = useState(null);
  const [number, setNumber] = useState("");
  const [expiry, setExpiry] = useState("");

  return (
    <div>
      <Subtitle color={Colors.SECONDARY}>CARTÃO DE CRÉDITO OU DÉBITO</Subtitle>
      <SizedBox height={20}></SizedBox>
      <PaymentForm>
        <Cards
          cvc={cvc}
          expiry={expiry}
          focused={focused}
          name={name}
          number={number}
          locale={{ valid: "Validade" }}
          placeholders={{ name: "SEU NOME" }}
        />
        <SizedBox width={20}></SizedBox>
        <Column>
          <InputFrame>
            <CardNumber
              options={{ creditCard: true }}
              name="number"
              placeholder="Número Do Cartão"
              value={number}
              onChange={(e: any) => setNumber(e.target.value)}
              onFocus={(e: any) => setFocused(e.target.name)}
              maxLength={19}
            />
          </InputFrame>
          <SizedBox height={20}></SizedBox>
          <InputFrame>
            <CardHolder
              type="text"
              name="name"
              placeholder="Seu Nome Como No Cartão"
              onChange={(e) => setName(e.target.value)}
              onFocus={(e) => setFocused(e.target.name)}
            />
          </InputFrame>
          <SizedBox height={20}></SizedBox>
          <Row>
            <InputFrame>
              <ExpirationDate
                options={{ date: true, datePattern: ["m", "y"] }}
                type="tel"
                name="expiry"
                placeholder="Validade"
                onChange={(e) => setExpiry(e.target.value)}
                onFocus={(e) => setFocused(e.target.name)}
              />
            </InputFrame>
            <SizedBox width={20}></SizedBox>
            <InputFrame>
              <CVC
                type="tel"
                name="cvc"
                placeholder="CVC"
                onChange={(e) => setCvc(e.target.value)}
                onFocus={(e) => setFocused(e.target.name)}
                maxLength={4}
              />
            </InputFrame>
          </Row>
        </Column>
      </PaymentForm>
    </div>
  );
}

export default CreditCard;
