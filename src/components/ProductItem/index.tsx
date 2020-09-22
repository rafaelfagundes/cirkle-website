import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";
import { useCart } from "../../hooks/use-cart";
import { useWishlist } from "../../hooks/use-wishlist";
import Product from "../../modules/product/Product";
import { cloudinaryImage } from "../../utils/image";
import CustomButton from "../CustomButton";
import FavoriteIcon from "../FavoriteIcon";
import Icon from "../Icon";
import Padding from "../Padding";
import Row from "../Row";
import SizedBox from "../SizedBox";
import {
  AnimatedHeart,
  BrandName,
  BrandNameText,
  Description,
  Discount,
  DiscountText,
  FavoriteIconHolder,
  Image,
  Item,
  OldPrice,
  Price,
  PriceText,
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
  const isAlreadyInWishlist = wishlistContext.isItemInWishlist(data._id);

  const _goToProduct = (id: string) => {
    console.log("go to product:", id);
  };

  const _addToCart = (item: Product) => {
    // console.log("add to cart:", item);
    item.id = item._id;
    item.cartQty = item.cartQty ? item.cartQty + 1 : 1;
    cartContext.addToCart(item);
  };

  const isAlreadyInCart = cartContext.isItemInCart(data._id);

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
                ? () => wishlistContext.removeFromWishlist(data._id)
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
              onClick={() => wishlistContext.removeFromWishlist(data._id)}
            ></Icon>
          </RemoveButton>
        </RemoveIconHolder>
      )}
      <Item
        isSmartphone={smartphone}
        onDoubleClick={
          isAlreadyInWishlist
            ? () => wishlistContext.removeFromWishlist(data._id)
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
          <BrandNameText>{data.brand}</BrandNameText>
        </BrandName>
        <Description>
          <Title>{data.title}</Title>
          <Price>
            <Row>
              <PriceText>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(data.price)}
              </PriceText>
              <OldPrice>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(data.priceWhenNew)}
              </OldPrice>
            </Row>
            <Discount>
              <DiscountText>
                -{Math.round((1 - data.price / data.priceWhenNew) * 100)}%
              </DiscountText>
            </Discount>
          </Price>
        </Description>
        <SizedBox height={8}></SizedBox>
        <Padding horizontal={8}>
          <Row>
            <CustomButton
              type="secondary"
              variant="outlined"
              onClick={() => _goToProduct(data._id)}
            >
              Ver
            </CustomButton>
            <SizedBox width={8}></SizedBox>
            <CustomButton
              type={isAlreadyInCart ? "disabled" : "success"}
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
