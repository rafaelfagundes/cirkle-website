import { Container, InputBase } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Icon from "../Icon/index";

const StyledSearchBar = styled.div`
  display: flex;
  background-color: #80d0c7;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 16px 0;
`;

const StyledInputBase = styled(InputBase)`
  width: 100%;
  margin-left: 10px;
  font-family: Lato;
`;

const TextBackground = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  height: 45px;
  padding: 8px;
`;

function SearchBar({ placeHolder }: { placeHolder: string }): JSX.Element {
  return (
    <StyledSearchBar>
      <Container maxWidth="md">
        <TextBackground>
          <Icon type="search"></Icon>
          <StyledInputBase
            placeholder={placeHolder}
            inputProps={{ "aria-label": "search" }}
          />
        </TextBackground>
      </Container>
    </StyledSearchBar>
  );
}

SearchBar.propTypes = {
  placeHolder: PropTypes.string,
};

export default SearchBar;
