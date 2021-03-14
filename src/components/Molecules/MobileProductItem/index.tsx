import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import Axios from "axios";
import { useAnimation } from "framer-motion";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Colors from "../../../enums/Colors";
import { useCart } from "../../../hooks/cart/useCart";
import { useWishlist } from "../../../hooks/wishlist/useWishlist";
import Product from "../../../modules/product/Product";
import { cloudinaryImage } from "../../../utils/image";
import CustomButton from "../../Atoms/CustomButton";
import IconButton from "../../Atoms/IconButton";
import Row from "../../Atoms/Row";
import SizedBox from "../../Atoms/SizedBox";
import {
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

function MobileProductItem({
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
        width: "100%",
        minWidth: 228,
        // overflow: "hidden",
      }}
    >
      <Item isSmartphone={isSmartphone}>
        <span
          onClick={() => _goToProduct(data.uid)}
          style={{ position: "relative" }}
        >
          <SizeContainer>
            {data?.sizes?.map((size) => (
              <SizeHolder key={size.id}>
                <Size>{size.value}</Size>
              </SizeHolder>
            ))}
          </SizeContainer>
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
              onClick={() => addToCart()}
            >
              {isAlreadyInCart ? "Está na Sacola" : "Adicionar à Sacola"}
            </CustomButton>
            <SizedBox width={10}></SizedBox>
            <IconButton
              type={isAlreadyInWishlist ? "heart-white-fill" : "heart"}
              border={!isAlreadyInWishlist}
              filled={isAlreadyInWishlist}
              color={isAlreadyInWishlist ? Colors.SECONDARY : Colors.PRIMARY}
              onClick={
                isAlreadyInWishlist
                  ? () => wishlistContext.removeFromWishlist(data.id)
                  : () => addToWishlist()
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

export default MobileProductItem;
