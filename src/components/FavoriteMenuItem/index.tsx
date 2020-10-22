import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { useWishlist } from "../../hooks/wishlist/useWishlist";
import Badge, { BadgePosition } from "../Badge";
import IconButton from "../IconButton";

const FavoriteIconHolder = styled.div`
  cursor: pointer;
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

function FavoriteMenuItem(): JSX.Element {
  const wishlistContext = useWishlist();
  const router = useRouter();

  function goTo(route: string) {
    router.push(route);
  }

  return (
    <>
      {wishlistContext.wishlist.items.length === 0 && (
        <IconButton type="heart" onClick={() => goTo("/wishlist")}></IconButton>
      )}
      {wishlistContext.wishlist.items.length > 0 && (
        <FavoriteIconHolder onClick={() => goTo("/wishlist")}>
          <IconButton
            type="heart-fill"
            onClick={() => goTo("/wishlist")}
          ></IconButton>
          <Badge position={BadgePosition.TOP_RIGHT}>
            {wishlistContext.wishlist.items.length.toString()}
          </Badge>
        </FavoriteIconHolder>
      )}
    </>
  );
}

export default FavoriteMenuItem;
