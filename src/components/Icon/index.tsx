import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const StyledIcon = styled.div<{ size: number; clickable: boolean }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${(props) => (props.clickable ? "pointer" : "default")};
`;

const Image = styled.img<{ size: number }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
`;

function Icon({
  type,
  size = 24,
  light = false,
  onClick,
}: {
  type: string;
  size?: number;
  light?: boolean;
  onClick?: () => void;
}): JSX.Element {
  return (
    <StyledIcon size={size} onClick={onClick} clickable={onClick !== null}>
      <Image
        size={size}
        src={light ? `/icons/${type}-light.svg` : `/icons/${type}.svg`}
      />
    </StyledIcon>
  );
}

Icon.propTypes = {
  type: PropTypes.oneOf([
    "bag-full",
    "bag-minus",
    "bag-plus",
    "bag",
    "box",
    "check",
    "close",
    "delivery-truck",
    "email",
    "exit",
    "facebook-white",
    "facebook",
    "google",
    "heart",
    "instagram-white",
    "instagram",
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
    "triangle-down-fill",
    "triangle-down",
    "whatsapp-white",
    "whatsapp",
  ]),
};

export default Icon;
