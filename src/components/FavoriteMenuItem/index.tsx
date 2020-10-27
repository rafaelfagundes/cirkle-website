import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { useWishlist } from "../../hooks/wishlist/useWishlist";
import Wishlist from "../../modules/wishlist/Wishlist";
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

  function getFavoriteCount(wishlistContext: Wishlist): number {
    if (wishlistContext) {
      return wishlistContext.products.length;
    } else {
      return 0;
    }
  }

  const badgeCount = getFavoriteCount(wishlistContext.wishlist);

  return (
    <>
      {badgeCount === 0 && (
        <IconButton
          type="heart"
          onClick={() => goTo("/minha-lista")}
        ></IconButton>
      )}
      {badgeCount > 0 && (
        <FavoriteIconHolder onClick={() => goTo("/minha-lista")}>
          <IconButton
            type="heart-fill"
            onClick={() => goTo("/minha-lista")}
          ></IconButton>
          <Badge position={BadgePosition.TOP_RIGHT}>
            {badgeCount.toString()}
          </Badge>
        </FavoriteIconHolder>
      )}
    </>
  );
}

export default FavoriteMenuItem;
