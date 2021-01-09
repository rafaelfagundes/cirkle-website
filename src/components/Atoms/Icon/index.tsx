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
  "banker",
  "box",
  "calendar",
  "checking-mark",
  "checkmark",
  "check",
  "chevron-down",
  "chevron-right",
  "chevron-up",
  "close-dark",
  "close-red",
  "close",
  "confirmed",
  "copy-dark",
  "copy",
  "coupon",
  "delete",
  "delivery-truck",
  "done",
  "email",
  "empty",
  "error",
  "exit",
  "facebook-dark",
  "facebook",
  "facebook-white",
  "favorite_active",
  "favorite_inactive",
  "forbidden-mark",
  "google",
  "heart-fill",
  "heart",
  "heart-white-fill",
  "home",
  "house",
  "icon_isolated",
  "instagram-dark",
  "instagram",
  "instagram-white",
  "key",
  "layers",
  "login",
  "logo",
  "logout",
  "map-pin",
  "menu",
  "message",
  "minus-light",
  "minus",
  "nature",
  "package",
  "payment-barcode",
  "payment-cc",
  "payment-error",
  "payment-pix",
  "person",
  "phone",
  "plus-light",
  "plus",
  "printer",
  "products",
  "profile",
  "profits",
  "remove-fill",
  "remove",
  "return",
  "search",
  "sell-delivery-truck",
  "sell-dont",
  "sell-do",
  "sell-money",
  "sell-t-shirt",
  "shipping-package",
  "shopping-bag",
  "signup",
  "smartphone",
  "star-circle-dark",
  "star-circle-light",
  "star-light",
  "star-yellow",
  "tag",
  "thermometer",
  "ticket-dark",
  "ticket",
  "trash-red",
  "trash",
  "triangle-down-fill-dark",
  "triangle-down-fill-red",
  "triangle-down-fill",
  "triangle-down",
  "truck",
  "user",
  "whatsapp-dark",
  "whatsapp",
  "whatsapp-white",
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
