import Cleave from "cleave.js/react";
import styled from "styled-components";
import Colors from "../../../enums/Colors";

export const PaymentForm = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const InputFrame = styled.div`
  padding: 10px;
  border: 2px solid ${Colors.PRIMARY};
  max-width: 335px;
  border-radius: 4px;
`;

export const CardContainer = styled.div<{ isSmartPhone: boolean }>`
  width: 290px;
  margin-left: ${(props) => (props.isSmartPhone ? 0 : 40)}px;
`;

export const CardNumber = styled(Cleave)`
  border: none;
  outline: none;
  font-family: Commissioner, sans-serif;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  width: 100%;
  min-width: 315px;
`;

export const CPF = styled(Cleave)`
  border: none;
  outline: none;
  font-family: Commissioner, sans-serif;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  width: 100%;
`;

export const CNPJ = styled(Cleave)`
  border: none;
  outline: none;
  font-family: Commissioner, sans-serif;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  width: 100%;
`;

export const CardHolder = styled.input`
  border: none;
  outline: none;
  font-family: Commissioner, sans-serif;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  width: 100%;
`;

export const DefaultInput = styled.input`
  border: none;
  outline: none;
  font-family: Commissioner, sans-serif;
  font-size: 14px;
  font-weight: 700;
  width: 100%;
`;

export const ExpirationDate = styled(Cleave)`
  border: none;
  outline: none;
  font-family: Commissioner, sans-serif;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  max-width: 75px;
`;

export const CVC = styled.input`
  border: none;
  outline: none;
  font-family: Commissioner, sans-serif;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  max-width: 40px;
`;

export const CardAndForm = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const CVCandExpiration = styled.div`
  display: flex;
  flex-direction: row;
  width: 335px;
`;
