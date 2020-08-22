import { InputBase } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { Colors } from "../../theme/theme";
import Icon from "../Icon";

const StyledSearchBar = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background-color: ${Colors.TYRIAN_PURPLE};
`;

const StyledInputBase = styled(InputBase)`
  width: 100%;
  margin-left: 5px;
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-size: 18px;
  color: ${Colors.TYRIAN_PURPLE};
`;

const SearchBackground = styled.div`
  /* border-radius: 4px; */
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.WHITE};
  height: 56px;
  padding: 16px;
  /* box-shadow: inset 4px 4px 8px 2px rgba(0, 0, 0, 0.1); */
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
