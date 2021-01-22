import { useMediaQuery } from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";
import Colors from "../../../enums/Colors";
import theme from "../../../theme/theme";
import CustomButton from "../CustomButton";
import Icon from "../Icon";
import Row from "../Row";
import SimpleText from "../SimpleText";
import SizedBox from "../SizedBox";

const StyledBoletoNumber = styled.div<{ leftAlign: boolean }>`
  display: flex;
  justify-content: center;
  align-items: ${(props) => (props.leftAlign ? "flex-start" : "center")};
  flex-direction: column;
`;

const BarcodeNumber = styled.p<{ isSmartPhone: boolean }>`
  margin: 0 0 16px 0;
  font-family: monospace;
  font-size: ${(props) => (props.isSmartPhone ? 12 : 14)}px;
  font-weight: bold;
  color: ${Colors.DARK_GRAY};
`;

function BoletoNumber({
  children,
  leftAlign,
}: {
  children: string;
  leftAlign?: boolean;
}): JSX.Element {
  const [copied, setCopied] = useState(false);
  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));

  const copyBarCode = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 5000);
  };

  return (
    <StyledBoletoNumber leftAlign={leftAlign}>
      <Row>
        <Icon type="nature" size={isSmartPhone ? 20 : 24}></Icon>
        <SizedBox width={8}></SizedBox>
        <SimpleText
          color={Colors.FOREST_GREEN_CRAYOLA}
          size={isSmartPhone ? 0.9 : 1}
        >
          Evite imprimir, pague copiando o código abaixo:
        </SimpleText>
      </Row>
      <SizedBox height={12}></SizedBox>
      <BarcodeNumber isSmartPhone={isSmartPhone}>{children}</BarcodeNumber>
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
