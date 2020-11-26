import { useMediaQuery } from "@material-ui/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import {
  CartItem,
  CartItemImage,
  ImagePrice,
  MoreInfo,
  OldPrice,
  Price,
  ProductBrand,
  ProductTitle,
  TitleAndRemove,
} from "../../../../styles/pages/cart";
import { useCart } from "../../../hooks/cart/useCart";
import { useWishlist } from "../../../hooks/wishlist/useWishlist";
import Product from "../../../modules/product/Product";
import theme from "../../../theme/theme";
import { cloudinaryImage } from "../../../utils/image";
import CustomButton from "../../Atoms/CustomButton";
import IconButton from "../../Atoms/IconButton";
import Row from "../../Atoms/Row";
import SizedBox from "../../Atoms/SizedBox";

const SpaceBetweenColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 113px;
  width: 100%;
`;

interface WishlistItemProps {
  item: Product;
}

function WishlistItem({ item }: WishlistItemProps): JSX.Element {
  const wishlistContext = useWishlist();
  const cartContext = useCart();

  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));

  const router = useRouter();

  const _goTo = (route: string) => {
    typeof window !== "undefined" && router.push(route);
  };

  const getCartButton = (item: Product) => {
    const isAlreadyInCart = cartContext.isItemInCart(item.id);

    return (
      <CustomButton
        type={isAlreadyInCart ? "disabled" : "default"}
        variant="contained"
        width={isAlreadyInCart ? 150 : 150}
        onClick={() => {
          item.cartQty = 1;
          cartContext.addToCart(item);
        }}
      >
        {isAlreadyInCart ? "Está na Sacola" : "Adicionar à Sacola"}
      </CustomButton>
    );
  };

  return (
    <CartItem key={item.id}>
      <ImagePrice onClick={() => _goTo("/produtos/" + item.uid)}>
        <CartItemImage
          image={cloudinaryImage(item.image, 130)}
          size={95}
        ></CartItemImage>
      </ImagePrice>
      <SpaceBetweenColumn>
        <div>
          <TitleAndRemove>
            <Link href={`/produtos/${item.uid}`}>
              <ProductBrand>{item.brand.name}</ProductBrand>
            </Link>
            <Link href={`/produtos/${item.uid}`}>
              <ProductTitle>{item.title}</ProductTitle>
            </Link>
            <SizedBox width={16}></SizedBox>
          </TitleAndRemove>
          <SizedBox height={8}></SizedBox>
          <Link href={`/produtos/${item.uid}`}>
            <Row>
              <Price>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(item.price)}
              </Price>
              <OldPrice>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(item.priceWhenNew)}
              </OldPrice>
            </Row>
          </Link>
        </div>
        <MoreInfo>
          {getCartButton(item)}
          <SizedBox width={10}></SizedBox>
          {isSmartPhone && (
            <IconButton
              // border
              // borderColor={Colors.ERROR}
              type="trash-red"
              onClick={() => wishlistContext.removeFromWishlist(item.id)}
            ></IconButton>
          )}
          {!isSmartPhone && (
            <CustomButton
              width={120}
              variant="text"
              type="delete"
              icon="trash-red"
              onClick={() => wishlistContext.removeFromWishlist(item.id)}
            >
              Remover
            </CustomButton>
          )}
        </MoreInfo>
      </SpaceBetweenColumn>
    </CartItem>
  );
}

export default WishlistItem;
