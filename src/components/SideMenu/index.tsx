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

function SideMenu(): JSX.Element {
  const [menuData, setMenuData] = useState({
    women: {
      title: "Mulher",
      active: true,
      categories: {
        clothes: {
          title: "Roupas",
          active: false,
          items: [
            {
              title: "Vestidos",
              link: "/products/a2bf02d1-801d-4066-a2f0-c8d4707c7586",
            },
            {
              title: "Saias",
              link: "/products/11e767cb-d2bb-476b-b358-a73e058ff6f4",
            },
            {
              title: "Blusas",
              link: "/products/927d008d-f8d0-4e4f-a5ef-b390966a65d7",
            },
          ],
        },
        purses: {
          title: "Bolsas",
          active: false,
          items: [
            {
              title: "Mini",
              link: "/products/18f2b1df-e9ef-439f-850e-0e1dcf03dabc",
            },
            {
              title: "Média",
              link: "/products/57dfa070-6e41-4b89-b2c0-c5eab7942491",
            },
            {
              title: "Carteiras",
              link: "/products/8964979e-32c1-4e45-b64e-25cf8710c043",
            },
          ],
        },
        shoes: {
          title: "Calçados",
          active: false,
          items: [
            {
              title: "Botas",
              link: "/products/6d32681a-a23c-4f51-b92e-d70b2c67b592",
            },
            {
              title: "Sapatos",
              link: "/products/0e839446-a0f8-4f7f-9b87-c363127c537a",
            },
            {
              title: "Tênis",
              link: "/products/9a501b21-92f5-4c9d-a978-a83ed6748d25",
            },
          ],
        },
        acc: {
          title: "Acessórios",
          active: false,
          items: [
            {
              title: "Óculos",
              link: "/products/b6500f77-7f2f-4db9-a722-e5cc71808871",
            },
            {
              title: "Relógios",
              link: "/products/d6f4c665-b461-46ce-84b1-6493a4e7a409",
            },
            {
              title: "Brincos",
              link: "/products/fc858018-0c81-4b44-a9a6-0812edd55093",
            },
          ],
        },
        brands: {
          title: "Marcas",
          active: false,
          items: [
            {
              title: "Gucci",
              link: "/products/cce65414-08a3-49ae-bd4a-52d5ae26a8c2",
            },
            {
              title: "Chanel",
              link: "/products/d0018e21-3805-47a5-8489-8c9e38e7cbba",
            },
            {
              title: "Schutz",
              link: "/products/ccec1135-389d-444a-8234-dda99385a12e",
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
          active: false,
          items: [
            {
              title: "Vestidos",
              link: "/products/c05d7945-bbd1-45b2-80da-a613e60dc60d",
            },
            {
              title: "Saias",
              link: "/products/4119c484-fde9-4191-a576-656218e3f9d7",
            },
            {
              title: "Blusas",
              link: "/products/3d2422de-736a-44ba-8fe0-ac5b19330d89",
            },
          ],
        },
        shoes: {
          title: "Calçados",
          active: false,
          items: [
            {
              title: "Sandálias",
              link: "/products/e85fb939-c2e4-4368-848a-5b23e0f5f4ac",
            },
            {
              title: "Sapatos",
              link: "/products/7834a69b-d4b4-4eaf-ad20-16bc39503c43",
            },
            {
              title: "Tênis",
              link: "/products/f5895cef-978a-4fce-9317-be631e5c342f",
            },
          ],
        },
        acc: {
          title: "Acessórios",
          active: false,
          items: [
            {
              title: "Óculos",
              link: "/products/cccb7e40-64b3-4436-8c17-8fd04b200280",
            },
            {
              title: "Relógios",
              link: "/products/6502794d-57a2-49dd-b70c-b9e3345f2953",
            },
            {
              title: "Brincos",
              link: "/products/ab343b81-1ae0-4d47-8c80-dd4230522625",
            },
          ],
        },
        brands: {
          title: "Marcas",
          active: false,
          items: [
            {
              title: "Gucci",
              link: "/products/dc1b3ccf-54d8-417f-9c8d-9abbc75c827c",
            },
            {
              title: "Chanel",
              link: "/products/c7151c83-f1fd-4304-829f-2b71d3cd7c82",
            },
            {
              title: "Schutz",
              link: "/products/1ba3e928-a1c1-40e9-9ccf-9e14e44857de",
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
