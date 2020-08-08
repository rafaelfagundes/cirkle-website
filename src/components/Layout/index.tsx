import {
  AppBar,
  Container,
  Hidden,
  InputBase,
  Link,
  SwipeableDrawer,
} from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
import Icon from "../../components/Icon";
import SellLink from "../SellLink";
import SideMenu from "../SideMenu/index";
import SizedBox from "../SizedBox";
import TopTextBanner from "../TopTextBanner";
import UserProfileMenuItem from "../UserProfileMenuItem/index";

const Logo = styled.img`
  width: 90px;
  margin-top: 5px;
`;

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

const StyledInputBase = styled(InputBase)`
  width: 100%;
  margin-left: 10px;
  font-family: FuturaPT;
  font-size: 16px;
  margin-top: 3px;
`;

const StyledSearchBar = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  background-color: #f0f0f0;
  height: 45px;
  padding: 8px 10px;
  margin: 0 32px;
  /* border-radius: 8px; */
`;

const SearchAndBag = styled.div`
  display: flex;
  align-items: center;
`;

function Layout({ children }: { children: JSX.Element }): JSX.Element {
  const [drawer, setDrawer] = useState(true);

  return (
    <div>
      {/* Desktop */}
      <Hidden only={["xs"]}>
        <NavBarSpacer>&nbsp;</NavBarSpacer>
        <AppBar position="fixed" color="transparent">
          <NavBarBackground>
            <Container maxWidth="md">
              <NavBarContent>
                <NavBarPadding>
                  <Link href="/">
                    <Logo src="./images/logo.svg"></Logo>
                  </Link>
                  <StyledSearchBar>
                    <Icon type="search"></Icon>
                    <StyledInputBase
                      placeholder="Procure por marcas, tipos, modelos"
                      inputProps={{ "aria-label": "search" }}
                    />
                  </StyledSearchBar>
                  <SearchAndBag>
                    <SellLink>Quero Vender</SellLink>
                    <UserProfileMenuItem
                      isLogged={true}
                      userName="Rafael"
                      userPicture="https://avatars2.githubusercontent.com/u/29810355?s=460&v=4"
                    ></UserProfileMenuItem>
                    <SizedBox width={16}></SizedBox>
                    <Icon type="bag"></Icon>
                  </SearchAndBag>
                </NavBarPadding>
              </NavBarContent>
            </Container>
          </NavBarBackground>
        </AppBar>
      </Hidden>
      {/* Mobile */}
      <Hidden only={["sm", "md", "lg", "xl"]}>
        <NavBarSpacer>&nbsp;</NavBarSpacer>
        <AppBar position="fixed" color="transparent">
          <NavBarBackground>
            <Container maxWidth="md">
              <NavBarContent>
                <NavBarPadding>
                  <span onClick={() => setDrawer(true)}>
                    <Icon type="menu"></Icon>
                  </span>
                  <Link href="/">
                    <Logo src="./images/logo.svg"></Logo>
                  </Link>
                  <Icon type="bag"></Icon>
                </NavBarPadding>
              </NavBarContent>
            </Container>
          </NavBarBackground>
        </AppBar>
      </Hidden>
      <TopTextBanner color="#13547A" textColor="#FFF">
        Frete grátis para pedidos acima de R$ 200,00
      </TopTextBanner>
      <Hidden only={["xs"]}>
        <Container maxWidth="md">{children}</Container>
      </Hidden>
      <Hidden only={["sm", "md", "lg", "xl"]}>
        <Container maxWidth="md" disableGutters={true}>
          {children}
        </Container>
      </Hidden>
      <SwipeableDrawer
        anchor="left"
        open={drawer}
        onClose={() => setDrawer(false)}
        onOpen={() => setDrawer(true)}
      >
        <SideMenu></SideMenu>
      </SwipeableDrawer>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.element,
};

export default Layout;
