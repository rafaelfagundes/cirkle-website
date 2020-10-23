import { AppBar, Container, Link } from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";
import Colors from "../../enums/Colors";
import { useAuth } from "../../hooks/auth/useAuth";
import DropdownCart from "../DropdownCart";
import FavoriteMenuItem from "../FavoriteMenuItem";
import HorizontalLogo from "../HorizontalLogo/index";
import Icon from "../Icon";
import MobileSearch from "../MobileSearch";
import Row from "../Row";
import SizedBox from "../SizedBox";

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
  padding-left: 16px;
  padding-right: 4px;
`;

const LogoHolder = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 64px;
  margin-top: ${(props) => (props.active ? "0" : "5px")};
  margin-left: ${(props) => (props.active ? "-1px" : 0)};
`;

const AvatarMenu = styled.div<{ image: string }>`
  background-image: ${(props) => `url("${props.image}");`};
  background-color: #cccccc;
  height: 24px;
  width: 24px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 12px;
  position: absolute;
  border: 2px solid ${Colors.WHITE};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
  top: 0;
  left: 0;
  margin-left: -7px;
  margin-top: -6px;
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

  const [searchActive, setSearchActive] = useState(false);

  return (
    <AppBar position="fixed" color="transparent">
      <NavBarBackground>
        <Container maxWidth="md" disableGutters>
          <NavBarContent>
            <NavBarPadding>
              <Row>
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
                <SizedBox width={14}></SizedBox>
                <LogoHolder active={searchActive}>
                  <Link href="/">
                    {searchActive && <Icon type="logo" size={34}></Icon>}
                    {!searchActive && <HorizontalLogo></HorizontalLogo>}
                  </Link>
                </LogoHolder>
              </Row>
              <IconsHolder>
                <MobileSearch
                  active={searchActive}
                  onClick={setSearchActive}
                ></MobileSearch>
                {!searchActive && <FavoriteMenuItem></FavoriteMenuItem>}
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
