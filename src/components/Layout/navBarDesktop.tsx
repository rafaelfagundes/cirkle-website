import { AppBar } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import TopMenu from "../TopMenu";

const NavBarSpacer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 115px;
  width: 100%;
`;

function NavBarDesktop(): JSX.Element {
  return (
    <>
      <NavBarSpacer> </NavBarSpacer>
      <AppBar position="fixed" color="transparent">
        <TopMenu></TopMenu>
      </AppBar>
    </>
  );
}

export default NavBarDesktop;