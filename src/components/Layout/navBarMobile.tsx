import { AppBar, Container, Link } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import DropdownCart from "../DropdownCart";
import HorizontalLogo from "../HorizontalLogo/index";
import Icon from "../Icon";

const NavBarSpacer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  width: 100%;
`;

const NavBarContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 64px;
`;

const NavBarBackground = styled.div`
  background-color: #fff;
`;

const NavBarPadding = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const LogoHolder = styled.div`
  padding-top: 5px;
`;

function NavBarMobile({
  setDrawer,
}: {
  setDrawer: (val: boolean) => void;
}): JSX.Element {
  return (
    <>
      <NavBarSpacer> </NavBarSpacer>
      <AppBar position="fixed" color="transparent">
        <NavBarBackground>
          <Container maxWidth="md">
            <NavBarContent>
              <NavBarPadding>
                <span onClick={() => setDrawer(true)}>
                  <Icon type="menu"></Icon>
                </span>
                <Link href="/">
                  <LogoHolder>
                    <HorizontalLogo></HorizontalLogo>
                  </LogoHolder>
                </Link>
                <DropdownCart></DropdownCart>
              </NavBarPadding>
            </NavBarContent>
          </Container>
        </NavBarBackground>
      </AppBar>
    </>
  );
}

export default NavBarMobile;
