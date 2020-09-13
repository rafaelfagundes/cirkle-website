import { useMediaQuery, useTheme } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import Column from "../src/components/Column";
import CustomButton from "../src/components/CustomButton";
import EmptyPage from "../src/components/EmptyPage";
import Icon from "../src/components/Icon";
import Padding from "../src/components/Padding";
import ProductItem from "../src/components/ProductItem";
import SizedBox from "../src/components/SizedBox";
import Title from "../src/components/Title";
import Colors from "../src/enums/Colors";
import { useCart } from "../src/hooks/use-cart";
import { useWishlist } from "../src/hooks/use-wishlist";
import Product from "../src/types/Product";
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
`;

function Wishlist(): JSX.Element {
  const theme = useTheme();
  const isSmartphone = useMediaQuery(theme.breakpoints.down("xs"));
  const wishlistContext = useWishlist();
  const cartContext = useCart();

  const router = useRouter();

  const _goToProducts = () => {
    router.push("/products");
  };

  const _goToProduct = (id: string) => {
    console.log("_goToProduct -> id", id);
    return;
  };

  const getCartButton = (item: Product) => {
    const isAlreadyInCart = cartContext.isItemInCart(item.id);

    return (
      <CustomButton
        type={isAlreadyInCart ? "disabled" : "success"}
        variant="contained"
        onClick={() => cartContext.addToCart(item)}
        icon={isAlreadyInCart ? null : "bag-plus"}
      >
        {isAlreadyInCart ? "Está Na Sacola" : ""}
      </CustomButton>
    );
  };

  // Scroll to top when page is loaded
  if (process.browser) window.scrollTo(0, 0);

  return (
    <StyledWishlist isSmartphone={isSmartphone}>
      {wishlistContext.wishlist.items.length > 0 && (
        <>
          <SizedBox height={16}></SizedBox>
          <Padding horizontal={isSmartphone ? 16 : 0}>
            <Title size={18}>Lista de Desejos</Title>
          </Padding>
          <SizedBox height={16}></SizedBox>

          {!isSmartphone && (
            <Items>
              {wishlistContext.wishlist.items.map((item, index) => (
                <>
                  <ProductItem
                    key={index}
                    data={item}
                    removeButton={true}
                  ></ProductItem>
                  {(index + 1) % 4 !== 0 && <SizedBox width={16}></SizedBox>}
                </>
              ))}
            </Items>
          )}

          {isSmartphone && (
            <CartItems>
              {wishlistContext.wishlist.items.map(
                (item: Product, index: number) => (
                  <CartItem key={item.id} showBackground={index % 2 === 0}>
                    <ImagePrice>
                      <CartItemImage
                        image={item.image}
                        size={90}
                      ></CartItemImage>
                      <SizedBox height={8}></SizedBox>
                      <Price>
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(item.price)}
                      </Price>
                    </ImagePrice>
                    <SpaceBetweenColumn>
                      <div>
                        <TitleAndRemove>
                          <Title>{item.title}</Title>
                          <SizedBox width={16}></SizedBox>
                          <Icon
                            size={16}
                            type="remove"
                            onClick={() =>
                              wishlistContext.removeFromWishlist(item.id)
                            }
                          ></Icon>
                        </TitleAndRemove>
                        <SizedBox height={8}></SizedBox>
                        <Description>{item.description}</Description>
                        <SizedBox height={8}></SizedBox>
                      </div>
                      <MoreInfo>
                        <CustomButton
                          type="secondary"
                          variant="text"
                          onClick={() => _goToProduct(item.id)}
                        >
                          Ver Produto
                        </CustomButton>
                        <SizedBox width={8}></SizedBox>
                        {getCartButton(item)}
                      </MoreInfo>
                    </SpaceBetweenColumn>
                  </CartItem>
                )
              )}
            </CartItems>
          )}
        </>
      )}
      {wishlistContext.wishlist.items.length === 0 && (
        <Column>
          <SizedBox height={72}></SizedBox>
          <EmptyPage
            buttonAction={_goToProducts}
            buttonText="Explorar"
            icon="heart"
            title="A Lista De Desejos Está Vazia"
            subtitle="Adicione os produtos que você não quer perder de vista."
          ></EmptyPage>
          <SizedBox height={72}></SizedBox>
        </Column>
      )}
    </StyledWishlist>
  );
}

export default Wishlist;
