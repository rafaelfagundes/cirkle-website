import { Container, Hidden, InputBase } from "@material-ui/core";
import _ from "lodash";
import Link from "next/link";
import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../hooks/use-auth";
import { Colors } from "../../theme/theme";
import CustomButton from "../CustomButton";
import DropdownCart from "../DropdownCart";
import HorizontalLogo from "../HorizontalLogo";
import Icon from "../Icon";
import SizedBox from "../SizedBox";
import UserProfileMenuItem from "../UserProfileMenuItem";

const MenuContainer = styled.div`
  background-color: ${Colors.WHITE};
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${Colors.WHITE};
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
  font-size: 14px;
  color: ${(props) => (props.active ? Colors.WHITE : Colors.GRAY)};
  text-transform: uppercase;
  font-weight: 700;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const LogoAndTabs = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const Categories = styled.div`
  display: flex;
  flex-direction: row;
`;

const MenuItem = styled.div<{ active?: boolean; first?: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: row;
  cursor: pointer;
  height: 51px;
  background-color: ${(props) =>
    props.active ? "rgba(0,0,0,0.075)" : "transparent"};
`;

const MenuItemText = styled.span<{
  active?: boolean;
  color: string;
  first?: boolean;
}>`
  font-family: "FuturaPT";
  /* opacity: ${(props) => (props.active ? 1 : 0.95)}; */
  font-size: 14px;
  color: ${(props) => (props.color ? props.color : Colors.WHITE)};
  padding: ${(props) => (props.first ? "16px 16px 16px 0" : "0 16px")} ;
  text-transform: uppercase;
  font-weight: 500;
`;

const SubcategoriesHolder = styled.div`
  background-color: rgba(0, 0, 0, 0.075);
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
  width: 320px;
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

const LogoHolder = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 160px;
  height: 65px;
`;

function TopMenu({ data }: { data: any }): JSX.Element {
  const [menuData, setMenuData] = useState(data);
  const [selectedTab, setSelectedTab] = useState("women");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const auth = useAuth();

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
      <Container maxWidth="lg">
        <Top>
          <LogoAndTabs>
            <Link href="/home">
              <LogoHolder>
                <HorizontalLogo width={102}></HorizontalLogo>
              </LogoHolder>
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
                      ? Colors.MAGENTA
                      : Colors.ORANGE_PANTONE
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
            <CustomButton
              type="success"
              variant="text"
              width={140}
              onClick={null}
            >
              Quero Vender
            </CustomButton>
            <SizedBox width={16}></SizedBox>
            <UserProfileMenuItem
              isLogged={auth.user !== null}
              userName="Rafael"
              userPicture="https://avatars2.githubusercontent.com/u/29810355?s=460&v=4"
            ></UserProfileMenuItem>
            <SizedBox width={16}></SizedBox>
            <DropdownCart></DropdownCart>
          </SearchAndBag>
        </Top>
      </Container>

      <UnderTabsContent
        color={selectedTab === "women" ? Colors.MAGENTA : Colors.ORANGE_PANTONE}
        onMouseLeave={() => {
          cleanActives(selectedTab, selectedCategory);
        }}
      >
        <Container maxWidth="lg">
          <Row>
            <Categories>
              <MenuItem>
                <MenuItemText first color={Colors.WHITE}>
                  Novidades
                </MenuItemText>
              </MenuItem>
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
              <MenuItem>
                <MenuItemText color={Colors.MIDDLE_YELLOW}>
                  Promoções
                </MenuItemText>
              </MenuItem>
            </Categories>
            <Hidden only="sm">
              <StyledSearchBar>
                <StyledInputBase
                  placeholder="Procure marcas, categorias, modelos"
                  inputProps={{ "aria-label": "search" }}
                />
                <Icon type="search"></Icon>
              </StyledSearchBar>
            </Hidden>
          </Row>
        </Container>
        {selectedCategory &&
          menuData[selectedTab].categories[selectedCategory].active && (
            <SubcategoriesHolder>
              <Container maxWidth="lg">
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
