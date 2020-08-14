import { Container, InputBase } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { Colors } from "../../theme/theme";
import Icon from "../Icon/index";

const StyledSearchBar = styled.div`
  display: flex;
  background-color: ${Colors.PLUM};
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 16px 0;
`;

const StyledInputBase = styled(InputBase)`
  width: 100%;
  margin-left: 10px;
  font-family: FuturaPT;
  font-size: 16px;
  margin-top: 3px;
`;

const SearchBackground = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  background-color: ${Colors.WHITE};
  height: 45px;
  padding: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
`;

function SearchBar({ placeHolder }: { placeHolder: string }): JSX.Element {
  return (
    <StyledSearchBar>
      <Container maxWidth="md">
        <SearchBackground>
          <Icon type="search"></Icon>
          <StyledInputBase
            placeholder={placeHolder}
            inputProps={{ "aria-label": "search" }}
          />
        </SearchBackground>
      </Container>
    </StyledSearchBar>
  );
}

SearchBar.propTypes = {
  placeHolder: PropTypes.string,
};

export default SearchBar;
