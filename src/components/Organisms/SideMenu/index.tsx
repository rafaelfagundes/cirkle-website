import { Link } from "@material-ui/core";
import _cloneDeep from "lodash/cloneDeep";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
import Colors from "../../../enums/Colors";
import { useAuth } from "../../../hooks/auth/useAuth";
import Center from "../../Atoms/Center";
import CustomButton from "../../Atoms/CustomButton";
import Icon from "../../Atoms/Icon";
import LoadingAnimation from "../../Atoms/LoadingAnimation";
import Padding from "../../Atoms/Padding";
import SimpleText from "../../Atoms/SimpleText";
import SizedBox from "../../Atoms/SizedBox";

const StyledSideMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: 300px;
`;

const HorizontalPadding = styled.div`
  padding: 0 16px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserProfile = styled.div`
  margin-top: 16px;
`;

const Avatar = styled.img<{ hasImage: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 24px;
  margin-right: 10px;
  border: ${(props) =>
    props.hasImage ? "none" : `2px solid ${Colors.LIGHT_GRAY}`};
`;

const UserName = styled.div`
  font-family: "Commissioner";
  font-weight: 700;
  font-size: 18px;
  letter-spacing: -0.5px;
  color: ${Colors.PRIMARY};
`;

const Tabs = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const StyledTab = styled.div<{ active: boolean; color: string }>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: ${(props) => (props.active ? "44px" : "34px")};
  background-color: ${(props) =>
    props.active ? props.color : Colors.VERY_LIGHT_GRAY};

  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

const TabText = styled.span<{ active: boolean }>`
  font-family: "Commissioner";
  font-size: 14px;
  color: ${(props) => (props.active ? Colors.WHITE : Colors.GRAY)};
  font-weight: 700;
  text-transform: uppercase;
`;

const MenuContainer = styled.div<{ color: string }>`
  background-color: ${(props) => props.color};
  padding: 10px 0 0 0;
`;

const StyledMenuItem = styled.div<{
  subcategory?: boolean;
  lastOne?: boolean;
  backgroundColor?: string;
}>`
  height: 44px;
  margin: ${(props) => (props.subcategory ? "0 0 0 16px" : "0")};
  padding: 0 16px;
  display: flex;
  align-items: center;
  border-bottom-style: solid;
  border-bottom-width: ${(props) =>
    props.subcategory || props.lastOne ? 0 : "0.5px"};
  border-bottom-color: rgba(0, 0, 0, 0.2);
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "transparent"};
`;

const MenuItemText = styled.span`
  font-family: "Commissioner";
  font-weight: 500;
  font-size: 14px;
  color: ${(props) => (props.color ? props.color : Colors.WHITE)};
`;

const SecondaryMenu = styled.div``;

const SecondaryItem = styled.div`
  height: 44px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SecondaryText = styled.span`
  color: ${Colors.PRIMARY};
  font-size: 14px;
  font-family: Commissioner, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  margin-left: 10px;
`;

const SocialFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 16px;
  height: 68px;
  background-color: ${Colors.VERY_LIGHT_GRAY};
`;

const Social = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SocialData = styled.div`
  margin-left: 5px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
`;

const SocialDataTitle = styled.span`
  font-family: "Commissioner";
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  color: ${Colors.RED_PINK};
`;

const SocialDataInfo = styled.span`
  font-family: "Commissioner";
  text-transform: uppercase;
  font-weight: 700;
  font-size: 14px;
  color: ${Colors.PRIMARY};
`;

function SideMenu({
  data,
  closeMenu,
}: {
  data: any;
  closeMenu: () => void;
}): JSX.Element {
  const [menuData, setMenuData] = useState(data || null);
  const [selectedTab, setSelectedTab] = useState("mulher");
  const router = useRouter();
  const auth = useAuth();

  const AVATAR_PLACEHOLDER =
    "https://res.cloudinary.com/cirklebr/image/upload/v1598000887/avatar.jpg";

  function toggleTab(tab: string) {
    const _menuData = _cloneDeep(menuData);
    Object.keys(_menuData).forEach((item) => {
      _menuData[item]["active"] = false;
    });
    _menuData[tab]["active"] = true;
    setMenuData(_menuData);
    setSelectedTab(tab);
  }

  function toggleCategory(tab: string, category: string) {
    const _menuData = _cloneDeep(menuData);
    _menuData[tab].categories[category]["active"] = !_menuData[tab].categories[
      category
    ]["active"];
    setMenuData(_menuData);
  }

  const goTo = (route: string) => {
    closeMenu();
    typeof window !== "undefined" && router.push(route);
  };

  return (
    <StyledSideMenu>
      <div>
        <Padding horizontal={16}>
          <UserProfile>
            <Row>
              <Avatar
                src={
                  auth?.user?.picture ? auth?.user?.picture : AVATAR_PLACEHOLDER
                }
                hasImage={auth?.user?.picture !== null}
              ></Avatar>
              <Column>
                <UserName>
                  {auth?.user?.name
                    ? `Olá, ${auth.user.name}`
                    : "Olá, visitante!"}
                </UserName>
              </Column>
            </Row>
          </UserProfile>
        </Padding>
        {auth.user && (
          <SecondaryMenu>
            <Padding horizontal={16} vertical={16}>
              <>
                <SecondaryItem onClick={() => goTo("/perfil")}>
                  <Icon type="user"></Icon>
                  <SecondaryText>Minha Conta</SecondaryText>
                </SecondaryItem>
                <SecondaryItem onClick={() => goTo("/minha-lista")}>
                  <Icon type="heart"></Icon>
                  <SecondaryText>Lista de Desejos</SecondaryText>
                </SecondaryItem>
                <SecondaryItem onClick={() => goTo("/meus-pedidos")}>
                  <Icon type="package"></Icon>
                  <SecondaryText>Meus Pedidos</SecondaryText>
                </SecondaryItem>
                <SecondaryItem onClick={() => goTo("/meus-produtos")}>
                  <Icon type="layers"></Icon>
                  <SecondaryText>Meus Produtos à Venda</SecondaryText>
                </SecondaryItem>
              </>
            </Padding>
          </SecondaryMenu>
        )}
        {!auth.user && (
          <Padding horizontal={16}>
            <>
              <SizedBox height={16}></SizedBox>
              <SecondaryItem onClick={() => goTo("/entrar")}>
                <Icon type="login"></Icon>
                <SecondaryText>Entrar ou Cadastrar</SecondaryText>
              </SecondaryItem>
              <SizedBox height={16}></SizedBox>
            </>
          </Padding>
        )}
        {!menuData && (
          <Column>
            <Center>
              <LoadingAnimation size={32} color={true}></LoadingAnimation>
            </Center>
            <SizedBox height={16}></SizedBox>
            <Center>
              <SimpleText>Carregando o Menu...</SimpleText>
            </Center>
          </Column>
        )}
        {menuData && (
          <>
            <HorizontalPadding>
              <Tabs>
                {Object.keys(menuData).map((element) => (
                  <StyledTab
                    key={menuData[element].title}
                    active={menuData[element].active}
                    onClick={() => toggleTab(element)}
                    color={
                      selectedTab === "mulher" ? Colors.PRIMARY : Colors.KIDS
                    }
                  >
                    <TabText active={menuData[element].active}>
                      {menuData[element].title}
                    </TabText>
                  </StyledTab>
                ))}
              </Tabs>
            </HorizontalPadding>
            <MenuContainer
              color={selectedTab === "mulher" ? Colors.PRIMARY : Colors.KIDS}
            >
              {/* <Link href="/pesquisa?sortOrder=recents">
                <StyledMenuItem>
                  <MenuItemText color={Colors.WHITE}>Novidades</MenuItemText>
                </StyledMenuItem>
              </Link> */}
              {Object.keys(menuData[selectedTab].categories).map((item) => (
                <div key={menuData[selectedTab].categories[item].title}>
                  <StyledMenuItem
                    onClick={() => toggleCategory(selectedTab, item)}
                  >
                    <MenuItemText>
                      {menuData[selectedTab].categories[item].title}
                    </MenuItemText>
                    <MenuItemText>
                      <Icon
                        size={16}
                        type={
                          menuData[selectedTab].categories[item].active
                            ? "minus-light"
                            : "plus-light"
                        }
                      ></Icon>
                    </MenuItemText>
                  </StyledMenuItem>
                  {menuData[selectedTab].categories[item].active &&
                    menuData[selectedTab].categories[item].items.map(
                      (subcategory: { title: string; link: string }) => (
                        <Link
                          href={"/pesquisa/?" + subcategory.link}
                          key={subcategory.link}
                        >
                          <StyledMenuItem subcategory={true}>
                            <MenuItemText>{subcategory.title}</MenuItemText>
                          </StyledMenuItem>
                        </Link>
                      )
                    )}
                </div>
              ))}
              <Link
                href={
                  selectedTab === "mulher"
                    ? "/pesquisa?department=mulher&sortOrder=recents"
                    : "/pesquisa?department=kids&sortOrder=recents"
                }
              >
                <StyledMenuItem
                  lastOne={true}
                  backgroundColor={
                    selectedTab === "mulher"
                      ? Colors.SECONDARY
                      : Colors.KIDS_VIOLET
                  }
                >
                  <MenuItemText>Novidades</MenuItemText>
                </StyledMenuItem>
              </Link>
            </MenuContainer>
          </>
        )}
        <SizedBox height={32}></SizedBox>
        <HorizontalPadding>
          <CustomButton
            width={300 - 32}
            type="primary"
            variant="outlined"
            onClick={null}
          >
            Quero Vender
          </CustomButton>
          {auth.user && (
            <>
              <SizedBox height={32}></SizedBox>
              <SecondaryItem onClick={() => auth.signout()}>
                <Icon type="logout"></Icon>
                <SecondaryText>Sair da Conta</SecondaryText>
              </SecondaryItem>
            </>
          )}
          <SizedBox height={32}></SizedBox>
        </HorizontalPadding>
      </div>
      <div>
        <SocialFooter>
          <Social>
            <Icon size={36} type="facebook"></Icon>
          </Social>
          <Social>
            <Icon size={36} type="instagram"></Icon>
          </Social>
          <Social>
            <Icon size={36} type="whatsapp"></Icon>
            <SocialData>
              <SocialDataTitle>converse conosco</SocialDataTitle>
              <SocialDataInfo>(32) 99123-4567</SocialDataInfo>
            </SocialData>
          </Social>
        </SocialFooter>
      </div>
    </StyledSideMenu>
  );
}

SideMenu.propTypes = {
  children: PropTypes.any,
};

export default SideMenu;
