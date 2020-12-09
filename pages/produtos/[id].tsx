import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  useMediaQuery,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Axios from "axios";
import _cloneDeep from "lodash/cloneDeep";
import _filter from "lodash/filter";
import _find from "lodash/find";
import React, { useEffect, useState } from "react";
import ReactImageMagnify from "react-image-magnify";
import styled from "styled-components";
import useSWR from "swr";
import Card from "../../src/components/Atoms/Card";
import Center from "../../src/components/Atoms/Center";
import CustomButton from "../../src/components/Atoms/CustomButton";
import FavoriteIcon from "../../src/components/Atoms/FavoriteIcon";
import Icon from "../../src/components/Atoms/Icon";
import ImageSelector from "../../src/components/Atoms/ImageSelector";
import MarkdownText from "../../src/components/Atoms/MarkdownText";
import Padding from "../../src/components/Atoms/Padding";
import Price from "../../src/components/Atoms/Price";
import Row from "../../src/components/Atoms/Row";
import SelectMenu, {
  AssetType,
  SelectItem,
} from "../../src/components/Atoms/SelectMenu";
import SimpleText from "../../src/components/Atoms/SimpleText";
import SizedBox from "../../src/components/Atoms/SizedBox";
import Subtitle from "../../src/components/Atoms/Subtitle";
import Title from "../../src/components/Atoms/Title";
import Breadcrumbs from "../../src/components/Molecules/Breadcrumbs";
import SocialShare from "../../src/components/Molecules/SocialShare";
import ProductCarousel from "../../src/components/Organisms/ProductCarousel";
import RecentlyViewed from "../../src/components/Organisms/RecentlyViewed";
import Layout from "../../src/components/Templates/Layout";
import MetaData, {
  MetaDataType,
} from "../../src/components/Templates/MetaData";
import Colors from "../../src/enums/Colors";
import { useAuth } from "../../src/hooks/auth/useAuth";
import { useCart } from "../../src/hooks/cart/useCart";
import { useRecentlyViewed } from "../../src/hooks/recentlyViewed/useRecentlyViewed";
import { useWishlist } from "../../src/hooks/wishlist/useWishlist";
import Color from "../../src/modules/color/Color";
import Product from "../../src/modules/product/Product";
import Size from "../../src/modules/size/Size";
import theme from "../../src/theme/theme";
import { cloudinaryImage, cloudinaryProductImage } from "../../src/utils/image";

const IMAGE_SIZE = 470;

const useStyles = makeStyles({
  root: {
    width: "100%",
    borderRadius: "4px",
    overflow: "hidden",
    border: "none",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  expanded: {
    "&$expanded": {
      margin: "0px 0",
    },
  },
});

const Description = styled.div<{ isSmartphone: boolean }>`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
`;

const BrandImage = styled.img`
  width: 64px;
`;

const BrandName = styled.div`
  font-family: Commissioner, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: ${Colors.SECONDARY};
`;

const ImagesHolder = styled.div`
  display: flex;
  flex-direction: row;
`;

function ProductPage({
  menu,
  initialDataProduct,
}: {
  menu: any;
  initialDataProduct: Product;
}): JSX.Element {
  if (!initialDataProduct) return <></>;

  const { data: product, error: productError } = useSWR(
    "/products/" + initialDataProduct.uid,
    {
      initialData: initialDataProduct,
    }
  );
  if (productError) console.log("Product loading error", productError);

  const currentUrl = `https://www.cirkle.com.br/produtos/${product.uid}`;

  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));

  const [colors, setColors] = useState(null);
  const [sizes, setSizes] = useState(null);

  const [errorColor, setErrorColor] = useState("");
  const [errorSize, setErrorSize] = useState("");

  const [moreDetails, setMoreDetails] = useState(true);

  const [imageUrl, setImageUrl] = useState(product.image ? product.image : "");

  const cartContext = useCart();
  const wishlistContext = useWishlist();
  const recentlyViewedContext = useRecentlyViewed();

  const authContext = useAuth();

  const classes = useStyles();

  function addToCart() {
    setErrorSize("");
    setErrorColor("");

    const _product = _cloneDeep(product);
    const color: SelectItem = _find(colors, (o: SelectItem) => o.selected);
    const size: SelectItem = _find(sizes, (o: SelectItem) => o.selected);

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
    cartContext?.addToCart(_product);
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

  useEffect(() => {
    recentlyViewedContext.addToList(product);
  });

  useEffect(() => {
    // Scroll to top when page is loaded
    if (process.browser) window.scrollTo(0, 0);

    setImageUrl(product.image ? product.image : "");

    if (!colors) {
      getSelectColors(product.colors);
    }
    if (!sizes) {
      getSelectSizes(product.sizes);
    }
  }, [product]);

  let isAlreadyInCart = false;
  if (cartContext.hasOwnProperty("isItemInCart")) {
    isAlreadyInCart = cartContext?.isItemInCart(product.id);
  }

  function showRecentlyViewed() {
    const numItems = _filter(
      recentlyViewedContext?.recentlyViewed?.items,
      (o: Product) => o.uid !== product.uid
    ).length;

    if (numItems > 0) {
      return true;
    } else {
      return false;
    }
  }

  function getRecentItems(): Array<Product> {
    return _filter(
      recentlyViewedContext?.recentlyViewed?.items,
      (o: Product) => o.uid !== product.uid
    );
  }

  function backToTop(): void {
    if (process.browser) window.scrollTo(0, 0);
  }

  function getHint(text: string): JSX.Element {
    return (
      <span
        style={{
          marginTop: -52,
          position: "absolute",
          width: "100%",
          opacity: 0.9,
          transition: "1000ms opacity",
        }}
      >
        <Card shadow={false}>
          <Row>
            <Icon type="zoom-in" size={20}></Icon>
            <SizedBox width={8}></SizedBox>
            <SimpleText>{text}</SimpleText>
          </Row>
        </Card>
      </span>
    );
  }

  return (
    <>
      <MetaData
        description={product.description}
        image={product.image}
        title={`${product.title} - ${product.brand.name}`}
        hashtag="#cirkle #modacircular #sustentabilidade"
        quote="Confira mais em nossa loja :)"
        url={`https://www.cirkle.com.br/produtos/${product.uid}`}
        type={MetaDataType.PRODUCT}
        moreImages={product.moreImages}
        price={product.price}
      ></MetaData>
      {product && (
        <Layout menu={menu} containerMargin={false}>
          <span style={{ userSelect: "none" }}>
            <Container maxWidth="md" disableGutters>
              <SizedBox height={isSmartPhone ? 0 : 16}></SizedBox>
              {!isSmartPhone && (
                <>
                  <Breadcrumbs
                    showHome
                    root={product.subCategory.category.rootCategory}
                    category={product.subCategory.category}
                    subCategory={product.subCategory}
                    product={product}
                  ></Breadcrumbs>
                  <SizedBox height={16}></SizedBox>
                </>
              )}
              <Grid container spacing={3}>
                <Grid
                  item
                  xs={12}
                  md={product.relatedItems.length > 0 ? 8 : 6}
                  sm={product.relatedItems.length > 0 ? 8 : 6}
                >
                  <ImagesHolder>
                    {product.moreImages.length > 0 && !isSmartPhone && (
                      <ImageSelector
                        images={[
                          { title: product.title, url: product.image },
                          ...product.moreImages,
                        ]}
                        activeImage={imageUrl}
                        setActive={setImageUrl}
                      ></ImageSelector>
                    )}
                    <div>
                      <ReactImageMagnify
                        {...{
                          enlargedImageContainerStyle: {
                            cursor: "zoom-in",
                          },
                          style: {
                            cursor: "zoom-in",
                            borderRadius: 4,
                            overflow: "hidden",
                          },
                          smallImage: {
                            alt: product.title,
                            isFluidWidth: true,
                            src: cloudinaryProductImage(imageUrl, IMAGE_SIZE),
                          },
                          largeImage: {
                            src: cloudinaryProductImage(imageUrl, IMAGE_SIZE),
                            height: 2 * IMAGE_SIZE * 1.15,
                            width: 2 * IMAGE_SIZE,
                          },
                          enlargedImagePosition: "over",
                          isHintEnabled: true,
                          hintComponent: () =>
                            getHint(
                              isSmartPhone
                                ? "Toque e segure para ativar o zoom"
                                : "Passe o mouse para ativar o zoom"
                            ),
                        }}
                      />

                      {product.moreImages.length > 0 && isSmartPhone && (
                        <ImageSelector
                          horizontal
                          images={[
                            { title: product.title, url: product.image },
                            ...product.moreImages,
                          ]}
                          activeImage={imageUrl}
                          setActive={setImageUrl}
                        ></ImageSelector>
                      )}
                    </div>
                  </ImagesHolder>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={product.relatedItems.length > 0 ? 4 : 6}
                  sm={product.relatedItems.length > 0 ? 4 : 6}
                >
                  <Padding horizontal={isSmartPhone ? 16 : 0} vertical={0}>
                    <span style={{ userSelect: "none" }}>
                      {!isSmartPhone && (
                        <>
                          <BrandImage
                            src={cloudinaryImage(product.brand.image, 64)}
                          ></BrandImage>
                          <SizedBox height={16}></SizedBox>
                          <Title>{product.title}</Title>
                          <SizedBox height={4}></SizedBox>
                          <BrandName>{product.brand.name}</BrandName>
                        </>
                      )}
                      {isSmartPhone && (
                        <>
                          <Row spaceBetween>
                            <div>
                              <Title>{product.title}</Title>
                              <SizedBox height={4}></SizedBox>
                              <BrandName>{product.brand.name}</BrandName>
                            </div>
                            <BrandImage
                              src={cloudinaryImage(product.brand.image, 64)}
                            ></BrandImage>
                          </Row>
                        </>
                      )}
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
                            width={250}
                            type="success"
                          >
                            Adicionar à Sacola
                          </CustomButton>
                        )}
                        {isAlreadyInCart && (
                          <CustomButton
                            onClick={null}
                            width={250}
                            type="disabled"
                          >
                            Já Está na Sacola
                          </CustomButton>
                        )}
                        {authContext.user && (
                          <>
                            <SizedBox width={16}></SizedBox>
                            <FavoriteIcon
                              shadow={false}
                              active={wishlistContext.isItemInWishlist(
                                product.id
                              )}
                              setActive={() =>
                                addOrRemoveFromWishlist(
                                  wishlistContext.isItemInWishlist(product.id)
                                )
                              }
                            ></FavoriteIcon>
                          </>
                        )}
                      </Row>
                      <SizedBox height={32}></SizedBox>
                      <Subtitle size={16} bold>
                        Compartilhar
                      </Subtitle>
                      <SizedBox height={8}></SizedBox>
                      <SocialShare
                        url={currentUrl}
                        buttonSize={isSmartPhone ? 44 : 36}
                      ></SocialShare>
                    </span>
                  </Padding>
                </Grid>
              </Grid>

              <SizedBox height={isSmartPhone ? 32 : 48}></SizedBox>

              {(product.infoColumn1 ||
                product.infoColumn2 ||
                product.infoColumn3) && (
                <>
                  <Accordion
                    square
                    expanded={moreDetails}
                    onChange={() => setMoreDetails(!moreDetails)}
                    classes={{ expanded: classes.expanded, root: classes.root }}
                    elevation={0}
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
                <SizedBox height={isSmartPhone ? 0 : 16}></SizedBox>
                <RecentlyViewed
                  items={getRecentItems()}
                  backgroundColor="rgba(0, 0, 0, 0.05)"
                ></RecentlyViewed>
              </>
            )}
            <SizedBox height={32}></SizedBox>
            <Center>
              <CustomButton
                onClick={backToTop}
                width={200}
                variant="text"
                icon="chevron-up"
              >
                Voltar ao Topo
              </CustomButton>
            </Center>
            <SizedBox height={32}></SizedBox>
          </span>
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
      initialDataProduct: product,
    },
    revalidate: 60,
  };
}

export default ProductPage;
