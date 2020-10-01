import { Hidden } from "@material-ui/core";
import Axios from "axios";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import useSWR from "swr";
import HighlightsSection from "../src/components/HighlightsSection";
import HomeCategories from "../src/components/HomeCategories";
import HotSectionTitle from "../src/components/HotSection/HotSectionTitle";
import HighlightsLoader from "../src/components/Loaders/Highlights";
import HotProductsLoader from "../src/components/Loaders/HotProducts";
import MainBannerLoader from "../src/components/Loaders/MainBanner";
import MainBanner from "../src/components/MainBanner";
import SearchBar from "../src/components/SearchBar";
import SizedBox from "../src/components/SizedBox";
import TopTextBanner from "../src/components/TopTextBanner";
import Colors from "../src/enums/Colors";
import { useCart } from "../src/hooks/cart/useCart";
import Banner from "../src/modules/banner/Banner";
import Brand from "../src/modules/brand/Brand";
import Highlight from "../src/modules/highlight/Highlight";
import Product from "../src/modules/product/Product";
import Shipping from "../src/modules/shipping/Shipping";

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
}

function Home(props: HomeProps): JSX.Element {
  const cartContext = useCart();

  const { data: banner, error: bannerError } = useSWR("/banner", {
    initialData: props.banner,
  });

  if (bannerError) console.log("Banner loading error", bannerError);

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
    <>
      <Hidden mdUp={true}>
        <SearchBar placeHolder="Procure marcas, modelos e mais"></SearchBar>
      </Hidden>
      {!cartContext.cart.freeShipping && <SizedBox height={48}></SizedBox>}
      {cartContext.cart.freeShipping && (
        <TopTextBanner color={Colors.TRANSPARENT} textColor={Colors.SECONDARY}>
          {`Frete grátis para pedidos acima de ${new Intl.NumberFormat(
            "pt-BR",
            {
              style: "currency",
              currency: "BRL",
            }
          ).format(cartContext.cart.freeShippingValue)}`}
        </TopTextBanner>
      )}
      {!banner && <MainBannerLoader></MainBannerLoader>}
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
      )}

      <Hidden smUp={true}>
        <SizedBox height={16}></SizedBox>
        <HomeCategories></HomeCategories>
      </Hidden>
      <SizedBox height={16}></SizedBox>
      <Hidden only={["xs", "sm"]}>
        <SizedBox height={32}></SizedBox>
      </Hidden>
      {!highlights && <HighlightsLoader></HighlightsLoader>}
      {highlights && <HighlightsSection data={highlights}></HighlightsSection>}
      <SizedBox height={18}></SizedBox>
      <HotSectionTitle></HotSectionTitle>
      <SizedBox height={16}></SizedBox>
      {!hotProducts && <HotProductsLoader></HotProductsLoader>}
      {hotProducts && brands && (
        <HotSection products={hotProducts} brands={brands}></HotSection>
      )}
      <Hidden only={["md", "lg", "xl"]}>
        <NewsletterSignUp></NewsletterSignUp>
      </Hidden>
      <Hidden only={["xs", "sm"]}>
        <SizedBox height={16}></SizedBox>
      </Hidden>
    </>
  );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getStaticProps(): Promise<any> {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const bannerUrl = `${process.env.API_ENDPOINT}/banner`;
  const bannerResult = await Axios.get(bannerUrl);
  const banner = bannerResult.data;

  const brandsUrl = `${process.env.API_ENDPOINT}/brands`;
  const brandsResult = await Axios.get(brandsUrl);
  const brands = brandsResult.data;

  const highlightsUrl = `${process.env.API_ENDPOINT}/highlights`;
  const highlightsResult = await Axios.get(highlightsUrl);
  const highlights = highlightsResult.data;

  const shippingUrl = `${process.env.API_ENDPOINT}/shipping`;
  const shippingResult = await Axios.get(shippingUrl);
  const shipping = shippingResult.data;

  const productsUrl = `${process.env.API_ENDPOINT}/products?_sort=views:DESC&_limit=8`;
  const productsResult = await Axios.get(productsUrl);
  const products = productsResult.data;

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      banner,
      brands,
      highlights,
      shipping,
      products,
    },
    revalidate: 60,
  };
}

export default Home;
