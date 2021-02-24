import { useMediaQuery, useTheme } from "@material-ui/core";
import Axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styled from "styled-components";
import useSWR from "swr";
import Center from "../src/components/Atoms/Center";
import Column from "../src/components/Atoms/Column";
import Icon from "../src/components/Atoms/Icon";
import LoadingAnimation from "../src/components/Atoms/LoadingAnimation";
import SizedBox from "../src/components/Atoms/SizedBox";
import Title from "../src/components/Atoms/Title";
import WishlistItem from "../src/components/Molecules/WishlistItem";
import EmptyPage from "../src/components/Templates/EmptyPage";
import Page from "../src/components/Templates/Page";
import Colors from "../src/enums/Colors";
import { useAuth } from "../src/hooks/auth/useAuth";
import { useWishlist } from "../src/hooks/wishlist/useWishlist";
import Menu from "../src/modules/menu/Menu";
import Product from "../src/modules/product/Product";
import { CartItems } from "../styles/pages/cart";

const StyledWishlist = styled.div<{ isSmartphone: boolean }>`
  background-color: ${(props) =>
    props.isSmartphone ? Colors.WHITE : Colors.TRANSPARENT};
`;

interface PageProps {
  menu: Menu;
  search: any;
}

function Wishlist({ menu, search }: PageProps): JSX.Element {
  const theme = useTheme();
  const isSmartphone = useMediaQuery(theme.breakpoints.down("xs"));
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

  // Scroll to top when page is loaded
  useEffect(() => {
    if (process.browser) window.scrollTo(0, 0);
  }, []);

  return (
    <Page
      title="Lista de Desejos"
      image="images/wishlist.jpg"
      maxWidth={640}
      menu={menu}
      search={search}
    >
      <SizedBox height={20}></SizedBox>
      <StyledWishlist isSmartphone={isSmartphone}>
        {wishlistContext?.wishlist?.products &&
          wishlistContext.wishlist.products.length > 0 && (
            <>
              {!isSmartphone && (
                <CartItems>
                  {wishlistContext?.wishlist?.products &&
                    wishlistContext.wishlist.products.map(
                      (item: Product, index: number) => (
                        <>
                          <WishlistItem
                            key={item.id}
                            item={item}
                          ></WishlistItem>
                          {wishlistContext.wishlist.products.length !==
                            index + 1 && <SizedBox height={20}></SizedBox>}
                        </>
                      )
                    )}
                </CartItems>
              )}

              {isSmartphone && (
                <CartItems>
                  {wishlistContext?.wishlist?.products &&
                    wishlistContext.wishlist.products.map(
                      (item: Product, index: number) => (
                        <>
                          <WishlistItem
                            key={item.id}
                            item={item}
                          ></WishlistItem>
                          {wishlistContext.wishlist.products.length !==
                            index + 1 && <SizedBox height={20}></SizedBox>}
                        </>
                      )
                    )}
                </CartItems>
              )}
            </>
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
      <SizedBox height={20}></SizedBox>
    </Page>
  );
}

export async function getStaticProps(): Promise<any> {
  function getContent(url: string) {
    return Axios.get(url);
  }

  const menuUrl = `${process.env.API_ENDPOINT}/menu`;
  const searchUrl = `${process.env.API_ENDPOINT}/isearch`;

  const results = await Promise.all([
    getContent(menuUrl),
    getContent(searchUrl),
  ]);

  const menu = results[0].data;
  const search = results[1].data;

  return {
    props: {
      menu,
      search,
    },
    revalidate: 1440,
  };
}

export default Wishlist;
