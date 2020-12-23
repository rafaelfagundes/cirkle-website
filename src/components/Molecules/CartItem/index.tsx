import { useMediaQuery } from "@material-ui/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  CartItemImage,
  ImagePrice,
  OldPrice,
  Price,
  ProductBrand,
  ProductTitle,
  SpaceBetweenColumn,
  StyledCartItem,
  TitleAndRemove,
  TopAlignedRow,
} from "../../../../styles/pages/cart";
import { useCart } from "../../../hooks/cart/useCart";
import Color from "../../../modules/color/Color";
import Product from "../../../modules/product/Product";
import Size from "../../../modules/size/Size";
import theme from "../../../theme/theme";
import { cloudinaryImage } from "../../../utils/image";
import CustomButton from "../../Atoms/CustomButton";
import HorizontalLine from "../../Atoms/HorizontalLine";
import IconButton from "../../Atoms/IconButton";
import Padding from "../../Atoms/Padding";
import Row from "../../Atoms/Row";
import SelectMenu, { AssetType, SelectItem } from "../../Atoms/SelectMenu";
import SizedBox from "../../Atoms/SizedBox";
import TitleAndData from "../../Atoms/TitleAndData";

interface CartItemsProps {
  showBackground: boolean;
  showSelects: boolean;
  isImmutable?: boolean;
  item: Product | any;
}

function CartItem({
  showBackground = false,
  item,
  showSelects = true,
  isImmutable = false,
}: CartItemsProps): JSX.Element {
  const cartContext = useCart();
  const router = useRouter();

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

  const _goTo = (route: string) => {
    typeof window !== "undefined" && router.push(route);
  };

  return (
    <StyledCartItem key={item.id} showBackground={showBackground}>
      <Padding
        horizontal={isImmutable ? 0 : 16}
        vertical={isImmutable ? 0 : 16}
      >
        <Row>
          <ImagePrice onClick={() => _goTo("/produtos/" + item.uid)}>
            <CartItemImage
              image={cloudinaryImage(item.image, isImmutable ? 100 : 90)}
              size={isImmutable ? 75 : 65}
            ></CartItemImage>
          </ImagePrice>
          <SpaceBetweenColumn>
            <Row alignTop>
              <TitleAndRemove>
                <Link href={isImmutable ? "" : `/produtos/${item.uid}`}>
                  <ProductBrand>{item.brand.name}</ProductBrand>
                </Link>
                <Link href={isImmutable ? "" : `/produtos/${item.uid}`}>
                  <ProductTitle>{item.title}</ProductTitle>
                </Link>
                <SizedBox width={16}></SizedBox>
              </TitleAndRemove>
              {!isImmutable && (
                <>
                  {isSmartPhone && (
                    <IconButton
                      // border
                      // color={Colors.ERROR}
                      type="trash-red"
                      onClick={() => cartContext.removeFromCart(item.id)}
                    ></IconButton>
                  )}
                  {!isSmartPhone && (
                    <CustomButton
                      width={160}
                      variant="text"
                      type="delete"
                      icon="trash-red"
                      onClick={() => cartContext.removeFromCart(item.id)}
                    >
                      Remover
                    </CustomButton>
                  )}
                </>
              )}
            </Row>
            <Link href={`/produtos/${item.uid}`}>
              <>
                {!isImmutable && (
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
                )}
                {isSmartPhone && <SizedBox height={10}></SizedBox>}
                {isImmutable && (
                  <Padding horizontal={10}>
                    <Row>
                      <TitleAndData title="Tamanho">
                        {item.cartSize}
                      </TitleAndData>
                      <SizedBox width={20}></SizedBox>
                      <TitleAndData title="Cor">{item.cartColor}</TitleAndData>
                      <SizedBox width={20}></SizedBox>
                      <TitleAndData title="Quantidade">
                        {item.cartQty.toString()}
                      </TitleAndData>
                    </Row>
                  </Padding>
                )}
                {isSmartPhone && (
                  <>
                    <SizedBox height={10}></SizedBox>
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
                  </>
                )}
              </>
            </Link>
          </SpaceBetweenColumn>
          {isImmutable && !isSmartPhone && (
            <Row>
              <OldPrice>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(item.priceWhenNew)}
              </OldPrice>
              <Price>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(item.price)}
              </Price>
            </Row>
          )}
        </Row>
        {!isImmutable && showSelects && (
          <>
            <SizedBox height={16}></SizedBox>
            <HorizontalLine />
            <SizedBox height={10}></SizedBox>
            <TopAlignedRow>
              <SelectMenu
                title="Cor"
                placeholder="Cores"
                items={colors}
                setSelected={setColors}
                width={isSmartPhone ? 167 : 174}
                errorText=""
              ></SelectMenu>
              <SelectMenu
                title="Tamanho"
                placeholder="Tam."
                items={sizes}
                setSelected={setSizes}
                width={isSmartPhone ? 80 : 174}
                errorText=""
              ></SelectMenu>
              <SelectMenu
                title="Quantidade"
                placeholder="Qtd."
                items={qty}
                setSelected={setQty}
                width={isSmartPhone ? 80 : 174}
                errorText=""
              ></SelectMenu>
            </TopAlignedRow>
          </>
        )}
      </Padding>
    </StyledCartItem>
  );
}

export default CartItem;
