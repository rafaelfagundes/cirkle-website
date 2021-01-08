import React, { useState } from "react";
import styled from "styled-components";
import Colors from "../../../enums/Colors";
import CustomButton from "../CustomButton";
import Icon from "../Icon";
import Row from "../Row";
import SimpleText from "../SimpleText";
import SizedBox from "../SizedBox";

const StyledBoletoNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const BarcodeNumber = styled.p`
  margin: 0 0 16px 0;
  font-family: monospace;
  font-size: 14px;
`;

function BoletoNumber({ children }: { children: string }): JSX.Element {
  const [copied, setCopied] = useState(false);

  const copyBarCode = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 5000);
  };

  return (
    <StyledBoletoNumber>
      <Row>
        <Icon type="nature"></Icon>
        <SizedBox width={8}></SizedBox>
        <SimpleText color={Colors.FOREST_GREEN_CRAYOLA}>
          Evite imprimir, pague copiando o código abaixo
        </SimpleText>
      </Row>
      <SizedBox height={12}></SizedBox>
      <BarcodeNumber>{children}</BarcodeNumber>
      <CustomButton
        onClick={copyBarCode}
        variant={copied ? "contained" : "outlined"}
        type={copied ? "disabled" : "default"}
        width={copied ? 150 : 300}
        icon="copy-dark"
      >
        {copied ? "Copiado" : "Copiar Número do Código de Barras"}
      </CustomButton>
    </StyledBoletoNumber>
  );
}

export default BoletoNumber;
