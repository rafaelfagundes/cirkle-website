import { AppBar, Container, Link } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import Colors from "../../enums/Colors";
import { useAuth } from "../../hooks/auth/useAuth";
import DropdownCart from "../DropdownCart";
import FavoriteMenuItem from "../FavoriteMenuItem";
import HorizontalLogo from "../HorizontalLogo/index";
import Icon from "../Icon";

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
  height: 20px;
  width: 20px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 12px;
  position: absolute;
  border: 2px solid ${Colors.WHITE};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
  top: 0;
`;

const IconsHolder = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const HamburguerMenu = styled.div`
  position: relative;
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
                  <HamburguerMenu>
                    <Icon type="menu"></Icon>
                    <AvatarMenu image={auth.user.picture}></AvatarMenu>
                  </HamburguerMenu>
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
              <IconsHolder>
                <FavoriteMenuItem></FavoriteMenuItem>
                <DropdownCart></DropdownCart>
              </IconsHolder>
            </NavBarPadding>
          </NavBarContent>
        </Container>
      </NavBarBackground>
    </AppBar>
  );
}

export default MobileTopMenu;
