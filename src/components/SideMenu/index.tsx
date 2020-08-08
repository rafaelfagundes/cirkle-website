import { Link } from "@material-ui/core";
import _ from "lodash";
import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
import SizedBox from "../SizedBox/index";

const StyledSideMenu = styled.div`
  position: relative;
  width: 300px;
  background-color: #f9f9f9;
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
  /* justify-content: center; */
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: center; */
`;

const UserProfile = styled.div``;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin-right: 10px;
  border: 1px solid #fff;
`;

const UserName = styled.div`
  font-family: "Raleway";
  font-weight: 700;
  font-size: 18px;
  letter-spacing: -0.5px;
  color: #13547a;
`;

const AccountLink = styled(Link)`
  font-family: "FuturaPT";
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0.3px;
  color: #c94277;
`;

const Tabs = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const StyledTab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: ${(props) => (props.active ? "44px" : "34px")};
  background-color: ${(props) => (props.active ? "#2D2D2D" : "#F0F0F0")};
`;

const TabText = styled.span`
  font-family: "Raleway";
  font-size: 16px;
  color: ${(props) => (props.active ? "#c94277" : "#F05D5E")};
  font-weight: 700;
`;

const MenuContainer = styled.div`
  background-color: #fff;
  padding: 10px 0;
`;

const StyledMenuItem = styled.div`
  height: 44px;
  margin: 0 16px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #d7d7d7;
`;

const MenuItemText = styled.span`
  font-family: "FuturaPT";
  font-weight: 400;
  font-size: 16px;
  /* letter-spacing: 0.3px; */
  color: ${(props) => (props.color ? props.color : "#13547a")};
`;

function SideMenu(): JSX.Element {
  const [menuData, setMenuData] = useState({
    women: {
      title: "Mulher",
      active: true,
      categories: {
        clothes: {
          title: "Roupas",
          items: [
            {
              title: "Vestidos",
              link: "/products/",
            },
            {
              title: "Saias",
              link: "/products/",
            },
            {
              title: "Blusas",
              link: "/products/",
            },
          ],
        },
        purses: {
          title: "Bolsas",
          items: [
            {
              title: "Mini",
              link: "/products/",
            },
            {
              title: "Média",
              link: "/products/",
            },
            {
              title: "Carteiras",
              link: "/products/",
            },
          ],
        },
        shoes: {
          title: "Calçados",
          items: [
            {
              title: "Botas",
              link: "/products/",
            },
            {
              title: "Sapatos",
              link: "/products/",
            },
            {
              title: "Tênis",
              link: "/products/",
            },
          ],
        },
        acc: {
          title: "Acessórios",
          items: [
            {
              title: "Óculos",
              link: "/products/",
            },
            {
              title: "Relógios",
              link: "/products/",
            },
            {
              title: "Brincos",
              link: "/products/",
            },
          ],
        },
        brands: {
          title: "Marcas",
          items: [
            {
              title: "Gucci",
              link: "/products/",
            },
            {
              title: "Chanel",
              link: "/products/",
            },
            {
              title: "Schutz",
              link: "/products/",
            },
          ],
        },
      },
    },
    kids: {
      title: "Kids",
      active: false,
      categories: {
        clothes: {
          title: "Roupas",
          items: [
            {
              title: "Vestidos",
              link: "/products/",
            },
            {
              title: "Saias",
              link: "/products/",
            },
            {
              title: "Blusas",
              link: "/products/",
            },
          ],
        },
        shoes: {
          title: "Calçados",
          items: [
            {
              title: "Sandálias",
              link: "/products/",
            },
            {
              title: "Sapatos",
              link: "/products/",
            },
            {
              title: "Tênis",
              link: "/products/",
            },
          ],
        },
        acc: {
          title: "Acessórios",
          items: [
            {
              title: "Óculos",
              link: "/products/",
            },
            {
              title: "Relógios",
              link: "/products/",
            },
            {
              title: "Brincos",
              link: "/products/",
            },
          ],
        },
        brands: {
          title: "Marcas",
          items: [
            {
              title: "Gucci",
              link: "/products/",
            },
            {
              title: "Chanel",
              link: "/products/",
            },
            {
              title: "Schutz",
              link: "/products/",
            },
          ],
        },
      },
    },
  });

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

  return (
    <StyledSideMenu>
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
            >
              <TabText active={menuData[element].active}>
                {menuData[element].title}
              </TabText>
            </StyledTab>
          ))}
        </Tabs>
      </HorizontalPadding>
      <MenuContainer>
        <StyledMenuItem>
          <MenuItemText color="#C94277">Novidades</MenuItemText>
        </StyledMenuItem>
        {Object.keys(menuData[selectedTab].categories).map((item) => (
          <StyledMenuItem key={menuData.women.categories[item].title}>
            <MenuItemText>{menuData.women.categories[item].title}</MenuItemText>
          </StyledMenuItem>
        ))}
        <StyledMenuItem>
          <MenuItemText color="#F05D5E">Promoções</MenuItemText>
        </StyledMenuItem>
      </MenuContainer>
    </StyledSideMenu>
  );
}

SideMenu.propTypes = {
  children: PropTypes.any,
};

export default SideMenu;
