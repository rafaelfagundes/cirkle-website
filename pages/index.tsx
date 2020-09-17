import { Hidden } from "@material-ui/core";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import useSWR from "swr";
import initialData from "../src/cache/prepopulated.json";
import HighlightsSection from "../src/components/HighlightsSection";
import HomeCategories from "../src/components/HomeCategories";
// import HotSection from "../src/components/HotSection";
import HighlightsLoader from "../src/components/Loaders/Highlights";
import MainBannerLoader from "../src/components/Loaders/MainBanner";
import MainBanner from "../src/components/MainBanner";
// import NewsletterSignUp from "../src/components/NewsletterSignUp";
import SearchBar from "../src/components/SearchBar";
import SizedBox from "../src/components/SizedBox";
import TopTextBanner from "../src/components/TopTextBanner";
import Colors from "../src/enums/Colors";
import { useCart } from "../src/hooks/use-cart";

const HotSection = dynamic(() => import("../src/components/HotSection/"), {
  ssr: false,
});

const NewsletterSignUp = dynamic(
  () => import("../src/components/NewsletterSignUp/"),
  {
    ssr: false,
  }
);

function Home(): JSX.Element {
  const cartContext = useCart();

  const { data: banner, error: bannerError } = useSWR("/api/banner", {
    initialData: initialData.banner,
  });
  if (bannerError) console.log("Banner loading error", bannerError);

  const { data: brands, error: brandsError } = useSWR("/api/brands");
  if (brandsError) console.log("Brands loading error", brandsError);

  const { data: hotProducts, error: productsError } = useSWR(
    "/api/hot-products"
  );
  if (productsError) console.log("Brands loading error", productsError);

  const { data: shipping, error: shippingError } = useSWR("/api/shipping", {
    initialData: initialData.shipping,
  });
  if (shippingError) console.log("Shipping loading error", shippingError);

  const { data: highlights, error: highlightsError } = useSWR(
    "/api/highlights",
    {
      initialData: initialData.highlights,
    }
  );
  if (highlightsError) console.log("Highlights loading error", highlightsError);

  useEffect(() => {
    if (shipping) {
      const freeShipping = shipping.freeShipping.enabled;
      const freeShippingValue = shipping.freeShipping.value;

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
        <SearchBar placeHolder="Procure marcas, categorias, modelos"></SearchBar>
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

export default Home;
