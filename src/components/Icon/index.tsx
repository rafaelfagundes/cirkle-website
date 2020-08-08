import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const StyledIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 24px;
  height: 24px;
`;

function getIcon(typed: string) {
  switch (typed) {
    case "menu":
      return "./icons/menu.svg";
    case "bag":
      return "./icons/bag.svg";
    case "search":
      return "./icons/search.svg";
    case "profile":
      return "./icons/profile.svg";

    default:
      break;
  }
}

function Icon({ type }: { type: string }): JSX.Element {
  return (
    <StyledIcon>
      <Image src={getIcon(type)} />
    </StyledIcon>
  );
}

Icon.propTypes = {
  type: PropTypes.oneOf(["menu", "bag", "search"]),
};

export default Icon;
