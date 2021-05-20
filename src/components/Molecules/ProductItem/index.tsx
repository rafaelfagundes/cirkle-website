import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import Axios from "axios";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Colors from "../../../enums/Colors";
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
  SizeContainer,
  SizeHolder,
  Title,
} from "./styles";

function ProductItem({
  data,
  removeButton = false,
  numberPosition = 0,
  disabled = false,
}: {
  data: Product;
  removeButton?: boolean;
  numberPosition?: number;
  disabled?: boolean;
}): JSX.Element {
  const controls = useAnimation();
  const theme = useTheme();
  const isSmartphone = useMediaQuery(theme.breakpoints.down("sm"));
  const cartContext = useCart();
  const wishlistContext = useWishlist();
  const isAlreadyInWishlist = wishlistContext.isItemInWishlist(data.id);
  const router = useRouter();

  const _goToProduct = (id: string) => {
    router.push(`/produtos/${id}`);
  };

  const getProduct = async (uid: string) => {
    try {
      const response = await Axios.get(`/products/${uid}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = async () => {
    const product: Product = await getProduct(data.uid);
    product.cartQty = product.cartQty ? product.cartQty + 1 : 1;
    cartContext.addToCart(product);
  };

  const addToWishlist = async () => {
    const product: Product = await getProduct(data.uid);
    wishlistContext.addToWishlist(product);
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
          onClick={disabled ? null : () => _goToProduct(data.uid)}
          style={{ position: "relative" }}
        >
          <SizeContainer>
            {data?.sizes?.map((size) => (
              <SizeHolder key={size.value}>
                <Size>{size.value}</Size>
              </SizeHolder>
            ))}
          </SizeContainer>
          <Image image={cloudinaryImage(data.image, 230)}></Image>
        </span>
        <Content>
          <span onClick={disabled ? null : () => _goToProduct(data.uid)}>
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
              onClick={disabled ? null : () => addToCart()}
            >
              {isAlreadyInCart ? "Está na Sacola" : "Adicionar à Sacola"}
            </CustomButton>
            <IconButton
              type={isAlreadyInWishlist ? "heart-white-fill" : "heart"}
              border={!isAlreadyInWishlist}
              filled={isAlreadyInWishlist}
              color={isAlreadyInWishlist ? Colors.SECONDARY : Colors.PRIMARY}
              onClick={
                disabled
                  ? null
                  : isAlreadyInWishlist
                  ? () => wishlistContext.removeFromWishlist(data.id)
                  : () => addToWishlist()
              }
            ></IconButton>
          </Row>
        </Content>
      </Item>
      {numberPosition !== 0 && (
        <NumberPosition>
          <NumberPositionText>{numberPosition}º</NumberPositionText>
        </NumberPosition>
      )}
    </div>
  );
}

export default ProductItem;
