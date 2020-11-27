import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import useSWR from "swr";
import { CartItems } from "../../../../../styles/pages/cart";
import { useAuth } from "../../../../hooks/auth/useAuth";
import { useWishlist } from "../../../../hooks/wishlist/useWishlist";
import Product from "../../../../modules/product/Product";
import Center from "../../../Atoms/Center";
import Column from "../../../Atoms/Column";
import Icon from "../../../Atoms/Icon";
import LoadingAnimation from "../../../Atoms/LoadingAnimation";
import SizedBox from "../../../Atoms/SizedBox";
import Title from "../../../Atoms/Title";
import WishlistItem from "../../../Molecules/WishlistItem";
import EmptyPage from "../../../Templates/EmptyPage";

const StyledWishlist = styled.div``;

function WishlistTab(): JSX.Element {
  const wishlistContext = useWishlist();
  const authContext = useAuth();

  const { data: dataWishlist } = useSWR(
    authContext.user ? "/wishlists" : null,
    {
      shouldRetryOnError: true,
      errorRetryInterval: 500,
      errorRetryCount: 10,
    }
  );

  if (dataWishlist) {
    if (!wishlistContext.wishlist) {
      setTimeout(() => wishlistContext.setWishlist(dataWishlist), 10);
    }
  }

  const router = useRouter();

  const _goTo = (route: string) => {
    typeof window !== "undefined" && router.push(route);
  };

  return (
    <StyledWishlist>
      {wishlistContext?.wishlist?.products &&
        wishlistContext.wishlist.products.length > 0 && (
          <CartItems>
            {wishlistContext?.wishlist?.products &&
              wishlistContext.wishlist.products.map(
                (item: Product, index: number) => (
                  <>
                    <WishlistItem key={item.id} item={item}></WishlistItem>
                    {wishlistContext.wishlist.products.length !== index + 1 && (
                      <SizedBox height={20}></SizedBox>
                    )}
                  </>
                )
              )}
          </CartItems>
        )}
      {wishlistContext?.wishlist?.products?.length === 0 && (
        <Column>
          <SizedBox height={72}></SizedBox>
          {!authContext.user && (
            <EmptyPage
              buttonAction={() => _goTo("/entrar")}
              buttonText="Entrar"
              icon="heart"
              title="A Lista De Desejos Está Vazia"
              subtitle="Faça o login para sincronizar seus itens salvos."
            ></EmptyPage>
          )}
          {authContext.user && (
            <EmptyPage
              buttonAction={() => _goTo("/")}
              buttonText="Explorar"
              icon="heart"
              title="A Lista De Desejos Está Vazia"
              subtitle="Adicione aqui os produtos que você não quer perder de vista."
            ></EmptyPage>
          )}
          <SizedBox height={72}></SizedBox>
        </Column>
      )}
      {!wishlistContext?.wishlist?.products && (
        <Column>
          <SizedBox height={72}></SizedBox>
          <Center>
            <Icon type="heart" size={128}></Icon>
          </Center>
          <SizedBox height={32}></SizedBox>
          <Center>
            <Title>Carregando Lista de Desejos</Title>
          </Center>
          <SizedBox height={32}></SizedBox>
          <Center>
            <LoadingAnimation size={72} color></LoadingAnimation>
          </Center>
          <SizedBox height={72}></SizedBox>
        </Column>
      )}
    </StyledWishlist>
  );
}

export default WishlistTab;
