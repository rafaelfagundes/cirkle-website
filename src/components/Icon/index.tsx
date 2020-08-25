import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const StyledIcon = styled.div<{ size: number }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img<{ size: number }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
`;

function Icon({
  type,
  size = 24,
  light = false,
}: {
  type: string;
  size?: number;
  light?: boolean;
}): JSX.Element {
  return (
    <StyledIcon size={size}>
      <Image
        size={size}
        src={light ? `/icons/${type}-light.svg` : `/icons/${type}.svg`}
      />
    </StyledIcon>
  );
}

Icon.propTypes = {
  type: PropTypes.oneOf([
    "bag",
    "box",
    "close",
    "email",
    "exit",
    "facebook",
    "facebook-white",
    "google",
    "heart",
    "instagram",
    "instagram-white",
    "key",
    "logout",
    "menu",
    "minus-light",
    "minus",
    "person",
    "plus-light",
    "plus",
    "products",
    "profile",
    "search",
    "thermometer",
    "trash",
    "whatsapp",
    "whatsapp-white",
    "triangle-down",
  ]),
};

export default Icon;
