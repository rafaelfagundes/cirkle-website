import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import useSWR from "swr";
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

  const { data } = useSWR("/wishlists", {
    shouldRetryOnError: true,
    errorRetryInterval: 1000,
    errorRetryCount: 10,
  });

  if (data) {
    if (!wishlistContext.wishlist) {
      wishlistContext.setWishlist(data);
    }
  }

  return (
    <>
      {!wishlistContext.wishlist && (
        <IconButton
          type="heart"
          onClick={() => goTo("/minha-lista")}
        ></IconButton>
      )}
      {wishlistContext.wishlist &&
        wishlistContext.wishlist.products.length === 0 && (
          <IconButton
            type="heart"
            onClick={() => goTo("/minha-lista")}
          ></IconButton>
        )}
      {wishlistContext.wishlist &&
        wishlistContext.wishlist.products.length > 0 && (
          <FavoriteIconHolder onClick={() => goTo("/minha-lista")}>
            <IconButton
              type="heart-fill"
              onClick={() => goTo("/minha-lista")}
            ></IconButton>
            <Badge position={BadgePosition.TOP_RIGHT}>
              {wishlistContext.wishlist.products.length.toString()}
            </Badge>
          </FavoriteIconHolder>
        )}
    </>
  );
}

export default FavoriteMenuItem;
