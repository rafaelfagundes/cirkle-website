import { Container, InputBase } from "@material-ui/core";
import _ from "lodash";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Colors from "../../enums/Colors";
import { useAuth } from "../../hooks/auth/useAuth";
// import DropdownCart from "../DropdownCart";
import HorizontalLogo from "../HorizontalLogo";
import Icon from "../Icon";
import IconButton from "../IconButton";
import SizedBox from "../SizedBox";
import { TextPlaceholder } from "../TextPlaceholder";
// import UserProfileMenuItem from "../UserProfileMenuItem";

const DropdownCart = dynamic(() => import("../DropdownCart"), {
  ssr: false,
});
const UserProfileMenuItem = dynamic(() => import("../UserProfileMenuItem"), {
  ssr: false,
});

const MenuContainer = styled.div`
  background-color: ${Colors.WHITE};
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${Colors.WHITE};
  height: 60px;
`;

const Tabs = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const Tab = styled.div<{ active: boolean; color: string }>`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
  height: 60px;
  background-color: ${(props) =>
    props.active ? props.color : Colors.VERY_LIGHT_GRAY};

  transition: background 400ms;

  &:hover {
    filter: brightness(90%);
  }
`;

const TabText = styled.span<{ active: boolean }>`
  font-family: "FuturaPT";
  font-size: 16px;
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
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  cursor: pointer;
  height: 51px;
  padding: 0 20px;
  background-color: ${(props) =>
    props.active ? "rgba(255, 255, 255, 0.15)" : "transparent"};

  transition: background ${(props) => (props.active ? 500 : 1500)}ms
    cubic-bezier(0.48, 1.04, 0.49, 0.95);
`;

const MenuItemText = styled.span<{
  active?: boolean;
  color: string;
  first?: boolean;
}>`
  font-family: "FuturaPT";
  /* opacity: ${(props) => (props.active ? 1 : 0.95)}; */
  font-size: 17px;
  color: ${(props) => (props.color ? props.color : Colors.WHITE)};
  font-weight: 400;
  z-index: 100;
`;

const SubcategoriesHolder = styled.div`
  background-color: rgba(255, 255, 255, 0.15);
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
  font-size: 16px;
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
  font-size: 18px;
  font-family: FuturaPT;
`;

const StyledSearchBar = styled.div<{ active: boolean }>`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  background-color: ${Colors.WHITE};
  padding: 0px 16px 0 22px;
  height: 44px;
  border: 2px solid
    ${(props) => (props.active ? Colors.PRIMARY : Colors.LIGHT_GRAY)};
  border-radius: 22px;

  transition: border 400ms;
`;

const SideIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 174px;
`;

const LogoHolder = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 140px;
  height: 60px;
  padding-left: 12px;
`;

const PromosDetail = styled.div`
  position: absolute;
  width: 100px;
  height: 51px;

  background: #c94277;
  /* transform: matrix(0.91, 0, -0.52, 1, 0, 0); */
  transform: skew(-12deg);
`;

function DesktopTopMenu({ data }: { data: any }): JSX.Element {
  const [menuData, setMenuData] = useState(null);
  const [selectedTab, setSelectedTab] = useState("women");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchBarFocused, setSearchBarFocused] = useState(false);

  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (data) {
      setMenuData({
        women: data.women,
        kids: data.kids,
      });
    }
  }, [data]);

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

  function goTo(route: string) {
    router.push(route);
  }

  return (
    <MenuContainer>
      <Container maxWidth="lg">
        <Top>
          <LogoAndTabs>
            <Link href="/">
              <LogoHolder>
                <HorizontalLogo width={92}></HorizontalLogo>
              </LogoHolder>
            </Link>
            {menuData && (
              <Tabs>
                {Object.keys(menuData).map((element) => (
                  <Tab
                    key={menuData[element].title}
                    active={menuData[element].active}
                    onClick={() => toggleTab(element)}
                    // onMouseOver={() => toggleTab(element)}
                    color={
                      selectedTab === "women" ? Colors.PRIMARY : Colors.KIDS
                    }
                  >
                    <TabText active={menuData[element].active}>
                      {menuData[element].title}
                    </TabText>
                  </Tab>
                ))}
              </Tabs>
            )}
            {!menuData && (
              <Tabs>
                <Tab active={true} color={Colors.PRIMARY}>
                  <TextPlaceholder
                    width={80}
                    color={Colors.LIGHT_GRAY}
                  ></TextPlaceholder>
                </Tab>
                <Tab active={false} color={Colors.KIDS}>
                  <TextPlaceholder
                    width={50}
                    color={Colors.LIGHT_GRAY}
                  ></TextPlaceholder>
                </Tab>
              </Tabs>
            )}
          </LogoAndTabs>
          <SizedBox width={32}></SizedBox>
          <StyledSearchBar active={searchBarFocused}>
            <StyledInputBase
              id="search-bar-on-menu"
              placeholder="Procure marcas, modelos e mais"
              inputProps={{ "aria-label": "search" }}
              onFocus={() => setSearchBarFocused(true)}
              onBlur={() => setSearchBarFocused(false)}
            />
            <Icon type="search"></Icon>
          </StyledSearchBar>
          <SizedBox width={22}></SizedBox>
          <SideIcons>
            <UserProfileMenuItem
              isLogged={auth.user !== null}
            ></UserProfileMenuItem>
            <IconButton
              type="heart"
              onClick={() => goTo("/wishlist")}
            ></IconButton>
            <DropdownCart></DropdownCart>
          </SideIcons>
        </Top>
      </Container>

      <UnderTabsContent
        color={selectedTab === "women" ? Colors.PRIMARY : Colors.KIDS}
        onMouseLeave={() => {
          cleanActives(selectedTab, selectedCategory);
        }}
      >
        <Container maxWidth="lg">
          <Row>
            <Categories>
              <SizedBox width={6}></SizedBox>
              {menuData && (
                <MenuItem>
                  <PromosDetail></PromosDetail>
                  <MenuItemText color={Colors.WHITE}>Promos</MenuItemText>
                </MenuItem>
              )}
              <SizedBox width={16}></SizedBox>

              {!menuData && (
                <>
                  <Link href="/">
                    <MenuItem>
                      <TextPlaceholder
                        width={95}
                        color={Colors.LIGHT_GRAY}
                      ></TextPlaceholder>
                    </MenuItem>
                  </Link>
                  <SizedBox width={16}></SizedBox>
                  <Link href="/">
                    <MenuItem>
                      <TextPlaceholder
                        width={90}
                        color={Colors.LIGHT_GRAY}
                      ></TextPlaceholder>
                    </MenuItem>
                  </Link>
                  <SizedBox width={16}></SizedBox>
                  <Link href="/">
                    <MenuItem>
                      <TextPlaceholder
                        width={95}
                        color={Colors.LIGHT_GRAY}
                      ></TextPlaceholder>
                    </MenuItem>
                  </Link>
                  <SizedBox width={16}></SizedBox>
                  <Link href="/">
                    <MenuItem>
                      <TextPlaceholder
                        width={90}
                        color={Colors.LIGHT_GRAY}
                      ></TextPlaceholder>
                    </MenuItem>
                  </Link>
                  <SizedBox width={16}></SizedBox>
                  <Link href="/">
                    <MenuItem>
                      <TextPlaceholder
                        width={100}
                        color={Colors.LIGHT_GRAY}
                      ></TextPlaceholder>
                    </MenuItem>
                  </Link>
                  <SizedBox width={16}></SizedBox>
                  <Link href="/">
                    <MenuItem>
                      <TextPlaceholder
                        width={95}
                        color={Colors.LIGHT_GRAY}
                      ></TextPlaceholder>
                    </MenuItem>
                  </Link>
                  <SizedBox width={16}></SizedBox>
                  <Link href="/">
                    <MenuItem>
                      <TextPlaceholder
                        width={100}
                        color={Colors.MIDDLE_YELLOW}
                      ></TextPlaceholder>
                    </MenuItem>
                  </Link>
                </>
              )}
              {menuData &&
                Object.keys(menuData[selectedTab].categories).map((item) => (
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
                      {/* <MenuItemArrow>
                        <Icon
                          size={8}
                          type={
                            menuData[selectedTab].categories[item].active
                              ? "triangle-down-fill"
                              : "triangle-down"
                          }
                        ></Icon>
                      </MenuItemArrow> */}
                    </MenuItem>
                  </Link>
                ))}
              {menuData && (
                <MenuItem>
                  <MenuItemText color={Colors.MIDDLE_YELLOW}>
                    Novidades
                  </MenuItemText>
                </MenuItem>
              )}
            </Categories>
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

export default DesktopTopMenu;
