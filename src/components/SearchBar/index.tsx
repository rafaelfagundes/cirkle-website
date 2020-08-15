import { InputBase } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { Colors } from "../../theme/theme";
import Icon from "../Icon/index";

const StyledSearchBar = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const StyledInputBase = styled(InputBase)`
  width: 100%;
  margin-left: 5px;
  font-family: FuturaPT;
  font-size: 18px;
  color: ${Colors.TYRIAN_PURPLE};
`;

const SearchBackground = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  background-color: ${Colors.WHITE};
  height: 56px;
  padding: 16px;
`;

function SearchBar({ placeHolder }: { placeHolder: string }): JSX.Element {
  return (
    <StyledSearchBar>
      <SearchBackground>
        <Icon type="search"></Icon>

        <StyledInputBase
          placeholder={placeHolder}
          inputProps={{ "aria-label": "search" }}
        />
      </SearchBackground>
    </StyledSearchBar>
  );
}

SearchBar.propTypes = {
  placeHolder: PropTypes.string,
};

export default SearchBar;
