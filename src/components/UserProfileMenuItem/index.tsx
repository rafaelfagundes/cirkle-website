import { Link, Menu, MenuItem } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import Icon from "../Icon";

const Profile = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  background-color: #f5f5f5;
  height: 45px;
  /* border-radius: 8px; */
  min-width: 120px;
  padding: 0px 16px;
`;

const UserName = styled.p`
  font-family: "FuturaPT";
  font-weight: 500;
  font-size: 18px;
  margin-left: 8px;
  color: #13547a;
`;

const UserImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

const UserButton = styled.span`
  cursor: pointer;
`;

const StyledMenuItem = styled(MenuItem)`
  height: 44px;
`;

const MenuItemText = styled.p`
  font-family: FuturaPT;
  margin-left: 5px;
`;

function UserProfileMenuItem({
  isLogged,
  userName,
  userPicture,
}: {
  isLogged: boolean;
  userName: string;
  userPicture: string;
}): JSX.Element {
  const [userMenu, setUserMenu] = useState(false);
  const userButtonMenu = useRef(null);

  if (isLogged) {
    return (
      <div>
        <UserButton
          aria-controls="user-menu"
          aria-haspopup="true"
          onClick={() => setUserMenu(true)}
          ref={userButtonMenu}
        >
          <Profile>
            {userPicture ? (
              <UserImage src={userPicture}></UserImage>
            ) : (
              <Icon type="profile"></Icon>
            )}
            <UserName>{userName}</UserName>
          </Profile>
        </UserButton>
        <Menu
          id="user-menu"
          anchorEl={userButtonMenu.current}
          keepMounted
          open={userMenu}
          onClose={() => setUserMenu(false)}
        >
          <StyledMenuItem>
            <Icon type="profile"></Icon>
            <MenuItemText>Minha Conta</MenuItemText>
          </StyledMenuItem>
          <StyledMenuItem>
            <Icon type="heart"></Icon>
            <MenuItemText>Lista de Desejos</MenuItemText>
          </StyledMenuItem>
          <StyledMenuItem>
            <Icon type="box"></Icon>
            <MenuItemText>Meus Pedidos</MenuItemText>
          </StyledMenuItem>
          <StyledMenuItem>
            <Icon type="products"></Icon>
            <MenuItemText>Meus Produtos à Venda</MenuItemText>
          </StyledMenuItem>
          <br />
          <StyledMenuItem>
            <Icon type="exit"></Icon>
            <MenuItemText>Sair</MenuItemText>
          </StyledMenuItem>
        </Menu>
      </div>
    );
  } else {
    return (
      <div>
        <Link href="/login">
          <Profile>
            <Icon type="profile"></Icon>
            <UserName>Entrar</UserName>
          </Profile>
        </Link>
      </div>
    );
  }
}

UserProfileMenuItem.propTypes = {
  isLogged: PropTypes.bool,
  userName: PropTypes.string,
  userPicture: PropTypes.string,
};

export default UserProfileMenuItem;
