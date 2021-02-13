import { InputBase } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Icon from "../../Atoms/Icon";

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
  font-family: Commissioner, Lato, sans-serif;
  width: 100%;
  margin-left: 5px;
  font-weight: 500;
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

  return (
    <StyledMobileSearch active={props.active}>
      <Icon type="search" onClick={() => props.onClick(!props.active)}></Icon>
      {props.active && (
        <Input
          placeholder="Pesquise items, marcas..."
          autoFocus={props.active}
          type="search"
          onBlur={() => props.onClick(false)}
          onChange={(event) => onSearchChange(event)}
          onKeyPress={(e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === "Enter") submitSearch();
          }}
          value={searchQuery}
        ></Input>
      )}
    </StyledMobileSearch>
  );
}

export default MobileSearch;
