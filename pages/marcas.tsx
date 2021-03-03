import { InputBase, useMediaQuery } from "@material-ui/core";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import styled from "styled-components";
import useSWR from "swr";
import Center from "../src/components/Atoms/Center";
import Icon from "../src/components/Atoms/Icon";
import Padding from "../src/components/Atoms/Padding";
import SizedBox from "../src/components/Atoms/SizedBox";
import Brand from "../src/components/Organisms/HotSection/brand";
import EmptyPage from "../src/components/Templates/EmptyPage";
import Page from "../src/components/Templates/Page";
import Colors from "../src/enums/Colors";
import Menu from "../src/modules/menu/Menu";
import theme from "../src/theme/theme";

const BrandsHolder = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const BrandItem = styled.div`
  border-radius: 4px;
  margin-bottom: 20px;
  margin-right: 20px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: space-between; */
  /* overflow: hidden; */
  /* background-color: #ffebfc; */
  /* box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05); */
`;

const BrandTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  /* max-width: 100px; */
  padding: 5px;
  background-color: #fbeff7;
  border-radius: 4px;
  width: 100%;
`;

const BrandTitleText = styled.h3`
  margin: 0;
  padding: 0;
  font-family: Commissioner, sans-serif;
  font-weight: 700;
  color: ${Colors.SECONDARY};
  font-size: 14px;
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

  max-width: 400px;
`;

interface PageProps {
  menu: Menu;
  search: any;
}

function Marcas({ menu, search }: PageProps): JSX.Element {
  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));

  const { data, error } = useSWR("/brands?_sort=views:DESC");
  // console.log("data", data);
  console.error("error", error);

  const [filteredItems, setFilteredItems] = useState(data || null);

  const [searchQuery, setSearchQuery] = useState(null);
  const [searchBarFocused, setSearchBarFocused] = useState(false);

  function normalizeText(text: string) {
    if (text) {
      const string = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return string.toLowerCase();
    }
    return text;
  }

  function isMatch(text: string, search: string) {
    const normalizedText = normalizeText(text);
    const normalizedSearch = normalizeText(search);
    const result = normalizedText.indexOf(normalizedSearch);
    if (result >= 0) return true;
    return false;
  }

  function filterItems(data: any, searchQuery: string) {
    if (!data) return [];
    if (!searchQuery) return data;

    const filteredData = data.filter((item: any) =>
      isMatch(item.name, searchQuery)
    );

    return filteredData;
  }

  useEffect(() => {
    if (searchQuery) {
      setFilteredItems(filterItems(data, searchQuery));
    } else {
      setFilteredItems(data);
    }
  }, [searchQuery]);

  return (
    <Page
      image="/images/brands.jpg"
      title=""
      noPadding={isSmartPhone}
      menu={menu}
      search={search}
    >
      <Padding horizontal={isSmartPhone ? 20 : 72}>
        <SizedBox height={isSmartPhone ? 20 : 56}></SizedBox>
        <Center>
          <StyledSearchBar active={searchBarFocused}>
            <StyledInputBase
              id="search-bar-on-menu"
              placeholder="Procure uma marca"
              inputProps={{ "aria-label": "search" }}
              onFocus={() => setSearchBarFocused(true)}
              onBlur={() => setSearchBarFocused(false)}
              onChange={(event) => setSearchQuery(event.target.value)}
              value={searchQuery}
              autoComplete="off"
            />
            <Icon type="search"></Icon>
          </StyledSearchBar>
        </Center>
        {/* <HorizontalLine></HorizontalLine> */}
        <SizedBox height={20}></SizedBox>
        {data && (
          <BrandsHolder>
            {filteredItems.map((item: any) => (
              <BrandItem key={item.image}>
                <Brand data={item} noMargin></Brand>
                <BrandTitle>
                  <BrandTitleText>
                    <Highlighter
                      searchWords={[searchQuery]}
                      autoEscape={true}
                      textToHighlight={item.name}
                    />
                  </BrandTitleText>
                </BrandTitle>
              </BrandItem>
            ))}
            {filteredItems.length === 0 && (
              <EmptyPage
                title={`${searchQuery} não encontrada`}
                subtitle="Confira a pesquisa ou tente outra marca"
                icon="search"
                noButton
              ></EmptyPage>
            )}
          </BrandsHolder>
        )}
        <SizedBox height={52}></SizedBox>
      </Padding>
    </Page>
  );
}

export async function getStaticProps(): Promise<any> {
  function getContent(url: string) {
    return Axios.get(url);
  }

  const menuUrl = `${process.env.API_ENDPOINT}/menu`;
  const searchUrl = `${process.env.API_ENDPOINT}/isearch`;

  const results = await Promise.all([
    getContent(menuUrl),
    getContent(searchUrl),
  ]);

  const menu = results[0].data;
  const search = results[1].data;

  return {
    props: {
      menu,
      search,
    },
    revalidate: 1440,
  };
}

export default Marcas;
