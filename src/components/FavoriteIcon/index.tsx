import React, { useState } from "react";
import styled from "styled-components";

const FavoriteHolder = styled.div<{ active: boolean }>`
  width: 44px;
  height: 44px;
  cursor: pointer;
`;

const StyledFavoriteIcon = styled.img`
  width: 44px;
  height: 44px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
  border-radius: 22px;
  cursor: pointer;
`;

function FavoriteIcon(): JSX.Element {
  const [active, setActive] = useState(false);

  return (
    <FavoriteHolder active={active} onClick={() => setActive(!active)}>
      <StyledFavoriteIcon
        src={
          active ? "/icons/favorite_active.svg" : "/icons/favorite_inactive.svg"
        }
      ></StyledFavoriteIcon>
    </FavoriteHolder>
  );
}

export default FavoriteIcon;
