import { InputBase } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import Colors from "../../../enums/Colors";
import SearchItemType from "../../../modules/searchItem/SearchItem";
import HorizontalLine from "../../Atoms/HorizontalLine";
import Icon from "../../Atoms/Icon";
import Padding from "../../Atoms/Padding";
import SearchCategoryItem from "../../Atoms/SearchCategoryItem";
import SearchItem from "../../Atoms/SearchItem";
import SizedBox from "../../Atoms/SizedBox";
import Subtitle from "../../Atoms/Subtitle";

const StyledMobileSearch = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  height: 44px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.active ? "#F5F5F5" : "transparent")};
  width: ${(props) => (props.active ? "268px" : "44px")};
  border-radius: 22px;

  ${(props) =>
    props.active
      ? "transition: background 500ms, width 500ms;"
      : "transition: background 1500ms, width 100ms;"}

  padding: 0 10px;
`;

const Input = styled(InputBase)`
  font-size: 14px;
  font-family: Commissioner, sans-serif;
  width: 100%;
  margin-left: 5px;
  font-weight: 500;
`;

const Shade = styled.div`
  background-color: rgba(0, 0, 0, 0.9);
  height: calc(100% - 64px);
  width: 100vw;
  z-index: 1000;
  position: fixed;
  top: 64px;
  left: 0;
  overflow: hidden;
`;

const Background = styled.div`
  background-color: ${Colors.WHITE};
  width: 100vw;
  max-height: 100%;
  z-index: 1001;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  overflow: scroll;
`;

interface MobileSearchProps {
  onClick: (value: boolean) => void;
  active: boolean;
}

function MobileSearch(props: MobileSearchProps): JSX.Element {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(null);

  const { q } = router.query;

  useEffect(() => {
    if (q) {
      setSearchQuery(q);
    }
  }, [q]);

  function submitSearch() {
    router.push({
      pathname: "/pesquisa",
      query: {
        q: searchQuery,
      },
    });
  }

  function onSearchChange(e: any) {
    setSearchQuery(e.target.value);
  }

  const { data: searchDataResult } = useSWR(
    searchQuery ? `/isearch?mobile=true&q=${searchQuery}` : "/isearch"
  );

  console.log("searchDataResult", searchDataResult);

  return (
    <StyledMobileSearch active={props.active}>
      <Icon type="search" onClick={() => props.onClick(!props.active)}></Icon>
      {props.active && (
        <Input
          autoComplete="off"
          type="text"
          placeholder="Pesquise items, marcas..."
          autoFocus={props.active}
          // type="search"
          // onBlur={() => props.onClick(false)}
          onChange={(event) => onSearchChange(event)}
          onKeyPress={(e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === "Enter") submitSearch();
          }}
          value={searchQuery}
          endAdornment={
            <Icon
              type={searchQuery ? "close-gray" : "close-dark"}
              onClick={() => {
                setSearchQuery("");

                !searchQuery && props.onClick(false);
              }}
              size={18}
            ></Icon>
          }
        ></Input>
      )}
      {props.active && (
        <Shade onClick={() => props.onClick(false)}>
          {searchDataResult && searchDataResult.length > 0 && (
            <Background>
              {searchQuery && <SizedBox height={5}></SizedBox>}
              {!searchQuery && (
                <Padding horizontal={10} vertical={10}>
                  <Subtitle color={Colors.GRAY} bold size={12}>
                    SUGESTÕES
                  </Subtitle>
                </Padding>
              )}
              {searchDataResult?.map((s: SearchItemType) => (
                <SearchItem
                  item={s}
                  key={s.puid}
                  query={searchQuery}
                  closePanel={() => props.onClick(false)}
                ></SearchItem>
              ))}
              <SizedBox height={10}></SizedBox>
              <HorizontalLine></HorizontalLine>
              <SizedBox height={10}></SizedBox>
              <Padding horizontal={10} vertical={10}>
                <Subtitle color={Colors.GRAY} bold size={12}>
                  {searchQuery ? "CATEGORIAS" : "CONFIRA TAMBÉM"}
                </Subtitle>
              </Padding>
              {searchDataResult?.map((s: SearchItemType) => (
                <SearchCategoryItem
                  item={s}
                  key={s.puid}
                  query={searchQuery}
                  closePanel={() => props.onClick(false)}
                ></SearchCategoryItem>
              ))}
            </Background>
          )}
        </Shade>
      )}
    </StyledMobileSearch>
  );
}

export default MobileSearch;
