import { Hidden } from "@material-ui/core";
import React, { useEffect } from "react";
import useSWR from "swr";
import HighlightsSection from "../src/components/HighlightsSection";
import HomeCategories from "../src/components/HomeCategories";
import HotSection from "../src/components/HotSection/index";
import HighlightsLoader from "../src/components/Loaders/Highlights";
import MainBannerLoader from "../src/components/Loaders/MainBanner";
import MainBanner from "../src/components/MainBanner/index";
import NewsletterSignUp from "../src/components/NewsletterSignUp";
import SearchBar from "../src/components/SearchBar/index";
import SizedBox from "../src/components/SizedBox/index";
import TopTextBanner from "../src/components/TopTextBanner";
import Colors from "../src/enums/Colors";
import { useCart } from "../src/hooks/use-cart";

function Home(): JSX.Element {
  const cartContext = useCart();

  const { data: banner, error: bannerError } = useSWR("/api/banner", {
    refreshInterval: 60000,
  });
  if (bannerError) console.log("Banner loading error", bannerError);

  const { data: brands, error: brandsError } = useSWR("/api/brands", {
    refreshInterval: 60000,
  });
  if (brandsError) console.log("Brands loading error", brandsError);

  const { data: hotProducts, error: productsError } = useSWR(
    "/api/hot-products",
    {
      refreshInterval: 60000,
    }
  );
  if (productsError) console.log("Brands loading error", productsError);

  const { data: shipping, error: shippingError } = useSWR("/api/shipping", {
    refreshInterval: 25000,
  });
  if (shippingError) console.log("Shipping loading error", shippingError);

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

  const { data: highlights, error: highlightsError } = useSWR(
    "/api/highlights",
    {
      refreshInterval: 25000,
    }
  );
  if (highlightsError) console.log("Highlights loading error", highlightsError);

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
