import { useMediaQuery } from "@material-ui/core";
import Link from "next/link";
import React, { useState } from "react";
import styled from "styled-components";
import Colors from "../../enums/Colors";
import { useCart } from "../../hooks/cart/useCart";
import Color from "../../modules/color/Color";
import Product from "../../modules/product/Product";
import Size from "../../modules/size/Size";
import theme from "../../theme/theme";
import { cloudinaryImage } from "../../utils/image";
import Column from "../Column";
import IconButton from "../IconButton";
import Row from "../Row";
import SelectMenu, { AssetType, SelectItem } from "../SelectMenu";
import SizedBox from "../SizedBox";
import Title from "../Title";

const StyledCartItem = styled.div<{ showBackground?: boolean }>`
  padding: 16px;
  display: flex;
  flex-direction: column;
  background-color: ${(props) =>
    props.showBackground ? "rgba(0, 0, 0, 0.015)" : "transparent"};
`;

const CartItemImage = styled.div<{ image: string; size: number }>`
  background-image: ${(props) => `url("${props.image}");`};
  background-color: #cccccc;
  height: ${(props) => props.size * 1.25}px;
  width: ${(props) => props.size}px;
  min-width: 90px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
`;

const Description = styled.span<{ isSmartphone?: boolean }>`
  font-family: Commissioner, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  color: ${Colors.PRIMARY};
  font-size: 14px;
  margin-left: 6px;
  max-height: 65px;
  max-width: ${(props) => (props.isSmartphone ? 242 : 430)}px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  font-weight: 500;
  letter-spacing: -0.5px;
`;

const MoreInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const Price = styled.span`
  font-family: Commissioner, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  color: ${Colors.MONEY};
  font-weight: 700;
  margin-left: 6px;
`;

const TitleAndRemove = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 6px);
  margin-left: 6px;
`;

interface CartItemsProps {
  showBackground: boolean;
  item: Product;
}

function CartItem({
  showBackground = false,
  item,
}: CartItemsProps): JSX.Element {
  const cartContext = useCart();
  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));

  const [colors, setColors] = useState(getSelectColors(item.colors));
  const [sizes, setSizes] = useState(getSelectSizes(item.sizes));
  const [qty, setQty] = useState(getSelectQty(item.qty));

  function getSelectQty(qty: number) {
    const finalItems: Array<SelectItem> = [];

    const _qty = qty > 10 ? 10 : qty;

    for (let index = 1; index <= _qty; index++) {
      const selected = index === item.cartQty;

      finalItems.push({
        assetType: AssetType.NONE,
        selected,
        text: index.toString(),
        value: index,
      });
    }

    return finalItems;
  }

  function getSelectColors(items: Array<Color>) {
    const finalItems: Array<SelectItem> = [];
    items?.forEach((color: Color) => {
      const selected = color.name === item.cartColor;

      finalItems.push({
        assetType: AssetType.COLOR,
        assetValue: color.hexColor,
        selected,
        text: color.name,
        value: color.id,
      });
    });

    return finalItems;
  }

  function getSelectSizes(items: Array<Size>) {
    const finalItems: Array<SelectItem> = [];
    items?.forEach((size: Size) => {
      const selected = size.value === item.cartSize;

      finalItems.push({
        assetType: AssetType.NONE,
        selected,
        text: size.value,
        value: size.id,
      });
    });

    return finalItems;
  }

  React.useEffect(() => {
    const color = colors.find((o: SelectItem) => o.selected);
    if (color) {
      cartContext.updateColor(item.id, color.text);
    }
  }, [colors]);

  React.useEffect(() => {
    const size = sizes.find((o: SelectItem) => o.selected);
    if (size) {
      cartContext.updateSize(item.id, size.text);
    }
  }, [sizes]);

  React.useEffect(() => {
    const _qty = qty.find((o: SelectItem) => o.selected);
    if (_qty) {
      cartContext.updateQuantity(item.id, _qty.value);
    }
  }, [qty]);

  return (
    <StyledCartItem key={item.id} showBackground={showBackground}>
      <Row>
        <span style={{ cursor: "pointer" }}>
          <Link href={`/produtos/${item.uid}`}>
            <CartItemImage
              image={cloudinaryImage(item.image, 75)}
              size={90}
            ></CartItemImage>
          </Link>
        </span>
        <span style={{ marginLeft: 6, width: "100%" }}>
          <Column spaceBetween minHeight={112}>
            <div style={{ cursor: "pointer" }}>
              <TitleAndRemove>
                <Link href={`/produtos/${item.uid}`}>
                  <span>
                    <Title size={12}>{item.title}</Title>
                  </span>
                </Link>
                <SizedBox width={16}></SizedBox>
                <IconButton
                  type="delete"
                  onClick={() => cartContext.removeFromCart(item.id)}
                  size={16}
                ></IconButton>
              </TitleAndRemove>
              <SizedBox height={4}></SizedBox>
              <Link href={`/produtos/${item.uid}`}>
                <Description isSmartphone={isSmartPhone}>
                  {item.description}
                </Description>
              </Link>
              <SizedBox height={8}></SizedBox>
            </div>
            <div>
              <Price>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(item.price)}
              </Price>
            </div>
          </Column>
        </span>
      </Row>
      <SizedBox height={16}></SizedBox>
      <MoreInfo>
        <SelectMenu
          title="Cor"
          placeholder="Cores"
          items={colors}
          setSelected={setColors}
          width={isSmartPhone ? 167 : 174}
          errorText=""
        ></SelectMenu>
        {/* <SizedBox width={8}></SizedBox> */}
        <SelectMenu
          title="Tamanho"
          placeholder="Tam."
          items={sizes}
          setSelected={setSizes}
          width={isSmartPhone ? 80 : 174}
          errorText=""
        ></SelectMenu>
        {/* <SizedBox width={8}></SizedBox> */}
        <SelectMenu
          title="Quantidade"
          placeholder="Qtd."
          items={qty}
          setSelected={setQty}
          width={isSmartPhone ? 80 : 174}
          errorText=""
        ></SelectMenu>
      </MoreInfo>
    </StyledCartItem>
  );
}

export default CartItem;
