import React from "react";
import styled from "styled-components";

const FavoriteHolder = styled.div<{ active: boolean }>`
  width: 44px;
  height: 44px;
  cursor: pointer;
`;

const StyledFavoriteIcon = styled.img<{ shadow: boolean }>`
  width: 44px;
  height: 44px;
  box-shadow: ${(props) =>
    props.shadow
      ? "0px 4px 8px rgba(0, 0, 0, 0.05)"
      : "0px 4px 8px rgba(0, 0, 0, 0)"};
  border-radius: 22px;
  cursor: pointer;
`;

function FavoriteIcon({
  active,
  setActive,
  shadow = true,
}: {
  active: boolean;
  setActive: () => void;
  shadow?: boolean;
}): JSX.Element {
  return (
    <FavoriteHolder active={active} onClick={setActive}>
      <StyledFavoriteIcon
        shadow={shadow}
        src={
          active ? "/icons/favorite_active.svg" : "/icons/favorite_inactive.svg"
        }
      ></StyledFavoriteIcon>
    </FavoriteHolder>
  );
}

export default FavoriteIcon;
