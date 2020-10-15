import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  useMediaQuery,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Axios from "axios";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Center from "../../src/components/Center";
import CustomButton from "../../src/components/CustomButton";
import FavoriteIcon from "../../src/components/FavoriteIcon";
import Layout from "../../src/components/Layout";
import MarkdownText from "../../src/components/MarkdownText";
import Padding from "../../src/components/Padding";
import Price from "../../src/components/Price";
import ProductCarousel from "../../src/components/ProductCarousel";
import RecentItemsCarousel from "../../src/components/RecentItemsCarousel";
import Row from "../../src/components/Row";
import SelectMenu, {
  AssetType,
  SelectItem,
} from "../../src/components/SelectMenu";
import SimpleText from "../../src/components/SimpleText";
import SizedBox from "../../src/components/SizedBox";
import Title from "../../src/components/Title";
import { useCart } from "../../src/hooks/cart/useCart";
import { useRecentlyViewed } from "../../src/hooks/recentlyViewed/useRecentlyViewed";
import { useWishlist } from "../../src/hooks/wishlist/useWishlist";
import Color from "../../src/modules/color/Color";
import Product from "../../src/modules/product/Product";
import Size from "../../src/modules/size/Size";
import theme from "../../src/theme/theme";
import { cloudinaryImage } from "../../src/utils/image";

const ProductImage = styled.div<{ image: string }>`
  position: relative;
  background-color: #fff;

  width: 100%;
  height: 425px;

  background-image: ${(props) => `url(${props.image})`};
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover;
`;

const Description = styled.div<{ isSmartphone: boolean }>`
  /* max-width: 343px; */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
`;

const RecentlyViewed = styled.div`
  padding: 16px 0 32px 0;
  /* background-color: #eee; */
  /* background-color: #e6e6e6; */
  background-color: rgba(0, 0, 0, 0.05);
`;

function ProductPage({
  menu,
  product,
}: {
  menu: any;
  product: Product;
}): JSX.Element {
  if (!product) return <></>;
  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));

  const [colors, setColors] = useState(null);
  const [sizes, setSizes] = useState(null);

  const [errorColor, setErrorColor] = useState("");
  const [errorSize, setErrorSize] = useState("");

  const [moreDetails, setMoreDetails] = useState(true);

  const cartContext = useCart();
  const wishlistContext = useWishlist();
  const recentlyViewedContext = useRecentlyViewed();

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

  function addOrRemoveFromWishlist(isIn: boolean) {
    if (isIn) {
      wishlistContext.removeFromWishlist(product.id);
    } else {
      wishlistContext.addToWishlist(product);
    }
  }

  function clearRecent() {
    recentlyViewedContext.removeAll();
  }

  useEffect(() => {
    if (!colors) {
      getSelectColors(product.colors);
    }
    if (!sizes) {
      getSelectSizes(product.sizes);
    }
  }, []);

  useEffect(() => {
    // Scroll to top when page is loaded
    if (process.browser) window.scrollTo(0, 0);
    recentlyViewedContext.addToList(product);
  });

  const isAlreadyInCart = cartContext.isItemInCart(product.id);

  function showRecentlyViewed() {
    const numItems = _.filter(
      recentlyViewedContext.recentlyViewed.items,
      (o: Product) => o.uid !== product.uid
    ).length;

    if (numItems > 0) {
      return true;
    } else {
      return false;
    }
  }

  function getRecentItems(): Array<Product> {
    return recentlyViewedContext.recentlyViewed.items;
    // return _.filter(
    //   recentlyViewedContext.recentlyViewed.items,
    //   (o: Product) => o.uid !== product.uid
    // );
  }

  function backToTop(): void {
    if (process.browser) window.scrollTo(0, 0);
  }

  return (
    <>
      {product && (
        <Layout menu={menu} containerMargin={false}>
          <>
            <Container maxWidth="md" disableGutters>
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
                      <Description isSmartphone={isSmartPhone}>
                        <SimpleText>{product.description}</SimpleText>
                      </Description>
                      <SizedBox height={8}></SizedBox>
                      <Price
                        spaceBetween={false}
                        price={product.price}
                        priceWhenNew={product.priceWhenNew}
                      ></Price>
                      <SizedBox height={17}></SizedBox>
                      <SelectMenu
                        title="Cor"
                        placeholder="Selecione a cor"
                        items={colors}
                        setSelected={setColors}
                        width={isSmartPhone ? 343 : 310}
                        errorText={errorColor}
                      ></SelectMenu>
                      <SizedBox height={16}></SizedBox>
                      <SelectMenu
                        title="Tamanho"
                        placeholder="Selecione o tamanho"
                        items={sizes}
                        setSelected={setSizes}
                        width={isSmartPhone ? 343 : 310}
                        errorText={errorSize}
                      ></SelectMenu>
                      <SizedBox height={24}></SizedBox>
                      <Row>
                        {!isAlreadyInCart && (
                          <CustomButton
                            onClick={addToCart}
                            width={isSmartPhone ? 343 : 250}
                            type="success"
                          >
                            Adicionar à Sacola
                          </CustomButton>
                        )}
                        {isAlreadyInCart && (
                          <CustomButton
                            onClick={null}
                            width={isSmartPhone ? 343 : 250}
                            type="disabled"
                          >
                            Já Está na Sacola
                          </CustomButton>
                        )}
                        <SizedBox width={16}></SizedBox>
                        <FavoriteIcon
                          active={wishlistContext.isItemInWishlist(product.id)}
                          setActive={() =>
                            addOrRemoveFromWishlist(
                              wishlistContext.isItemInWishlist(product.id)
                            )
                          }
                        ></FavoriteIcon>
                      </Row>
                    </>
                  </Padding>
                </Grid>
              </Grid>
              <SizedBox height={isSmartPhone ? 48 : 48}></SizedBox>
              {(product.infoColumn1 ||
                product.infoColumn2 ||
                product.infoColumn3) && (
                <>
                  <Accordion
                    square
                    expanded={moreDetails}
                    onChange={() => setMoreDetails(!moreDetails)}
                  >
                    <AccordionSummary
                      aria-controls="panel1d-content"
                      id="panel1d-header"
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <Title>Informações do Produto</Title>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div style={{ opacity: 0.8 }}>
                        <Grid container spacing={isSmartPhone ? 0 : 4}>
                          <>
                            {product.infoColumn1 && (
                              <Grid item xs={12} md={4} sm={4}>
                                <Padding
                                  horizontal={isSmartPhone ? 16 : 0}
                                  vertical={0}
                                >
                                  <MarkdownText>
                                    {product.infoColumn1}
                                  </MarkdownText>
                                </Padding>
                              </Grid>
                            )}
                            {product.infoColumn2 && (
                              <Grid item xs={12} md={4} sm={4}>
                                <Padding
                                  horizontal={isSmartPhone ? 16 : 0}
                                  vertical={0}
                                >
                                  <MarkdownText>
                                    {product.infoColumn2}
                                  </MarkdownText>
                                </Padding>
                              </Grid>
                            )}
                            {product.infoColumn3 && (
                              <Grid item xs={12} md={4} sm={4}>
                                <Padding
                                  horizontal={isSmartPhone ? 16 : 0}
                                  vertical={0}
                                >
                                  <MarkdownText>
                                    {product.infoColumn3}
                                  </MarkdownText>
                                </Padding>
                              </Grid>
                            )}
                          </>
                        </Grid>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                  <SizedBox height={48}></SizedBox>
                </>
              )}
              {product.relatedItems && product.relatedItems.length > 0 && (
                <>
                  <ProductCarousel
                    title="Você também pode gostar"
                    products={product.relatedItems}
                  ></ProductCarousel>
                  <SizedBox height={16}></SizedBox>
                </>
              )}
            </Container>
            {showRecentlyViewed() && (
              <>
                <SizedBox height={16}></SizedBox>
                <RecentlyViewed>
                  <Container maxWidth="md" disableGutters>
                    <Row spaceBetween>
                      <Padding horizontal={isSmartPhone ? 16 : 0}>
                        <Title>Vistos recentemente</Title>
                      </Padding>
                      <CustomButton
                        onClick={clearRecent}
                        variant="text"
                        type="delete"
                        width={isSmartPhone ? 125 : 103}
                        noPadding
                      >
                        Limpar Lista
                      </CustomButton>
                    </Row>
                    <SizedBox height={4}></SizedBox>
                    <RecentItemsCarousel
                      products={getRecentItems()}
                    ></RecentItemsCarousel>
                  </Container>
                </RecentlyViewed>
              </>
            )}
            <SizedBox height={32}></SizedBox>
            <Center>
              <CustomButton
                onClick={backToTop}
                width={200}
                variant="outlined"
                icon="chevron-up"
              >
                Voltar ao Topo
              </CustomButton>
            </Center>
            <SizedBox height={32}></SizedBox>
          </>
        </Layout>
      )}
    </>
  );
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
