import { AppBar, Container, Link } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { useAuth } from "../../hooks/use-auth";
import DropdownCart from "../DropdownCart";
import HorizontalLogo from "../HorizontalLogo/index";
import Icon from "../Icon";
import Row from "../Row";

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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 64px;
  margin-left: 10px;
  position: fixed;
  left: calc(50% - 56px);
  top: 2px;
`;

const AvatarMenu = styled.div<{ image: string }>`
  background-image: ${(props) => `url("${props.image}");`};
  background-color: #cccccc;
  height: 24px;
  width: 24px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin-left: 10px;
  margin-right: -22px;
  border-radius: 12px;
  overflow: hidden;
`;

function MobileTopMenu({
  setDrawer,
}: {
  setDrawer: (val: boolean) => void;
}): JSX.Element {
  const auth = useAuth();

  return (
    <AppBar position="fixed" color="transparent">
      <NavBarBackground>
        <Container maxWidth="md">
          <NavBarContent>
            <NavBarPadding>
              {auth.user && (
                <span onClick={() => setDrawer(true)}>
                  <Row>
                    <Icon type="menu"></Icon>
                    <AvatarMenu image={auth.user.picture}></AvatarMenu>
                  </Row>
                </span>
              )}
              {!auth.user && (
                <span onClick={() => setDrawer(true)}>
                  <Icon type="menu"></Icon>
                </span>
              )}
              <LogoHolder>
                <Link href="/">
                  <HorizontalLogo></HorizontalLogo>
                </Link>
              </LogoHolder>
              <DropdownCart></DropdownCart>
            </NavBarPadding>
          </NavBarContent>
        </Container>
      </NavBarBackground>
    </AppBar>
  );
}

export default MobileTopMenu;
