import Axios from "axios";
import React from "react";
import styled from "styled-components";
import CustomButton from "../../src/components/CustomButton";
import Layout from "../../src/components/Layout";
import Padding from "../../src/components/Padding";
import Price from "../../src/components/Price";
import SimpleText from "../../src/components/SimpleText";
import SizedBox from "../../src/components/SizedBox";
import Title from "../../src/components/Title";
import Product from "../../src/modules/product/Product";
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
  return (
    <>
      {product && (
        <Layout menu={menu}>
          <>
            <ProductImage
              image={cloudinaryImage(product.image, 375)}
            ></ProductImage>
            <Padding horizontal={16} vertical={16}>
              <>
                <Title>{product.title}</Title>
                <SizedBox height={16}></SizedBox>
                <SimpleText>{product.description}</SimpleText>
                <SizedBox height={8}></SizedBox>
                <Price
                  price={product.price}
                  priceWhenNew={product.priceWhenNew}
                ></Price>
                <SizedBox height={24}></SizedBox>
                <CustomButton onClick={() => null} width={343} type="success">
                  Adicionar à Sacola
                </CustomButton>
              </>
            </Padding>
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
