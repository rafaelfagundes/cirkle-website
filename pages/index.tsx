import { Container, Hidden, useMediaQuery } from "@material-ui/core";
import Axios from "axios";
import _shuffle from "lodash/shuffle";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import HighlightsLoader from "../src/components/Atoms/Loaders/Highlights";
import HotProductsLoader from "../src/components/Atoms/Loaders/HotProducts";
import Padding from "../src/components/Atoms/Padding";
import SizedBox from "../src/components/Atoms/SizedBox";
import HighlightsSection from "../src/components/Organisms/HighlightsSection";
import HomeCategories from "../src/components/Organisms/HomeCategories";
import HotSection from "../src/components/Organisms/HotSection";
import HotSectionTitle from "../src/components/Organisms/HotSection/HotSectionTitle";
import PromoHeroComponent from "../src/components/Organisms/PromoHero";
import RecentlyViewed from "../src/components/Organisms/RecentlyViewed";
import Layout from "../src/components/Templates/Layout";
import { MainCategory } from "../src/enums/Categories";
import { useCart } from "../src/hooks/cart/useCart";
import { useRecentlyViewed } from "../src/hooks/recentlyViewed/useRecentlyViewed";
import { useWishlist } from "../src/hooks/wishlist/useWishlist";
import Banner from "../src/modules/banner/Banner";
import Brand from "../src/modules/brand/Brand";
import Highlight from "../src/modules/highlight/Highlight";
import Menu from "../src/modules/menu/Menu";
import Product from "../src/modules/product/Product";
import PromoHero from "../src/modules/promoHero/PromoHero";
import Shipping from "../src/modules/shipping/Shipping";
import theme from "../src/theme/theme";

const NewsletterSignUp = dynamic(
  () => import("../src/components/Organisms/NewsletterSignUp"),
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
  search: any;
}

function Home(props: HomeProps): JSX.Element {
  const cartContext = useCart();
  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));
  const wishlistContext = useWishlist();
  const recentlyViewedContext = useRecentlyViewed();

  const [hasToken, setHasToken] = useState(0);

  const { data: dataWishlist } = useSWR(hasToken > 0 ? "/wishlists" : null, {
    shouldRetryOnError: true,
    errorRetryInterval: 500,
    errorRetryCount: 10,
  });

  useEffect(() => {
    if (Axios.defaults.headers.common["Authorization"]) {
      setHasToken(1);
    } else {
      if (hasToken <= 0) {
        setTimeout(() => {
          setHasToken(hasToken - 1);
        }, 250);
      }
    }
  }, [hasToken]);

  if (dataWishlist) {
    if (!wishlistContext.wishlist) {
      setTimeout(() => wishlistContext.setWishlist(dataWishlist), 10);
    }
  }

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
      text: "Ver Tudo",
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
        url: "/produtos/vestidos?promo=true",
        image:
          "https://res.cloudinary.com/cirklebr/image/upload/v1602037021/banners/0001/ussama-azam-hlg-ltdCoI0-unsplash_nhvlc5.jpg",
      },
      {
        title: "Calçados",
        url: "/produtos/calcados?promo=true",
        image:
          "https://res.cloudinary.com/cirklebr/image/upload/v1602037157/banners/0001/apostolos-vamvouras-_pdbqMcNWus-unsplash_tfqalg.jpg",
      },
      {
        title: "Camisetas",
        url: "/produtos/camisetas?promo=true",
        image:
          "https://res.cloudinary.com/cirklebr/image/upload/v1602037252/banners/0001/saffu-wndL-yCL_dU-unsplash_dlx7fc.jpg",
      },
      {
        title: "Jaquetas",
        url: "/produtos/jaquetas?promo=true",
        image:
          "https://res.cloudinary.com/cirklebr/image/upload/v1602037269/banners/0001/asiya-kiev-eV8RI-tdf9o-unsplash_j97lcw.jpg",
      },
      {
        title: "Calças",
        url: "/produtos/calcas?promo=true",
        image:
          "https://res.cloudinary.com/cirklebr/image/upload/v1602037288/banners/0001/tamara-bellis-zDyJOj8ZXG0-unsplash_zsmsfv.jpg",
      },
      {
        title: "Saias",
        url: "/produtos/saias?promo=true",
        image:
          "https://res.cloudinary.com/cirklebr/image/upload/v1602037433/banners/0001/kelly-fournier-ooiL787Cwzc-unsplash_spzavq.jpg",
      },
    ],
  };

  // const { data: brands, error: brandsError } = useSWR("/brands", {
  //   initialData: props.brands,
  // });
  // if (brandsError) console.log("Brands loading error", brandsError);

  const { data: hotProducts, error: productsError } = useSWR(
    "/products?qty_gt=0&_sort=views:DESC&_limit=8",
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
    <Layout containerMargin={false} menu={props.menu} search={props.search}>
      <>
        <PromoHeroComponent data={promoHero}></PromoHeroComponent>
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
        <SizedBox height={32}></SizedBox>
        <Container maxWidth="md" disableGutters>
          <Padding horizontal={isSmartPhone ? 16 : 0}>
            <HotSectionTitle />
          </Padding>
          <SizedBox height={32}></SizedBox>
          {!hotProducts && <HotProductsLoader></HotProductsLoader>}
          {hotProducts && props.brands && (
            <HotSection
              products={hotProducts}
              brands={props.brands}
            ></HotSection>
          )}
        </Container>
        <SizedBox height={32}></SizedBox>
        {recentlyViewedContext?.recentlyViewed?.items?.length > 0 && (
          <RecentlyViewed
            items={recentlyViewedContext.recentlyViewed.items}
            backgroundColor="rgba(0, 0, 0, 0.05)"
          ></RecentlyViewed>
        )}
        <Hidden only={["md", "lg", "xl"]}>
          <NewsletterSignUp></NewsletterSignUp>
        </Hidden>
      </>
    </Layout>
  );
}

export async function getStaticProps(): Promise<any> {
  function getContent(url: string) {
    return Axios.get(url);
  }

  const brandsUrl = `${process.env.API_ENDPOINT}/brands`;
  const highlightsUrl = `${process.env.API_ENDPOINT}/highlights`;
  const shippingUrl = `${process.env.API_ENDPOINT}/shipping`;
  const productsUrl = `${process.env.API_ENDPOINT}/products?qty_gt=0&_sort=views:DESC&_limit=8`;
  const menuUrl = `${process.env.API_ENDPOINT}/menu`;
  const searchUrl = `${process.env.API_ENDPOINT}/isearch`;

  const results = await Promise.all([
    getContent(brandsUrl),
    getContent(highlightsUrl),
    getContent(shippingUrl),
    getContent(productsUrl),
    getContent(menuUrl),
    getContent(searchUrl),
  ]);

  const brands = results[0].data;
  const highlights = results[1].data;
  const shipping = results[2].data;
  const products = results[3].data;
  const menu = results[4].data;
  const search = results[5].data;

  const _brands = _shuffle(brands).slice(0, 6);

  return {
    props: {
      brands: _brands,
      highlights,
      shipping,
      products,
      menu,
      search,
    },
    revalidate: 60,
  };
}

export default Home;
