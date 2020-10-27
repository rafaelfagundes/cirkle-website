import { useMediaQuery, useTheme } from "@material-ui/core";
import Axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styled from "styled-components";
import useSWR from "swr";
import Center from "../src/components/Center";
import Column from "../src/components/Column";
import CustomButton from "../src/components/CustomButton";
import EmptyPage from "../src/components/EmptyPage";
import Icon from "../src/components/Icon";
import Layout from "../src/components/Layout";
import LoadingAnimation from "../src/components/LoadingAnimation";
import Padding from "../src/components/Padding";
import ProductItem from "../src/components/ProductItem";
import SizedBox from "../src/components/SizedBox";
import Title from "../src/components/Title";
import Colors from "../src/enums/Colors";
import { useAuth } from "../src/hooks/auth/useAuth";
import { useCart } from "../src/hooks/cart/useCart";
import { useWishlist } from "../src/hooks/wishlist/useWishlist";
import Menu from "../src/modules/menu/Menu";
import Product from "../src/modules/product/Product";
import { cloudinaryImage } from "../src/utils/image";
import {
  CartItem,
  CartItemImage,
  CartItems,
  Description,
  ImagePrice,
  MoreInfo,
  Price,
  TitleAndRemove,
} from "../styles/pages/cart";

const StyledWishlist = styled.div<{ isSmartphone: boolean }>`
  background-color: ${(props) =>
    props.isSmartphone ? Colors.WHITE : Colors.TRANSPARENT};
  padding: ${(props) => (props.isSmartphone ? "16px 0" : "32px 0")};
`;

const Items = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 px;
  flex-wrap: wrap;
`;

const SpaceBetweenColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  min-height: 113px;
  width: 100%;
`;

function Wishlist({ menu }: { menu: Menu }): JSX.Element {
  const theme = useTheme();
  const isSmartphone = useMediaQuery(theme.breakpoints.down("xs"));
  const wishlistContext = useWishlist();
  const cartContext = useCart();
  const authContext = useAuth();

  const { data: dataWishlist } = useSWR("/wishlists", {
    shouldRetryOnError: true,
    errorRetryInterval: 500,
    errorRetryCount: 10,
  });

  if (dataWishlist) {
    if (!wishlistContext.wishlist) {
      setTimeout(() => wishlistContext.setWishlist(dataWishlist), 10);
    }
  }

  const router = useRouter();

  const _goTo = (route: string) => {
    typeof window !== "undefined" && router.push(route);
  };

  const getCartButton = (item: Product) => {
    const isAlreadyInCart = cartContext.isItemInCart(item.id);

    return (
      <CustomButton
        type={isAlreadyInCart ? "disabled" : "success"}
        variant="text"
        small
        width={isAlreadyInCart ? 132 : 195}
        onClick={() => {
          item.cartQty = 1;
          cartContext.addToCart(item);
        }}
        icon={isAlreadyInCart ? "" : "bag-plus-green"}
      >
        {isAlreadyInCart ? "Está Na Sacola" : "Adicionar à Sacola"}
      </CustomButton>
    );
  };

  // Scroll to top when page is loaded
  useEffect(() => {
    if (process.browser) window.scrollTo(0, 0);
  }, []);

  return (
    <Layout menu={menu}>
      <StyledWishlist isSmartphone={isSmartphone}>
        {wishlistContext?.wishlist?.products &&
          wishlistContext.wishlist.products.length > 0 && (
            <>
              <SizedBox height={16}></SizedBox>
              <Padding horizontal={isSmartphone ? 16 : 0}>
                <Title size={18}>Lista de Desejos</Title>
              </Padding>
              <SizedBox height={16}></SizedBox>

              {!isSmartphone && (
                <Items>
                  {wishlistContext?.wishlist?.products &&
                    wishlistContext.wishlist.products.map((item, index) => (
                      <React.Fragment key={index}>
                        <ProductItem
                          data={item}
                          removeButton={true}
                        ></ProductItem>
                        {(index + 1) % 4 !== 0 && (
                          <SizedBox width={16}></SizedBox>
                        )}
                      </React.Fragment>
                    ))}
                </Items>
              )}

              {isSmartphone && (
                <CartItems>
                  {wishlistContext?.wishlist?.products &&
                    wishlistContext.wishlist.products.map(
                      (item: Product, index: number) => (
                        <CartItem
                          key={item.id}
                          showBackground={index % 2 === 0}
                        >
                          <ImagePrice
                            onClick={() => _goTo("/produtos/" + item.uid)}
                          >
                            <CartItemImage
                              image={cloudinaryImage(item.image, 90)}
                              size={window.innerWidth * 0.24}
                            ></CartItemImage>
                          </ImagePrice>
                          <SpaceBetweenColumn>
                            <div onClick={() => _goTo("/produtos/" + item.uid)}>
                              <TitleAndRemove>
                                <Title size={12}>{item.title}</Title>
                                <SizedBox width={16}></SizedBox>
                                <Icon
                                  size={16}
                                  type="trash"
                                  onClick={() =>
                                    wishlistContext.removeFromWishlist(item.id)
                                  }
                                ></Icon>
                              </TitleAndRemove>
                              <SizedBox height={4}></SizedBox>
                              <Description>{item.description}</Description>
                              <SizedBox height={8}></SizedBox>
                              <Price>
                                {new Intl.NumberFormat("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                }).format(item.price)}
                              </Price>
                            </div>
                            <MoreInfo>{getCartButton(item)}</MoreInfo>
                          </SpaceBetweenColumn>
                        </CartItem>
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
    </Layout>
  );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getStaticProps(): Promise<any> {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library

  const menuUrl = `${process.env.API_ENDPOINT}/menu`;
  const menuResult = await Axios.get(menuUrl);
  const menu = menuResult.data;

  return {
    props: {
      menu,
    },
    revalidate: 60,
  };
}

export default Wishlist;
