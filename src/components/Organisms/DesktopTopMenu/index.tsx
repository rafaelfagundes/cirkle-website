import { Container, InputBase } from "@material-ui/core";
import _cloneDeep from "lodash/cloneDeep";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import Colors from "../../../enums/Colors";
import { useAuth } from "../../../hooks/auth/useAuth";
import SearchItemType from "../../../modules/searchItem/SearchItem";
import pages from "../../../utils/pages";
import Center from "../../Atoms/Center";
import FavoriteMenuItem from "../../Atoms/FavoriteMenuItem";
import HorizontalLogo from "../../Atoms/HorizontalLogo";
import Icon from "../../Atoms/Icon";
import Row from "../../Atoms/Row";
import SearchCategoryItem from "../../Atoms/SearchCategoryItem";
import SearchItem from "../../Atoms/SearchItem";
import SearchPageItem from "../../Atoms/SearchPageItem";
import SizedBox from "../../Atoms/SizedBox";
import { TextPlaceholder } from "../../Atoms/TextPlaceholder";
import Title from "../../Atoms/Title";
import EmptyPage from "../../Templates/EmptyPage";

const DropdownCart = dynamic(() => import("../../Molecules/DropdownCart"), {
  ssr: false,
});
const UserProfileMenuItem = dynamic(
  () => import("../../Molecules/UserProfileMenuItem"),
  {
    ssr: false,
  }
);

const MenuContainer = styled.div`
  background-color: ${Colors.WHITE};
`;

const SearchShade = styled.div<{ show: boolean }>`
  width: 100vw;
  height: ${(props) => (props.show ? 200 : 0)}vh;
  background-color: ${(props) =>
    props.show ? "rgba(0, 0, 0, 0.75)" : "rgba(0, 0, 0, 0.0)"};
  position: absolute;
  z-index: 999;
  transition: background 250ms ease-in-out;
`;

const SearchContainer = styled.div<{ minWidth: number; show: boolean }>`
  min-width: ${(props) => props.minWidth}px;
  max-width: 960px;
  height: ${(props) => (props.show ? 500 : 0)}px;
  background-color: ${Colors.WHITE};
  position: absolute;
  z-index: 1000;
  border-radius: 4px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  top: 55px;
  /* overflow: hidden; */
  transition: height 250ms ease-in-out;
  padding: ${(props) => (props.show ? "20px 0 0 20px" : 0)};
  overflow: hidden;
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
  font-family: "Commissioner";
  font-size: 14px;
  color: ${(props) => (props.active ? Colors.WHITE : Colors.GRAY)};
  text-transform: uppercase;
  font-weight: 700;
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
  font-family: "Commissioner";
  font-size: 15px;
  color: ${(props) => (props.color ? props.color : Colors.WHITE)};
  font-weight: 500;
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
  font-family: "Commissioner";
  font-weight: 500;
  font-size: 14px;
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
  font-size: 16px;
  font-family: Commissioner;
  font-weight: 500;
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
  z-index: 1001;
`;

const SideIcons = styled.div<{ isLogged: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: ${(props) => (props.isLogged ? "174px" : "148px")};
`;

const LogoHolder = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 140px;
  height: 60px;
  padding-left: 12px;
`;

const PromosDetail = styled.div<{ backgroundColor: string }>`
  position: absolute;
  width: 100px;
  height: 51px;
  background: ${(props) => props.backgroundColor};
  transform: skew(-12deg);
`;

const Section = styled.div<{ flex: number }>`
  flex: ${(props) => props.flex};
  height: 500px;
  padding-bottom: 20px;
  padding-right: 20px;
  overflow: scroll;

  ::-webkit-scrollbar {
    width: 0px;
  }

  scrollbar-width: none;
  border-right: 1px solid #eee;
`;

function DesktopTopMenu({
  menu,
  search,
}: {
  menu: any;
  search: any;
}): JSX.Element {
  const router = useRouter();
  const { q } = router.query;

  const [searchQuery, setSearchQuery] = useState(null);

  const [menuData, setMenuData] = useState(null);

  const [selectedTab, setSelectedTab] = useState("mulher");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchBarFocused, setSearchBarFocused] = useState(false);
  const [mouseOverSearchContainer, setMouseOverSearchContainer] = useState(
    false
  );
  const [searchData, setSearchData] = useState(null);

  const { data: searchDataResult } = useSWR(
    searchQuery ? `/isearch?mobile=false&q=${searchQuery}` : "/isearch",
    {
      initialData: searchQuery ? null : search,
    }
  );

  useEffect(() => {
    if (searchDataResult) {
      const finalResult = [];

      searchDataResult.forEach((s: any) => {
        const _s = _cloneDeep(s);
        _s.colors = _s.colors.split(",");
        _s.sizes = _s.sizes.split(",");
        finalResult.push(_s);
      });
      setSearchData(finalResult);
    }
  }, [searchDataResult]);

  const authContext = useAuth();

  useEffect(() => {
    if (menu) {
      setMenuData(menu);
    }
  }, [menu]);

  useEffect(() => {
    if (q !== undefined) {
      setSearchQuery(q);
    }
  }, [q]);

  function toggleTab(tab: string) {
    setSelectedCategory(null);
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
    if (selectedCategory) {
      _menuData[tab].categories[selectedCategory]["active"] = false;
    }
    _menuData[tab].categories[category]["active"] = true;
    setMenuData(_menuData);
    setSelectedCategory(category);
  }

  function cleanActives(tab: string, category: string) {
    if (category) {
      const _menuData = _cloneDeep(menuData);
      _menuData[tab].categories[category]["active"] = false;
      setMenuData(_menuData);
    }
    setSelectedCategory(null);
  }

  function onSearchChange(e: any) {
    setSearchQuery(e.target.value);
  }

  function submitSearch() {
    router.push({
      pathname: "/pesquisa",
      query: {
        q: searchQuery,
        department: 1,
      },
    });
  }

  const closeSearchContainer = () => {
    if (!mouseOverSearchContainer) {
      setSearchBarFocused(false);
    }
  };

  return (
    <>
      <SearchShade
        show={searchBarFocused}
        onClick={() => setSearchBarFocused(false)}
      ></SearchShade>
      <MenuContainer>
        <Container maxWidth="lg">
          <Center>
            <SearchContainer
              show={searchBarFocused}
              onMouseOver={() => setMouseOverSearchContainer(true)}
              onMouseLeave={() => setMouseOverSearchContainer(false)}
              minWidth={
                process.browser
                  ? window.innerWidth <= 960
                    ? window.innerWidth
                    : 960
                  : 0
              }
            >
              {searchBarFocused && (
                <Row alignTop>
                  {searchData?.length === 0 && (
                    <>
                      <Section flex={3}>
                        <SizedBox height={6}></SizedBox>
                        <Title>Resultados</Title>
                        <SizedBox height={32}></SizedBox>
                        <EmptyPage
                          buttonAction={() => router.push("/pesquisa")}
                          buttonText="Ver Produtos"
                          icon="search"
                          title="Nenhum resultado encontrado"
                          subtitle="Veja nossos outros produtos"
                        ></EmptyPage>
                      </Section>
                      <SizedBox width={16}></SizedBox>
                    </>
                  )}
                  {searchData?.length > 0 && (
                    <>
                      <Section flex={2}>
                        <SizedBox height={6}></SizedBox>
                        <Title>Produtos</Title>
                        <SizedBox height={16}></SizedBox>
                        {searchData?.map((s: SearchItemType) => (
                          <SearchItem
                            item={s}
                            key={s.puid}
                            query={searchQuery}
                            closePanel={() => setSearchBarFocused(false)}
                          ></SearchItem>
                        ))}
                      </Section>
                      <SizedBox width={16}></SizedBox>
                      <Section flex={1}>
                        <SizedBox height={6}></SizedBox>
                        <Title>Categorias</Title>
                        <SizedBox height={16}></SizedBox>
                        {searchData?.map((s: SearchItemType) => (
                          <SearchCategoryItem
                            item={s}
                            key={s.puid}
                            query={searchQuery}
                            closePanel={() => setSearchBarFocused(false)}
                          ></SearchCategoryItem>
                        ))}
                      </Section>
                      <SizedBox width={16}></SizedBox>
                    </>
                  )}
                  <Section flex={1}>
                    <SizedBox height={6}></SizedBox>
                    <Title>Páginas</Title>
                    <SizedBox height={16}></SizedBox>
                    {pages.map((p) => (
                      <SearchPageItem
                        item={p}
                        key={p.href}
                        query={searchQuery}
                        closePanel={() => setSearchBarFocused(false)}
                      ></SearchPageItem>
                    ))}
                  </Section>
                </Row>
              )}
            </SearchContainer>
          </Center>

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
                        selectedTab === "mulher" ? Colors.PRIMARY : Colors.KIDS
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
                placeholder="Procure por marcas, produtos, inspiração"
                inputProps={{ "aria-label": "search" }}
                onFocus={() => setSearchBarFocused(true)}
                onBlur={closeSearchContainer}
                onChange={(event) => onSearchChange(event)}
                onKeyPress={(e: React.KeyboardEvent<HTMLDivElement>) => {
                  if (e.key === "Enter") submitSearch();
                }}
                value={searchQuery}
                autoComplete="off"
              />
              <Icon type="search"></Icon>
            </StyledSearchBar>
            <SizedBox width={22}></SizedBox>
            <SideIcons isLogged={authContext.user !== null}>
              <UserProfileMenuItem
                isLogged={authContext.user !== null}
              ></UserProfileMenuItem>
              {authContext.user && <FavoriteMenuItem></FavoriteMenuItem>}
              <DropdownCart></DropdownCart>
            </SideIcons>
          </Top>
        </Container>

        <UnderTabsContent
          color={selectedTab === "mulher" ? Colors.PRIMARY : Colors.KIDS}
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
                    <PromosDetail
                      backgroundColor={
                        selectedTab === "mulher"
                          ? Colors.SECONDARY
                          : Colors.KIDS_VIOLET
                      }
                    ></PromosDetail>
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
                      href={
                        "/categorias/" +
                        menuData[selectedTab].categories[item].link
                      }
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
                    {menuData[selectedTab].categories[
                      selectedCategory
                    ].items.map((item: { title: string; link: string }) => (
                      <Link href={"/categorias/" + item.link} key={item.link}>
                        <SubMenuItem>
                          <SubMenuItemText>{item.title}</SubMenuItemText>
                        </SubMenuItem>
                      </Link>
                    ))}
                  </Subcategories>
                </Container>
              </SubcategoriesHolder>
            )}
        </UnderTabsContent>
      </MenuContainer>
    </>
  );
}

export default DesktopTopMenu;
