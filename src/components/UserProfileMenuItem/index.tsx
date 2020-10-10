import { Menu, MenuItem } from "@material-ui/core";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import Colors from "../../enums/Colors";
import { useAuth } from "../../hooks/auth/useAuth";
import { cloudinaryImage } from "../../utils/image";
import Icon from "../Icon";
import SizedBox from "../SizedBox/index";

const Profile = styled.div<{ center?: boolean }>`
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: ${(props) => (props.center ? "center" : "flex-start")};
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

export const IconHolder = styled.div`
  cursor: pointer;
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

function UserProfileMenuItem({ isLogged }: { isLogged: boolean }): JSX.Element {
  const [userMenu, setUserMenu] = useState(false);
  const userButtonMenu = useRef(null);
  const userNotLoggedInMenu = useRef(null);
  const router = useRouter();

  const auth = useAuth();

  async function _logOut() {
    await auth.signout();
  }

  const _goToWishlist = () => {
    typeof window !== "undefined" && router.push("/wishlist");
  };

  const _goToProfile = () => {
    typeof window !== "undefined" && router.push("/profile");
  };

  if (isLogged) {
    return (
      <div>
        <UserButton
          aria-controls="user-menu"
          aria-haspopup="true"
          onClick={() => setUserMenu(true)}
          onMouseOver={() => setUserMenu(true)}
          ref={userButtonMenu}
        >
          <Profile center={true}>
            {auth.user.picture ? (
              <IconHolder>
                <UserImage
                  src={cloudinaryImage(auth.user.picture, 32)}
                ></UserImage>
              </IconHolder>
            ) : (
              <IconHolder>
                <Icon type="person"></Icon>
              </IconHolder>
            )}
          </Profile>
        </UserButton>
        <Menu
          id="user-menu"
          anchorEl={userButtonMenu.current}
          open={userMenu}
          keepMounted
          onClose={() => setUserMenu(false)}
          MenuListProps={{
            onMouseLeave: () => setTimeout(() => setUserMenu(false), 250),
          }}
          transitionDuration={{ appear: 400, enter: 400, exit: 500 }}
        >
          <StyledMenuItem onClick={_goToProfile}>
            <Profile>
              {auth.user.picture ? (
                <>
                  <IconHolder>
                    <UserImage src={auth.user.picture}></UserImage>
                  </IconHolder>
                  <UserName>{auth.user.name}</UserName>
                </>
              ) : (
                <>
                  <IconHolder>
                    <Icon type="person" onClick={null}></Icon>
                  </IconHolder>
                  <UserName>{auth.user.name}</UserName>
                </>
              )}
            </Profile>
          </StyledMenuItem>
          <br />
          <StyledMenuItem onClick={_goToProfile}>
            <Icon type="person" onClick={_goToProfile}></Icon>
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
        <UserButton
          aria-controls="user-menu-not-logged-in"
          aria-haspopup="true"
          onClick={() => setUserMenu(true)}
          onMouseOver={() => setUserMenu(true)}
          ref={userNotLoggedInMenu}
        >
          <Profile>
            <IconHolder>
              <Icon type="person" onClick={_goToProfile}></Icon>
            </IconHolder>
          </Profile>
        </UserButton>
        <Menu
          id="user-menu-not-logged-in"
          anchorEl={userNotLoggedInMenu.current}
          keepMounted
          open={userMenu}
          onClose={() => setUserMenu(false)}
          MenuListProps={{
            onMouseLeave: () => setUserMenu(false),
          }}
        >
          <StyledMenuItem onClick={_goToProfile}>
            <Icon type="signup" onClick={_goToProfile}></Icon>
            <MenuItemText>Entrar ou Cadastrar</MenuItemText>
          </StyledMenuItem>
          <br />
          <StyledMenuItem onClick={_goToProfile}>
            <Icon type="person" onClick={_goToProfile}></Icon>
            <MenuItemText>Minha Conta</MenuItemText>
          </StyledMenuItem>
          <StyledMenuItem onClick={_goToWishlist}>
            <Icon type="heart"></Icon>
            <MenuItemText>Lista de Desejos</MenuItemText>
          </StyledMenuItem>
          <StyledMenuItem onClick={_goToProfile}>
            <Icon type="box"></Icon>
            <MenuItemText>Meus Pedidos</MenuItemText>
          </StyledMenuItem>
          <StyledMenuItem onClick={_goToProfile}>
            <Icon type="products"></Icon>
            <MenuItemText>Meus Produtos à Venda</MenuItemText>
          </StyledMenuItem>
        </Menu>
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
