import { Container, Hidden, useMediaQuery } from "@material-ui/core";
import Axios from "axios";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import useSWR from "swr";
import HighlightsSection from "../src/components/HighlightsSection";
import HomeCategories from "../src/components/HomeCategories";
import HotSectionTitle from "../src/components/HotSection/HotSectionTitle";
import Layout from "../src/components/Layout";
import HighlightsLoader from "../src/components/Loaders/Highlights";
import HotProductsLoader from "../src/components/Loaders/HotProducts";
import Padding from "../src/components/Padding";
import PromoHeroComponent from "../src/components/PromoHero";
import SizedBox from "../src/components/SizedBox";
import { MainCategory } from "../src/enums/Categories";
import { useCart } from "../src/hooks/cart/useCart";
import Banner from "../src/modules/banner/Banner";
import Brand from "../src/modules/brand/Brand";
import Highlight from "../src/modules/highlight/Highlight";
import Menu from "../src/modules/menu/Menu";
import Product from "../src/modules/product/Product";
import PromoHero from "../src/modules/promoHero/PromoHero";
import Shipping from "../src/modules/shipping/Shipping";
import theme from "../src/theme/theme";

const HotSection = dynamic(() => import("../src/components/HotSection/"), {
  ssr: false,
});

const NewsletterSignUp = dynamic(
  () => import("../src/components/NewsletterSignUp/"),
  {
    ssr: false,
  }
);

interface HomeProps {
  banner: Banner;
  brands: Array<Brand>;
  highlights: Array<Highlight>;
  shipping: Shipping;
  products: Array<Product>;
  menu: Menu;
}

function Home(props: HomeProps): JSX.Element {
  const cartContext = useCart();
  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));

  const promoHero: PromoHero = {
    backgroundImage:
      "https://res.cloudinary.com/cirklebr/image/upload/v1602036685/banners/0001/lauren-fleischmann-R2aodqJn3b8-unsplash_mkndpo.jpg",
    category: MainCategory.WOMEN,
    colorTint: "#6DC0FF",
    textPromoBanner: {
      backgroundColor: "#6DC0FF",
      text: "Frete grátis para pedidos acima de R$599",
      textColor: "#561643",
    },
    cta: {
      backgroundColor: "#fff",
      text: "ver tudo",
      textColor: "#561643",
      url: "/promo/women",
    },
    firstLineText: {
      backgroundColor: "#0082E5",
      text: "Semana de grandes descontos",
      textColor: "#fff",
    },
    secondLineText: {
      backgroundColor: "#0082E5",
      text: "Até 70% off",
      textColor: "#fff",
    },
    tiles: [
      {
        title: "Vestidos",
        url: "/products/vestidos?promo=true",
        image:
          "https://res.cloudinary.com/cirklebr/image/upload/v1602037021/banners/0001/ussama-azam-hlg-ltdCoI0-unsplash_nhvlc5.jpg",
      },
      {
        title: "Calçados",
        url: "/products/calcados?promo=true",
        image:
          "https://res.cloudinary.com/cirklebr/image/upload/v1602037157/banners/0001/apostolos-vamvouras-_pdbqMcNWus-unsplash_tfqalg.jpg",
      },
      {
        title: "Camisetas",
        url: "/products/camisetas?promo=true",
        image:
          "https://res.cloudinary.com/cirklebr/image/upload/v1602037252/banners/0001/saffu-wndL-yCL_dU-unsplash_dlx7fc.jpg",
      },
      {
        title: "Jaquetas",
        url: "/products/jaquetas?promo=true",
        image:
          "https://res.cloudinary.com/cirklebr/image/upload/v1602037269/banners/0001/asiya-kiev-eV8RI-tdf9o-unsplash_j97lcw.jpg",
      },
      {
        title: "Calças",
        url: "/products/calcas?promo=true",
        image:
          "https://res.cloudinary.com/cirklebr/image/upload/v1602037288/banners/0001/tamara-bellis-zDyJOj8ZXG0-unsplash_zsmsfv.jpg",
      },
      {
        title: "Saias",
        url: "/products/saias?promo=true",
        image:
          "https://res.cloudinary.com/cirklebr/image/upload/v1602037433/banners/0001/kelly-fournier-ooiL787Cwzc-unsplash_spzavq.jpg",
      },
    ],
  };

  // const { data: banner, error: bannerError } = useSWR("/banner", {
  //   initialData: props.banner,
  // });

  // if (bannerError) console.log("Banner loading error", bannerError);

  const { data: brands, error: brandsError } = useSWR("/brands", {
    initialData: props.brands,
  });
  if (brandsError) console.log("Brands loading error", brandsError);

  const { data: hotProducts, error: productsError } = useSWR(
    "/products?_sort=views:DESC&_limit=8",
    {
      initialData: props.products,
    }
  );
  if (productsError) console.log("Products loading error", productsError);

  const { data: shipping, error: shippingError } = useSWR("/shipping", {
    initialData: props.shipping,
  });
  if (shippingError) console.log("Shipping loading error", shippingError);

  const { data: highlights, error: highlightsError } = useSWR("/highlights", {
    initialData: props.highlights,
  });
  if (highlightsError) console.log("Highlights loading error", highlightsError);

  useEffect(() => {
    if (shipping) {
      const freeShipping = shipping.freeShipping;
      const freeShippingValue = shipping.freeShippingValue;

      // Free Shipping
      if (freeShipping && freeShippingValue) {
        cartContext.updateFreeShipping(freeShipping, freeShippingValue);
      } else {
        cartContext.updateFreeShipping(false, 0);
      }
    }
  }, [shipping]);

  return (
    <Layout containerMargin={false} menu={props.menu}>
      <>
        {/* <Hidden mdUp={true}>
          <SearchBar placeHolder="Procure marcas, modelos e mais"></SearchBar>
        </Hidden> */}

        <PromoHeroComponent data={promoHero}></PromoHeroComponent>

        {/* {!cartContext.cart.freeShipping && <SizedBox height={48}></SizedBox>}
        {cartContext.cart.freeShipping && (
          <TopTextBanner
            color={Colors.TRANSPARENT}
            textColor={Colors.SECONDARY}
          >
            {`Frete grátis para pedidos acima de ${new Intl.NumberFormat(
              "pt-BR",
              {
                style: "currency",
                currency: "BRL",
              }
            ).format(cartContext.cart.freeShippingValue)}`}
          </TopTextBanner>
        )}
         */}

        {/* {!banner && <MainBannerLoader></MainBannerLoader>}
        {banner && (
          <MainBanner
            url={banner.url}
            primaryText={banner.primaryText}
            secondaryText={banner.secondaryText}
            position={banner.position}
            primaryTextColor={banner.primaryTextColor}
            primaryBackgroundColor={banner.primaryBackgroundColor}
            secondaryTextColor={banner.secondaryTextColor}
            secondaryBackgroundColor={banner.secondaryBackgroundColor}
          ></MainBanner>
        )} */}

        <Hidden smUp={true}>
          <SizedBox height={16}></SizedBox>
          <HomeCategories></HomeCategories>
        </Hidden>
        <SizedBox height={16}></SizedBox>
        <Hidden only={["xs", "sm"]}>
          <SizedBox height={32}></SizedBox>
        </Hidden>
        {!highlights && <HighlightsLoader></HighlightsLoader>}
        {highlights && (
          <HighlightsSection data={highlights}></HighlightsSection>
        )}

        <SizedBox height={18}></SizedBox>
        <Container maxWidth="md" disableGutters>
          <Padding horizontal={isSmartPhone ? 20 : 0}>
            <HotSectionTitle></HotSectionTitle>
          </Padding>
          <SizedBox height={16}></SizedBox>
          {!hotProducts && <HotProductsLoader></HotProductsLoader>}
          {hotProducts && brands && (
            <HotSection products={hotProducts} brands={brands}></HotSection>
          )}
        </Container>
        <Hidden only={["md", "lg", "xl"]}>
          <NewsletterSignUp></NewsletterSignUp>
        </Hidden>
        <Hidden only={["xs", "sm"]}>
          <SizedBox height={16}></SizedBox>
        </Hidden>
      </>
    </Layout>
  );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getStaticProps(): Promise<any> {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library

  // const bannerUrl = `${process.env.API_ENDPOINT}/banner`;
  // const bannerResult = await Axios.get(bannerUrl);
  // const banner = bannerResult.data;

  function getBrands(url: string) {
    return Axios.get(url);
  }
  function getHighlights(url: string) {
    return Axios.get(url);
  }
  function getShipping(url: string) {
    return Axios.get(url);
  }
  function getProducts(url: string) {
    return Axios.get(url);
  }
  function getMenu(url: string) {
    return Axios.get(url);
  }

  const brandsUrl = `${process.env.API_ENDPOINT}/brands`;
  const highlightsUrl = `${process.env.API_ENDPOINT}/highlights`;
  const shippingUrl = `${process.env.API_ENDPOINT}/shipping`;
  const productsUrl = `${process.env.API_ENDPOINT}/products?_sort=views:DESC&_limit=8`;
  const menuUrl = `${process.env.API_ENDPOINT}/menu`;

  const results = await Promise.all([
    getBrands(brandsUrl),
    getHighlights(highlightsUrl),
    getShipping(shippingUrl),
    getProducts(productsUrl),
    getMenu(menuUrl),
  ]);

  const brands = results[0].data;
  const highlights = results[1].data;
  const shipping = results[2].data;
  const products = results[3].data;
  const menu = results[4].data;

  return {
    props: {
      brands,
      highlights,
      shipping,
      products,
      menu,
    },
    revalidate: 60,
  };
}

export default Home;
