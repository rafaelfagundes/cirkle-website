import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useCart } from "../../hooks/cart/useCart";
import { useWishlist } from "../../hooks/wishlist/useWishlist";
import Product from "../../modules/product/Product";
import { cloudinaryImage } from "../../utils/image";
import CustomButton from "../CustomButton";
import FavoriteIcon from "../FavoriteIcon";
import Icon from "../Icon";
import Padding from "../Padding";
import Price from "../Price";
import Row from "../Row";
import SizedBox from "../SizedBox";
import {
  AnimatedHeart,
  BrandName,
  BrandNameText,
  Description,
  FavoriteIconHolder,
  Image,
  Item,
  RemoveButton,
  RemoveIconHolder,
  Title,
} from "./styles";

function ProductItem({
  data,
  removeButton = false,
}: {
  data: Product;
  removeButton?: boolean;
}): JSX.Element {
  const controls = useAnimation();
  const theme = useTheme();
  const smartphone = useMediaQuery(theme.breakpoints.down("sm"));
  const cartContext = useCart();
  const wishlistContext = useWishlist();
  const isAlreadyInWishlist = wishlistContext.isItemInWishlist(data.id);
  const router = useRouter();

  const _goToProduct = (id: string) => {
    router.push(`/products/${id}`);
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
      scale: 2,
      transition: { duration: speed },
    });

    await controls.start({
      opacity: 0,
      scale: 1,
      transition: { duration: speed },
    });
    controls.start({
      opacity: 0,
      scale: 1,
      transition: { duration: speed },
    });
  };

  useEffect(() => {
    if (isAlreadyInWishlist && !removeButton) {
      heartAnimation();
    }
  }, [isAlreadyInWishlist]);

  return (
    <div style={{ position: "relative" }}>
      {!removeButton && (
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
        isSmartphone={smartphone}
        onDoubleClick={
          isAlreadyInWishlist
            ? () => wishlistContext.removeFromWishlist(data.id)
            : () => wishlistContext.addToWishlist(data)
        }
      >
        <AnimatedHeart isSmartphone={smartphone}>
          <motion.div animate={controls} initial={{ opacity: 0, scale: 0 }}>
            <Icon type="heart-fill" size={96}></Icon>
          </motion.div>
        </AnimatedHeart>
        <Image image={cloudinaryImage(data.image, 230)}></Image>
        <BrandName>
          <BrandNameText>{data.brand.name}</BrandNameText>
        </BrandName>
        <Description>
          <Title>{data.title}</Title>
          <Price price={data.price} priceWhenNew={data.priceWhenNew}></Price>
        </Description>
        <SizedBox height={8}></SizedBox>
        <Padding horizontal={8}>
          <Row>
            <CustomButton
              type="secondary"
              variant="text"
              onClick={() => _goToProduct(data.uid)}
              // icon="search"
            >
              Ver Mais
            </CustomButton>
            <SizedBox width={8}></SizedBox>
            <CustomButton
              type={isAlreadyInCart ? "disabled" : "primary"}
              variant="contained"
              onClick={() => _addToCart(data)}
              icon={isAlreadyInCart ? null : "bag-plus"}
            >
              {isAlreadyInCart ? "Está Na Sacola" : ""}
            </CustomButton>
          </Row>
        </Padding>
        <SizedBox height={8}></SizedBox>
      </Item>
    </div>
  );
}

export default ProductItem;
