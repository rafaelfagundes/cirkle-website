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
  font-family: "Lato";
  font-weight: 700;
  margin-left: 8px;
  color: #13547a;
  font-size: 16px;
`;

const UserImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

const UserButton = styled.span`
  cursor: pointer;
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
          <MenuItem>Minha Conta</MenuItem>
          <MenuItem>Lista de Desejos</MenuItem>
          <br />
          <MenuItem>Sair</MenuItem>
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
