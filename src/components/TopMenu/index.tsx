import { Container, InputBase } from "@material-ui/core";
import _ from "lodash";
import Link from "next/link";
import React, { useState } from "react";
import styled from "styled-components";
import { Colors } from "../../theme/theme";
import Icon from "../Icon";
import SizedBox from "../SizedBox";
import UserProfileMenuItem from "../UserProfileMenuItem/index";

const MenuContainer = styled.div``;

const Logo = styled.img`
  width: 90px;
  margin-right: 48px;
  margin-bottom: 16px;
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
  /* align-items: flex-end; */
  justify-content: space-between;
  height: 64px;
`;

const Tabs = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const Tab = styled.div<{ active: boolean; color: string }>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 80px; */
  padding: 0 24px;
  height: ${(props) => (props.active ? "40px" : "30px")};
  background-color: ${(props) =>
    props.active ? props.color : Colors.VERY_LIGHT_GRAY};
`;

const TabText = styled.span<{ active: boolean }>`
  font-family: "Raleway";
  font-size: 16px;
  color: ${(props) => (props.active ? Colors.WHITE : Colors.GRAY)};
  font-weight: 700;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LogoAndTabs = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const Categories = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const MenuItem = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
  height: 50px;
  background-color: ${(props) =>
    props.active ? "rgba(0,0,0,0.1)" : "transparent"};
`;

const MenuItemText = styled.span<{ active: boolean }>`
  font-family: "FuturaPT";
  /* opacity: ${(props) => (props.active ? 1 : 0.95)}; */
  font-size: 18px;
  color: ${(props) => (props.color ? props.color : Colors.WHITE)};
  padding: 0 16px;
`;

const SubcategoriesHolder = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
`;

const Subcategories = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 16px 0;
  flex-wrap: wrap;
  max-height: 300px;
`;

const SubMenuItem = styled.div`
  display: flex;
  cursor: pointer;
  height: 40px;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

const SubMenuItemText = styled.span`
  font-family: "FuturaPT";
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  color: ${(props) => (props.color ? props.color : Colors.WHITE)};
  padding: 16px;
  &:hover {
    text-decoration: underline;
  }
`;

const UnderTabsContent = styled.div<{ color: string }>`
  background-color: ${(props) => props.color};
`;

const StyledInputBase = styled(InputBase)`
  width: 100%;
  font-family: FuturaPT;
  font-size: 16px;
  margin-top: 3px;
`;

const StyledSearchBar = styled.div`
  display: flex;
  width: 540px;
  flex-direction: row;
  align-items: center;
  background-color: ${Colors.WHITE};
  padding: 0px 10px;
  margin: 8px 0 8px 0;
`;

const SearchAndBag = styled.div`
  display: flex;
  align-items: center;
`;

function TopMenu(): JSX.Element {
  const [menuData, setMenuData] = useState({
    women: {
      title: "Mulher",
      active: true,
      categories: {
        clothes: {
          link: "/mulher/roupas",
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
          link: "/mulher/bolsas",
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
          link: "/mulher/calçados",
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
          link: "/mulher/acessórios",
          title: "Acessórios",
          active: false,
          items: [
            { title: "Acessórios para cabelo", link: "/products/acessórios" },
            { title: "Anel", link: "/products/anel" },
            { title: "Bijoux", link: "/products/bijoux" },
            { title: "Brinco", link: "/products/brinco" },
            { title: "Cachecol", link: "/products/cachecol" },
            { title: "Carteiras", link: "/products/carteiras" },
            { title: "Chapéus", link: "/products/chapéus" },
            { title: "Chaveiros", link: "/products/chaveiros" },
            { title: "Cintos", link: "/products/cintos" },
            { title: "Colar", link: "/products/colar" },
            { title: "Conjunto", link: "/products/conjunto" },
            { title: "Fitness", link: "/products/fitness" },
            { title: "Jóias", link: "/products/jóias" },
            { title: "Lenços", link: "/products/lenços" },
            { title: "Meias calças", link: "/products/meias" },
            { title: "Óculos", link: "/products/óculos" },
            { title: "Praia", link: "/products/praia" },
            { title: "Pulseira", link: "/products/pulseira" },
            { title: "Relógios", link: "/products/relógios" },
            { title: "Outros", link: "/products/outros" },
          ],
        },
        brands: {
          link: "/mulher/marcas",
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
          link: "/kids/roupas",
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
          link: "/kids/calçados",
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
          link: "/kids/acessórios",
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
          link: "/kids/marcas",
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
  const [selectedCategory, setSelectedCategory] = useState(null);

  function toggleTab(tab: string) {
    setSelectedCategory(null);
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
    if (selectedCategory) {
      _menuData[tab].categories[selectedCategory]["active"] = false;
    }
    _menuData[tab].categories[category]["active"] = true;
    setMenuData(_menuData);
    setSelectedCategory(category);
  }

  function cleanActives(tab: string, category: string) {
    if (category) {
      const _menuData = _.cloneDeep(menuData);
      _menuData[tab].categories[category]["active"] = false;
      setMenuData(_menuData);
    }
    setSelectedCategory(null);
  }

  return (
    <MenuContainer>
      <Container maxWidth="md">
        <Top>
          <LogoAndTabs>
            <Link href="/">
              <Logo src="/images/logo.svg"></Logo>
            </Link>
            <Tabs>
              {Object.keys(menuData).map((element) => (
                <Tab
                  key={menuData[element].title}
                  active={menuData[element].active}
                  onClick={() => toggleTab(element)}
                  onMouseOver={() => toggleTab(element)}
                  color={
                    selectedTab === "women"
                      ? Colors.RED_PINK
                      : Colors.ORANGE_KIDS
                  }
                >
                  <TabText active={menuData[element].active}>
                    {menuData[element].title}
                  </TabText>
                </Tab>
              ))}
            </Tabs>
          </LogoAndTabs>
          <SearchAndBag>
            {/* <SellLink>Quero Vender</SellLink> */}
            <UserProfileMenuItem
              isLogged={true}
              userName="Rafael"
              userPicture="https://avatars2.githubusercontent.com/u/29810355?s=460&v=4"
            ></UserProfileMenuItem>
            <SizedBox width={16}></SizedBox>
            <Icon type="bag"></Icon>
          </SearchAndBag>
        </Top>
      </Container>

      <UnderTabsContent
        color={selectedTab === "women" ? Colors.RED_PINK : Colors.ORANGE_KIDS}
        onMouseLeave={() => {
          cleanActives(selectedTab, selectedCategory);
        }}
      >
        <Container maxWidth="md">
          <Row>
            <Categories>
              {Object.keys(menuData[selectedTab].categories).map((item) => (
                <Link
                  href={menuData[selectedTab].categories[item].link}
                  key={menuData[selectedTab].categories[item].link}
                >
                  <MenuItem
                    active={menuData[selectedTab].categories[item].active}
                    onMouseOver={() => toggleCategory(selectedTab, item)}
                  >
                    <MenuItemText
                      active={menuData[selectedTab].categories[item].active}
                      color={Colors.WHITE}
                    >
                      {menuData[selectedTab].categories[item].title}
                    </MenuItemText>
                  </MenuItem>
                </Link>
              ))}
            </Categories>
            <StyledSearchBar>
              <StyledInputBase
                placeholder="Procure por marcas, categorias, modelos"
                inputProps={{ "aria-label": "search" }}
              />
              <Icon type="search"></Icon>
            </StyledSearchBar>
          </Row>
        </Container>
        {selectedCategory &&
          menuData[selectedTab].categories[selectedCategory].active && (
            <SubcategoriesHolder>
              <Container maxWidth="md">
                <Subcategories>
                  {menuData[selectedTab].categories[selectedCategory].items.map(
                    (item: { title: string; link: string }) => (
                      <Link href={item.link} key={item.link}>
                        <SubMenuItem>
                          <SubMenuItemText>{item.title}</SubMenuItemText>
                        </SubMenuItem>
                      </Link>
                    )
                  )}
                </Subcategories>
              </Container>
            </SubcategoriesHolder>
          )}
      </UnderTabsContent>
    </MenuContainer>
  );
}

export default TopMenu;
