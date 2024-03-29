import { Hidden } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import Colors from "../../../enums/Colors";
import Menu from "../../../modules/menu/Menu";
import DesktopFooter from "./DesktopFooter";
import MobileFooter from "./MobileFooter";

const Legal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: ${Colors.PRIMARY};
`;

const LegalText = styled.span`
  text-align: center;
  font-family: Commissioner, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  font-weight: 500;
  font-size: 11px;
`;

function Footer({ menu }: { menu: Menu }): JSX.Element {
  return (
    <div>
      <Hidden only={["xs", "sm"]}>
        <DesktopFooter menu={menu}></DesktopFooter>
      </Hidden>
      <Hidden only={["md", "lg", "xl"]}>
        <MobileFooter></MobileFooter>
      </Hidden>
      <Legal>
        <LegalText style={{ color: "#fff" }}>
          CIRKLE TECNOLOGIA E COMERCIO LTDA - MG
        </LegalText>
        <LegalText style={{ color: "#fff" }}>
          CNPJ: 11.222.333/0001-99
        </LegalText>
      </Legal>
    </div>
  );
}

export default Footer;
