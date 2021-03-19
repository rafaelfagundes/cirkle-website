import { Menu, MenuItem, useMediaQuery } from "@material-ui/core";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../../hooks/auth/useAuth";
import theme from "../../../theme/theme";
import { cloudinaryImage } from "../../../utils/image";
import Icon from "../../Atoms/Icon";
import SizedBox from "../../Atoms/SizedBox";

const Profile = styled.div<{ center?: boolean }>`
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: ${(props) => (props.center ? "center" : "flex-start")};
  height: 45px;
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
  font-family: Commissioner, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  margin-left: 5px;
  font-size: 14px;
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

const NotLoggedIn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  cursor: pointer;
`;

const NotLoggedInText = styled.span`
  font-family: Commissioner, sans-serif;
  font-weight: 500;
  margin-left: 5px;
  font-size: 14px;
  line-height: 14px;
`;

function UserProfileMenuItem({ isLogged }: { isLogged: boolean }): JSX.Element {
  const [userMenu, setUserMenu] = useState(false);
  const userButtonMenu = useRef(null);
  const router = useRouter();

  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));

  const auth = useAuth();

  async function _logOut() {
    await auth.signout();
  }

  const _goTo = (route: string) => {
    typeof window !== "undefined" && router.push(route);
  };

  if (isLogged) {
    return (
      <div>
        <UserButton
          aria-controls="user-menu"
          aria-haspopup="true"
          onClick={isSmartPhone ? () => setUserMenu(true) : null}
          onMouseOver={isSmartPhone ? null : () => setUserMenu(true)}
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
                <Icon type="user"></Icon>
              </IconHolder>
            )}
          </Profile>
        </UserButton>
        <span
          ref={userButtonMenu}
          style={{ position: "relative", top: 0, left: 50 }}
        ></span>

        <Menu
          id="user-menu"
          open={userMenu}
          anchorEl={userButtonMenu.current}
          onClose={() => setUserMenu(false)}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          MenuListProps={{
            onMouseLeave: () => setTimeout(() => setUserMenu(false), 125),
          }}
          transitionDuration={{ appear: 400, enter: 400, exit: 500 }}
        >
          <StyledMenuItem onClick={() => _goTo("/perfil")}>
            <Icon type="user" onClick={null}></Icon>
            <MenuItemText>Minha Conta</MenuItemText>
          </StyledMenuItem>
          <StyledMenuItem onClick={() => _goTo("/perfil?aba=minha-lista")}>
            <Icon type="heart"></Icon>
            <MenuItemText>Lista de Desejos</MenuItemText>
          </StyledMenuItem>
          <StyledMenuItem onClick={() => _goTo("/perfil?aba=meus-pedidos")}>
            <Icon type="package"></Icon>
            <MenuItemText>Meus Pedidos</MenuItemText>
          </StyledMenuItem>
          <StyledMenuItem onClick={() => _goTo("/perfil?aba=meus-produtos")}>
            <Icon type="layers"></Icon>
            <MenuItemText>Meus Produtos à Venda</MenuItemText>
          </StyledMenuItem>
          <SizedBox height={8}></SizedBox>
          <StyledMenuItem onClick={_logOut}>
            <Icon type="logout"></Icon>
            <MenuItemText>Desconectar</MenuItemText>
          </StyledMenuItem>
        </Menu>
      </div>
    );
  } else {
    return (
      <div>
        <NotLoggedIn onClick={() => _goTo("/perfil")}>
          <Icon type="user" onClick={() => _goTo("/perfil")}></Icon>
          <NotLoggedInText>Entrar ou Cadastrar</NotLoggedInText>
        </NotLoggedIn>
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
