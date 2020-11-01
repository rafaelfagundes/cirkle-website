import { InputBase } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import Icon from "../Icon";

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
  return (
    <StyledMobileSearch active={props.active}>
      <Icon type="search" onClick={() => props.onClick(!props.active)}></Icon>
      {props.active && (
        <Input
          placeholder="Pesquise items, marcas..."
          autoFocus={props.active}
          onBlur={() => props.onClick(false)}
          type="search"
        ></Input>
      )}
    </StyledMobileSearch>
  );
}

export default MobileSearch;
