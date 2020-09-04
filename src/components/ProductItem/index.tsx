import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { motion, useAnimation } from "framer-motion";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useCart } from "../../hooks/use-cart";
import Product from "../../types/Product";
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
  Title,
} from "./styles";

function ProductItem({ data }: { data: Product }): JSX.Element {
  const controls = useAnimation();
  const theme = useTheme();
  const smartphone = useMediaQuery(theme.breakpoints.down("sm"));
  const cartContext = useCart();
  const [isFavorited, setIsFavorited] = useState(false);

  const _goToProduct = (id: string) => {
    console.log("go to product:", id);
  };

  const _addToCart = (item: Product) => {
    console.log("add to cart:", item);
    cartContext.addToCart(item);
  };

  const _alreadyInCart = () => {
    const item = _.find(cartContext.cart.items, (o) => o.id === data.id);

    if (item) return true;
    else return false;
  };

  const isAlreadyInCart = _alreadyInCart();

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
    if (isFavorited) {
      console.log("favoritou");
      heartAnimation();
    }
  }, [isFavorited]);

  return (
    <div style={{ position: "relative" }}>
      <FavoriteIconHolder>
        <FavoriteIcon
          active={isFavorited}
          setActive={setIsFavorited}
        ></FavoriteIcon>
      </FavoriteIconHolder>
      <Item
        isSmartphone={smartphone}
        onDoubleClick={() => setIsFavorited(!isFavorited)}
      >
        <AnimatedHeart isSmartphone={smartphone}>
          <motion.div animate={controls} initial={{ opacity: 0, scale: 0 }}>
            <Icon type="heart-fill" size={96}></Icon>
          </motion.div>
        </AnimatedHeart>
        <Image image={data.image}></Image>
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
              onClick={() => _goToProduct(data.id)}
            >
              Ver
            </CustomButton>
            <SizedBox width={8}></SizedBox>
            <CustomButton
              type={isAlreadyInCart ? "disabled" : "success"}
              variant="contained"
              onClick={() => _addToCart(data)}
              icon={isAlreadyInCart ? "check" : "bag-plus"}
            ></CustomButton>
          </Row>
        </Padding>
        <SizedBox height={8}></SizedBox>
      </Item>
    </div>
  );
}

export default ProductItem;
