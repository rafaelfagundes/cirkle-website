import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

export const AVAILABLE_ICONS = [
  "bag-full",
  "bag-minus",
  "bag-plus-dark",
  "bag-plus-green",
  "bag-plus",
  "bag",
  "box",
  "calendar",
  "check",
  "checkmark",
  "chevron-up",
  "close-dark",
  "close-red",
  "close",
  "coupon",
  "delivery-truck",
  "email",
  "empty",
  "exit",
  "facebook-white",
  "facebook",
  "google",
  "heart-fill",
  "heart",
  "home",
  "house",
  "instagram-white",
  "instagram",
  "key",
  "logout",
  "menu",
  "minus-light",
  "minus",
  "person",
  "phone",
  "plus-light",
  "plus",
  "products",
  "profile",
  "remove-fill",
  "remove",
  "search",
  "signup",
  "star-circle-dark",
  "star-circle-light",
  "star-light",
  "star-yellow",
  "thermometer",
  "trash",
  "triangle-down-fill-dark",
  "triangle-down-fill-red",
  "triangle-down-fill",
  "triangle-down",
  "whatsapp-white",
  "whatsapp",
  "zoom-in",
];

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
  alt,
  onClick,
}: {
  type: string;
  size?: number;
  light?: boolean;
  alt?: string;
  onClick?: () => void;
}): JSX.Element {
  return (
    <StyledIcon
      title={alt}
      size={size}
      onClick={onClick}
      clickable={onClick !== undefined && onClick !== null}
    >
      <Image
        size={size}
        src={light ? `/icons/${type}-light.svg` : `/icons/${type}.svg`}
      />
    </StyledIcon>
  );
}

Icon.propTypes = {
  type: PropTypes.oneOf(AVAILABLE_ICONS),
};

export default Icon;
