import { Link } from "@material-ui/core";
import _ from "lodash";
import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
import { Colors } from "../../theme/theme";
import Icon from "../Icon";
import SellLink from "../SellLink";
import SizedBox from "../SizedBox";

const StyledSideMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: 300px;
  background-color: ${Colors.WHITE};
  height: 100%;
`;

const Padding = styled.div`
  padding: 16px;
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

const UserProfile = styled.div``;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin-right: 10px;
  border: 1px solid ${Colors.WHITE};
`;

const UserName = styled.div`
  font-family: "Raleway";
  font-weight: 700;
  font-size: 18px;
  letter-spacing: -0.5px;
  color: ${Colors.PRIMARY};
`;

const AccountLink = styled(Link)`
  font-family: "FuturaPT";
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0.3px;
  color: ${Colors.SECONDARY};
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
  width: 80px;
  height: ${(props) => (props.active ? "44px" : "34px")};
  background-color: ${(props) =>
    props.active ? props.color : Colors.VERY_LIGHT_GRAY};
`;

const TabText = styled.span<{ active: boolean }>`
  font-family: "Raleway";
  font-size: 16px;
  color: ${(props) => (props.active ? Colors.WHITE : Colors.GRAY)};
  font-weight: 700;
`;

const MenuContainer = styled.div<{ color: string }>`
  background-color: ${(props) => props.color};
  padding: 10px 0;
`;

const StyledMenuItem = styled.div<{ subcategory?: boolean; lastOne?: boolean }>`
  height: 44px;
  margin: ${(props) => (props.subcategory ? "0 16px 0 32px" : "0 16px")};
  display: flex;
  align-items: center;
  border-bottom-style: solid;
  border-bottom-width: ${(props) =>
    props.subcategory || props.lastOne ? 0 : "0.5px"};
  border-bottom-color: rgba(0, 0, 0, 0.1);
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
`;

const MenuItemText = styled.span`
  font-family: "FuturaPT";
  font-weight: 400;
  font-size: 18px;
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
  font-size: 16px;
  font-family: FuturaPT;
  margin-left: 5px;
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
  font-family: "Raleway";
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  color: ${Colors.RED_PINK};
`;

const SocialDataInfo = styled.span`
  font-family: "FuturaPT";
  text-transform: uppercase;
  font-weight: 700;
  font-size: 14px;
  color: ${Colors.PRIMARY};
`;

function SideMenu({ data }: { data: any }): JSX.Element {
  const [menuData, setMenuData] = useState(data);

  const [selectedTab, setSelectedTab] = useState("women");

  function toggleTab(tab: string) {
    const _menuData = _.cloneDeep(menuData);
    Object.keys(_menuData).forEach((item) => {
      _menuData[item]["active"] = false;
    });
    _menuData[tab]["active"] = true;
    setMenuData(_menuData);
    setSelectedTab(tab);
  }

  function toggleCategory(tab: string, category: string) {
    const _menuData = _.cloneDeep(menuData);
    _menuData[tab].categories[category]["active"] = !_menuData[tab].categories[
      category
    ]["active"];
    setMenuData(_menuData);
  }

  return (
    <StyledSideMenu>
      <div>
        <Padding>
          <UserProfile>
            <Row>
              <Avatar src="https://avatars2.githubusercontent.com/u/29810355?s=460&v=4"></Avatar>
              <Column>
                <UserName>Olá, Rafael Fagundes</UserName>
                <AccountLink href="/account">Minha Conta</AccountLink>
              </Column>
            </Row>
          </UserProfile>
        </Padding>
        <SizedBox height={8}></SizedBox>
        <HorizontalPadding>
          <Tabs>
            {Object.keys(menuData).map((element) => (
              <StyledTab
                key={menuData[element].title}
                active={menuData[element].active}
                onClick={() => toggleTab(element)}
                color={
                  selectedTab === "women" ? Colors.RED_PINK : Colors.ORANGE_KIDS
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
          color={selectedTab === "women" ? Colors.RED_PINK : Colors.ORANGE_KIDS}
        >
          <Link href="/products/newin">
            <StyledMenuItem>
              <MenuItemText color={Colors.WHITE}>Novidades</MenuItemText>
            </StyledMenuItem>
          </Link>
          {Object.keys(menuData[selectedTab].categories).map((item) => (
            <div key={menuData[selectedTab].categories[item].title}>
              <StyledMenuItem onClick={() => toggleCategory(selectedTab, item)}>
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
                  (item: { title: string; link: string }) => (
                    <StyledMenuItem key={item.link} subcategory={true}>
                      <MenuItemText>{item.title}</MenuItemText>
                    </StyledMenuItem>
                  )
                )}
            </div>
          ))}
          <Link href="/products/offers">
            <StyledMenuItem lastOne>
              <MenuItemText color={Colors.CREAM}>Promoções</MenuItemText>
            </StyledMenuItem>
          </Link>
        </MenuContainer>
        <SizedBox height={16}></SizedBox>
        <HorizontalPadding>
          <SellLink width={300 - 32}>Quero Vender</SellLink>
        </HorizontalPadding>
        <SecondaryMenu>
          <Padding>
            <SecondaryItem>
              <Icon type="heart"></Icon>
              <SecondaryText>Lista de Desejos</SecondaryText>
            </SecondaryItem>
            <SecondaryItem>
              <Icon type="box"></Icon>
              <SecondaryText>Meus Pedidos</SecondaryText>
            </SecondaryItem>
            <SecondaryItem>
              <Icon type="products"></Icon>
              <SecondaryText>Meus Produtos à Venda</SecondaryText>
            </SecondaryItem>
            <br />
            <SecondaryItem>
              <SizedBox width={3}></SizedBox>
              <Icon size={20} type="logout"></Icon>
              <SizedBox width={2}></SizedBox>
              <SecondaryText>Desconectar</SecondaryText>
            </SecondaryItem>
          </Padding>
        </SecondaryMenu>
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
              <SocialDataTitle>fale com a gente</SocialDataTitle>
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
