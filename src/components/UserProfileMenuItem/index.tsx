import { Link, Menu, MenuItem } from "@material-ui/core";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import Colors from "../../enums/Colors";
import { useAuth } from "../../hooks/auth/useAuth";
import { firstNameOnly } from "../../utils/string";
import Icon from "../Icon";
import SizedBox from "../SizedBox/index";

const Profile = styled.div<{ center?: boolean }>`
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: ${(props) => (props.center ? "center" : "flex-start")};
  margin-right: 10px;
  height: 45px;
`;

const UserName = styled.p`
  font-family: "FuturaPT";
  font-weight: 400;
  font-size: 18px;
  margin-left: 8px;
  color: ${Colors.PRIMARY};
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
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  margin-left: 5px;
`;

function UserProfileMenuItem({ isLogged }: { isLogged: boolean }): JSX.Element {
  const [userMenu, setUserMenu] = useState(false);
  const userButtonMenu = useRef(null);
  const router = useRouter();

  const auth = useAuth();

  async function _logOut() {
    console.log("Desconectando...");
    await auth.signout();
  }

  const _goToWishlist = () => {
    router.push("/wishlist");
  };

  const _goToProfile = () => {
    router.push("/profile");
  };

  if (isLogged) {
    return (
      <div>
        <UserButton
          aria-controls="user-menu"
          aria-haspopup="true"
          onClick={() => setUserMenu(true)}
          // onMouseOver={() => setUserMenu(true)}
          ref={userButtonMenu}
        >
          <Profile center={true}>
            {auth.user.picture ? (
              <UserImage src={auth.user.picture}></UserImage>
            ) : (
              <Icon type="profile"></Icon>
            )}
            <UserName>{firstNameOnly(auth.user.name)}</UserName>
          </Profile>
        </UserButton>
        <Menu
          id="user-menu"
          anchorEl={userButtonMenu.current}
          keepMounted
          open={userMenu}
          onClose={() => setUserMenu(false)}
          MenuListProps={{
            onMouseLeave: () => setTimeout(() => setUserMenu(false), 250),
          }}
        >
          <StyledMenuItem>
            <Profile>
              {auth.user.picture ? (
                <UserImage src={auth.user.picture}></UserImage>
              ) : (
                <Icon type="profile"></Icon>
              )}
              <UserName>{firstNameOnly(auth.user.name)}</UserName>
            </Profile>
          </StyledMenuItem>
          <br />
          <StyledMenuItem onClick={_goToProfile}>
            <Icon type="profile"></Icon>
            <MenuItemText>Minha Conta</MenuItemText>
          </StyledMenuItem>
          <StyledMenuItem onClick={_goToWishlist}>
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
          <StyledMenuItem onClick={_logOut}>
            <SizedBox width={3}></SizedBox>
            <Icon size={20} type="logout"></Icon>
            <SizedBox width={2}></SizedBox>
            <MenuItemText>Desconectar</MenuItemText>
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
            <UserName>Entrar ou Cadastrar</UserName>
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
