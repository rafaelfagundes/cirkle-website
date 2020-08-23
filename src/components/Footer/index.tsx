import { Hidden } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { Colors } from "../../theme/theme";
import DesktopFooter from "./DesktopFooter";
import MobileFooter from "./MobileFooter";

const Legal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: ${Colors.TYRIAN_PURPLE};
`;

const LegalText = styled.span`
  text-align: center;
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-weight: 600;
  font-size: 10px;
  color: ${Colors.WHITE};
`;

function Footer(): JSX.Element {
  return (
    <div>
      <Hidden only={["xs", "sm"]}>
        <DesktopFooter></DesktopFooter>
      </Hidden>
      <Hidden only={["md", "lg", "xl"]}>
        <MobileFooter></MobileFooter>
      </Hidden>
      <Legal>
        <LegalText>CIRKLE TECNOLOGIA E COMERCIO LTDA - MG</LegalText>
        <LegalText>
          ©2020 TODOS OS DIREITOS RESERVADOS - CNPJ: 11.222.333/0001-99
        </LegalText>
      </Legal>
    </div>
  );
}

export default Footer;
