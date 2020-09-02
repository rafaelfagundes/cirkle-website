import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import _ from "lodash";
import React from "react";
import styled from "styled-components";
import Colors from "../../enums/Colors";
import { useCart } from "../../hooks/use-cart";
import Product from "../../types/Product";
import CustomButton from "../CustomButton";
import FavoriteIcon from "../FavoriteIcon";
import Padding from "../Padding";
import Row from "../Row";
import SizedBox from "../SizedBox";

const Item = styled.div<{ isSmartphone: boolean }>`
  width: 228px;
  background-color: ${Colors.WHITE};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
  margin-right: ${(props) => (props.isSmartphone ? "16px" : 0)};
  margin-bottom: 28px;
`;

const Image = styled.div<{ image: string }>`
  background-image: ${(props) => `url("${props.image}");`};
  background-color: #cccccc;
  height: 220px;
  width: 228px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const BrandName = styled.div`
  align-items: center;
  background-color: ${Colors.SECONDARY};
  display: flex;
  flex-direction: row;
  height: 18px;
  justify-content: center;
  margin-bottom: 6px;
  padding: 0 10px;
`;

const BrandNameText = styled.span`
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-weight: bold;
  font-size: 12px;
  color: ${Colors.WHITE};
`;

const Title = styled.span`
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 110%;
  display: flex;
  align-items: flex-end;
  color: ${Colors.PRIMARY};
  letter-spacing: -0.5px;
`;

const Description = styled.div`
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 66px;
`;

const Price = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 4px 0;
  border-top-width: 0px;
  border-top-color: ${Colors.VERY_LIGHT_GRAY};
  border-top-style: solid;
`;

const PriceText = styled.span`
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  color: ${Colors.MAGENTA};
  letter-spacing: -0.5px;
`;

const OldPrice = styled.span`
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-weight: 600;
  font-size: 11px;
  line-height: 10px;
  text-decoration-line: line-through;
  color: rgba(0, 0, 0, 0.5);
  margin-left: 3px;
  letter-spacing: -0.5px;
`;

const Discount = styled.div`
  background: ${Colors.RED_CRAYOLA};
  border-radius: 12px;
  padding: 3px 6px;
`;

const DiscountText = styled.span`
  align-items: center;
  color: ${Colors.WHITE};
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: bold;
  line-height: 90%;
  text-align: center;
  display: flex;
`;

const FavoriteIconHolder = styled.div`
  width: 228px;
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 5px 5px 0 0;
`;

function ProductItem({ data }: { data: Product }): JSX.Element {
  const theme = useTheme();
  const smartphone = useMediaQuery(theme.breakpoints.down("sm"));
  const cartContext = useCart();

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

  return (
    <div style={{ position: "relative" }}>
      <FavoriteIconHolder>
        <FavoriteIcon></FavoriteIcon>
      </FavoriteIconHolder>
      <Item isSmartphone={smartphone}>
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
