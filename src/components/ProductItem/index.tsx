import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "../../hooks/auth/useAuth";
import { useCart } from "../../hooks/cart/useCart";
import { useWishlist } from "../../hooks/wishlist/useWishlist";
import Product from "../../modules/product/Product";
import { cloudinaryImage } from "../../utils/image";
import CustomButton from "../CustomButton";
import FavoriteIcon from "../FavoriteIcon";
import Icon from "../Icon";
import Padding from "../Padding";
import Price from "../Price";
import SizedBox from "../SizedBox";
import {
  AnimatedHeart,
  BrandName,
  BrandNameText,
  Description,
  FavoriteIconHolder,
  Image,
  Item,
  NumberPosition,
  NumberPositionDetail,
  NumberPositionText,
  RemoveButton,
  RemoveIconHolder,
  Title,
  TitleHolder,
} from "./styles";

function ProductItem({
  data,
  removeButton = false,
  numberPosition = 0,
}: {
  data: Product;
  removeButton?: boolean;
  numberPosition?: number;
}): JSX.Element {
  const controls = useAnimation();
  const theme = useTheme();
  const isSmartphone = useMediaQuery(theme.breakpoints.down("sm"));
  const cartContext = useCart();
  const wishlistContext = useWishlist();
  const isAlreadyInWishlist = wishlistContext.isItemInWishlist(data.id);
  const router = useRouter();

  const authContext = useAuth();

  const _goToProduct = (id: string) => {
    router.push(`/produtos/${id}`);
  };

  const _addToCart = (item: Product) => {
    item.cartQty = item.cartQty ? item.cartQty + 1 : 1;
    cartContext.addToCart(item);
  };

  const isAlreadyInCart = cartContext.isItemInCart(data.id);

  const heartAnimation = async () => {
    const speed = 0.4; // lower is faster

    await controls.start({
      opacity: 1,
      scale: 160,
      transition: { duration: speed },
    });
    await controls.start({
      opacity: 0,
      scale: 1,
      transition: { duration: speed },
    });
    controls.start({
      opacity: 0,
      scale: 0,
      transition: { duration: speed },
    });
  };

  useEffect(() => {
    if (isAlreadyInWishlist && !removeButton) {
      heartAnimation();
    }
  }, [isAlreadyInWishlist]);

  return (
    <div
      style={{
        position: "relative",
        width: 228,
        minWidth: 228,
        overflow: "hidden",
      }}
    >
      {!removeButton && authContext.user && (
        <FavoriteIconHolder>
          <FavoriteIcon
            active={isAlreadyInWishlist}
            setActive={
              isAlreadyInWishlist
                ? () => wishlistContext.removeFromWishlist(data.id)
                : () => wishlistContext.addToWishlist(data)
            }
          ></FavoriteIcon>
        </FavoriteIconHolder>
      )}
      {removeButton && (
        <RemoveIconHolder>
          <RemoveButton>
            <Icon
              type="remove"
              alt="Remover da Lista de Favoritos"
              onClick={() => wishlistContext.removeFromWishlist(data.id)}
            ></Icon>
          </RemoveButton>
        </RemoveIconHolder>
      )}
      <Item
        isSmartphone={isSmartphone}
        onDoubleClick={
          isAlreadyInWishlist
            ? () => wishlistContext.removeFromWishlist(data.id)
            : () => wishlistContext.addToWishlist(data)
        }
      >
        <AnimatedHeart isSmartphone={isSmartphone}>
          <motion.div animate={controls} initial={{ opacity: 0, scale: 0 }}>
            <Icon type="heart-fill" size={1}></Icon>
          </motion.div>
        </AnimatedHeart>
        <span onClick={() => _goToProduct(data.uid)}>
          <Image image={cloudinaryImage(data.image, 230)}></Image>
          <BrandName>
            <BrandNameText>{data.brand.name}</BrandNameText>
          </BrandName>
          <Description>
            <TitleHolder>
              <Title>{data.title}</Title>
            </TitleHolder>
            <Price price={data.price} priceWhenNew={data.priceWhenNew}></Price>
          </Description>
          <SizedBox height={8}></SizedBox>
        </span>
        {removeButton && (
          <>
            <Padding horizontal={8}>
              <CustomButton
                type={isAlreadyInCart ? "disabled" : "success"}
                variant={isAlreadyInCart ? "text" : "outlined"}
                onClick={() => _addToCart(data)}
                width={212}
              >
                {isAlreadyInCart ? "Já Está Na Sacola" : "Adicionar à Sacola"}
              </CustomButton>
            </Padding>
            <SizedBox height={8}></SizedBox>
          </>
        )}
      </Item>
      {numberPosition !== 0 && (
        <NumberPosition>
          <NumberPositionDetail></NumberPositionDetail>
          <NumberPositionText>#{numberPosition}</NumberPositionText>
        </NumberPosition>
      )}
    </div>
  );
}

export default ProductItem;
