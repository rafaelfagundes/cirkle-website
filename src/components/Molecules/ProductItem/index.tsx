import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Colors from "../../../enums/Colors";
import { useAuth } from "../../../hooks/auth/useAuth";
import { useCart } from "../../../hooks/cart/useCart";
import { useWishlist } from "../../../hooks/wishlist/useWishlist";
import Product from "../../../modules/product/Product";
import { cloudinaryImage } from "../../../utils/image";
import CustomButton from "../../Atoms/CustomButton";
import Icon from "../../Atoms/Icon";
import IconButton from "../../Atoms/IconButton";
import Row from "../../Atoms/Row";
import {
  AnimatedHeart,
  BrandNameText,
  Content,
  Description,
  Image,
  Item,
  NumberPosition,
  NumberPositionText,
  OldPrice,
  Price,
  Size,
  SizeHolder,
  Title,
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
        <span
          onClick={() => _goToProduct(data.uid)}
          style={{ position: "relative" }}
        >
          <SizeHolder>
            <Size>{data.sizes.length === 1 ? data.sizes[0].value : "+"}</Size>
          </SizeHolder>
          <Image image={cloudinaryImage(data.image, 230)}></Image>
        </span>
        <Content>
          <span onClick={() => _goToProduct(data.uid)}>
            <Description>
              <BrandNameText>{data.brand.name}</BrandNameText>
              <Title>{data.title}</Title>
              <Row>
                <Price>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(data.price)}
                </Price>
                <OldPrice>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(data.priceWhenNew)}
                </OldPrice>
              </Row>
            </Description>
          </span>
          <Row spaceBetween>
            <CustomButton
              width={143}
              type={isAlreadyInCart ? "disabled" : "default"}
              variant="contained"
              onClick={() => {
                data.cartQty = 1;
                cartContext.addToCart(data);
              }}
            >
              {isAlreadyInCart ? "Está na Sacola" : "Adicionar à Sacola"}
            </CustomButton>
            <IconButton
              type={isAlreadyInWishlist ? "heart-white" : "heart"}
              border={!isAlreadyInWishlist}
              filled={isAlreadyInWishlist}
              color={isAlreadyInWishlist ? Colors.SECONDARY : Colors.PRIMARY}
              onClick={
                isAlreadyInWishlist
                  ? () => wishlistContext.removeFromWishlist(data.id)
                  : () => wishlistContext.addToWishlist(data)
              }
            ></IconButton>
          </Row>
        </Content>
      </Item>
      {numberPosition !== 0 && (
        <NumberPosition>
          {/* <NumberPositionDetail></NumberPositionDetail> */}
          <NumberPositionText>{numberPosition}º</NumberPositionText>
        </NumberPosition>
      )}
    </div>
  );
}

export default ProductItem;
