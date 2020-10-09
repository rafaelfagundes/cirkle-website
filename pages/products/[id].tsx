import { useMediaQuery } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Axios from "axios";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CustomButton from "../../src/components/CustomButton";
import Layout from "../../src/components/Layout";
import Padding from "../../src/components/Padding";
import Price from "../../src/components/Price";
import SelectMenu, {
  AssetType,
  SelectItem,
} from "../../src/components/SelectMenu";
import SimpleText from "../../src/components/SimpleText";
import SizedBox from "../../src/components/SizedBox";
import Title from "../../src/components/Title";
import { useCart } from "../../src/hooks/cart/useCart";
import Color from "../../src/modules/color/Color";
import Product from "../../src/modules/product/Product";
import Size from "../../src/modules/size/Size";
import theme from "../../src/theme/theme";
import { cloudinaryImage } from "../../src/utils/image";

const ProductImage = styled.div<{ image: string }>`
  position: relative;
  background-color: #fff;

  width: 100%;
  height: 456px;

  background-image: ${(props) => `url(${props.image})`};
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover;
`;

function ProductPage({
  menu,
  product,
}: {
  menu: any;
  product: Product;
}): JSX.Element {
  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));

  const [colors, setColors] = useState(null);
  const [sizes, setSizes] = useState(null);

  const [errorColor, setErrorColor] = useState("");
  const [errorSize, setErrorSize] = useState("");

  const cartContext = useCart();

  function addToCart() {
    setErrorSize("");
    setErrorColor("");

    const _product = _.cloneDeep(product);
    const color: SelectItem = _.find(colors, (o: SelectItem) => o.selected);
    const size: SelectItem = _.find(sizes, (o: SelectItem) => o.selected);

    let errors = 0;
    if (!color) {
      setErrorColor("Por favor selecione o tamanho");
      errors++;
    }
    if (!size) {
      setErrorSize("Por favor selecione a cor");
      errors++;
    }

    if (errors) {
      return;
    }

    _product.cartColor = color.text;
    _product.cartSize = size.text;
    _product.cartQty = 1;

    // console.log("addToCart -> _product", _product);

    cartContext.addToCart(_product);
  }

  function getSelectColors(items: Array<any>) {
    const finalItems: Array<SelectItem> = [];
    items.forEach((item: Color) => {
      finalItems.push({
        assetType: AssetType.COLOR,
        assetValue: item.hexColor,
        selected: false,
        text: item.name,
        value: item.id,
      });
    });

    setColors(finalItems);
  }

  function getSelectSizes(items: Array<any>) {
    const finalItems: Array<SelectItem> = [];
    items.forEach((item: Size) => {
      finalItems.push({
        assetType: AssetType.NONE,
        selected: false,
        text: item.value,
        value: item.id,
      });
    });

    setSizes(finalItems);
  }

  useEffect(() => {
    if (!colors) {
      getSelectColors(product.colors);
    }
    if (!sizes) {
      getSelectSizes(product.sizes);
    }
  }, []);

  return (
    <>
      {product && (
        <Layout menu={menu}>
          <>
            <SizedBox height={isSmartPhone ? 0 : 48}></SizedBox>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} sm={6}>
                <ProductImage
                  image={cloudinaryImage(product.image, 600)}
                ></ProductImage>
              </Grid>
              <Grid item xs={12} md={6} sm={6}>
                <Padding horizontal={isSmartPhone ? 16 : 0} vertical={0}>
                  <>
                    <Title>{product.title}</Title>
                    <SizedBox height={16}></SizedBox>
                    <SimpleText>{product.description}</SimpleText>
                    <SizedBox height={8}></SizedBox>
                    <Price
                      spaceBetween={false}
                      price={product.price}
                      priceWhenNew={product.priceWhenNew}
                    ></Price>
                    <SizedBox height={24}></SizedBox>
                    <SelectMenu
                      title="Cor"
                      placeholder="Selecione a cor"
                      items={colors}
                      setSelected={setColors}
                      width={isSmartPhone ? 343 : 250}
                      errorText={errorColor}
                    ></SelectMenu>
                    <SizedBox height={16}></SizedBox>
                    <SelectMenu
                      title="Tamanho"
                      placeholder="Selecione o tamanho"
                      items={sizes}
                      setSelected={setSizes}
                      width={isSmartPhone ? 343 : 250}
                      errorText={errorSize}
                    ></SelectMenu>
                    <SizedBox height={24}></SizedBox>
                    <CustomButton
                      onClick={addToCart}
                      width={isSmartPhone ? 343 : 250}
                      type="success"
                    >
                      Adicionar à Sacola
                    </CustomButton>
                  </>
                </Padding>
              </Grid>
            </Grid>
            <SizedBox height={48}></SizedBox>
          </>
        </Layout>
      )}
    </>
  );
}
{
  /* <p>{JSON.stringify(product, null, 2)}</p> */
}

export async function getStaticPaths(): Promise<any> {
  const productsUrl = `${process.env.API_ENDPOINT}/products?_sort=views:DESC&_limit=100`;
  const result = await Axios.get(productsUrl);
  const paths = result.data.map((item: Product) => ({
    params: { id: item.uid },
  }));

  return {
    paths,
    fallback: true,
  };
}

// d4bbe03c-7253-4a0f-ad96-abd36ac25ed7

export async function getStaticProps({
  params,
}: {
  params: any;
}): Promise<any> {
  function getMenu(url: string) {
    return Axios.get(url);
  }
  function getProduct(url: string) {
    return Axios.get(url);
  }

  const menuUrl = `${process.env.API_ENDPOINT}/menu`;
  const productUrl = `${process.env.API_ENDPOINT}/products/${params.id}`;

  const results = await Promise.all([getProduct(productUrl), getMenu(menuUrl)]);

  const product = results[0].data;
  const menu = results[1].data;

  return {
    props: {
      menu,
      product,
    },
    revalidate: 60,
  };
}

export default ProductPage;