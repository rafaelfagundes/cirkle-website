import { Hidden } from "@material-ui/core";
import React, { useEffect, useState } from "react";
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
import firebase from "../src/config/firebase";
import { useCart } from "../src/hooks/use-cart";
import { Colors } from "../src/theme/theme";

function Home(): JSX.Element {
  const hotProducts = [
    {
      id: "323d1e6f-1999-4e6e-ad47-e75a675c470a",
      image:
        "https://res.cloudinary.com/cirklebr/image/upload/c_fit,w_600/v1598522500/products/photo-1502716119720-b23a93e5fe1b_gjurjv.jpg",
      brandName: "Prada",
      title: "Vestido de Bolinhas Brancas - Vários Tamanhos",
      price: 2879.99,
      oldPrice: 3599.99,
      link: "/product/a909cb6c-630d-4dfa-a26d-5c85122de4a2",
    },
    {
      id: "520b83d9-dac9-47ce-9456-990fb4bf703c",
      image:
        "https://res.cloudinary.com/cirklebr/image/upload/c_fit,w_600/v1598522519/products/photo-1535043934128-cf0b28d52f95_tmxiwy.jpg",
      brandName: "Chanel",
      title: "Sapato Chanel No. 37",
      price: 499.99,
      oldPrice: 799.99,
      link: "/product/a909cb6c-630d-4dfa-a26d-5c85122de4a2",
    },
    {
      id: "db71af90-20b2-48f7-b4b9-be4128367952",
      image:
        "https://res.cloudinary.com/cirklebr/image/upload/c_fit,w_600/v1598522529/products/photo-1529025530948-67e8a5c69b58_dgeib0.jpg",
      brandName: "Louis Vuitton",
      title: "Bolsa LV Paris",
      price: 1599.99,
      oldPrice: 2099.99,
      link: "/product/a909cb6c-630d-4dfa-a26d-5c85122de4a2",
    },
    {
      id: "1fe7fed8-702d-483a-8b58-1e94a22f701d",
      image:
        "https://res.cloudinary.com/cirklebr/image/upload/c_fit,w_600/v1598522536/products/photo-1590736969955-71cc94801759_aury70.jpg",
      brandName: "Michael Kors",
      title: "Relógio Mod. MK450",
      price: 799.99,
      oldPrice: 1799.99,
      link: "/product/a909cb6c-630d-4dfa-a26d-5c85122de4a2",
    },
    {
      id: "d94dc774-fe8f-4cfd-90c2-949d16b1fade",
      image:
        "https://res.cloudinary.com/cirklebr/image/upload/c_fit,w_600/v1598522500/products/photo-1502716119720-b23a93e5fe1b_gjurjv.jpg",
      brandName: "Prada",
      title: "Vestido de Bolinhas Brancas - Vários Tamanhos",
      price: 2879.99,
      oldPrice: 3599.99,
      link: "/product/a909cb6c-630d-4dfa-a26d-5c85122de4a2",
    },
    {
      id: "46675848-4802-4422-b48e-0bc6ba463a55",
      image:
        "https://res.cloudinary.com/cirklebr/image/upload/c_fit,w_600/v1598522519/products/photo-1535043934128-cf0b28d52f95_tmxiwy.jpg",
      brandName: "Chanel",
      title: "Sapato Chanel No. 37",
      price: 499.99,
      oldPrice: 799.99,
      link: "/product/a909cb6c-630d-4dfa-a26d-5c85122de4a2",
    },
    {
      id: "93f60b67-282c-4cc7-b7dc-7f89e82d1777",
      image:
        "https://res.cloudinary.com/cirklebr/image/upload/c_fit,w_600/v1598522529/products/photo-1529025530948-67e8a5c69b58_dgeib0.jpg",
      brandName: "Louis Vuitton",
      title: "Bolsa LV Paris",
      price: 1599.99,
      oldPrice: 2099.99,
      link: "/product/a909cb6c-630d-4dfa-a26d-5c85122de4a2",
    },
    {
      id: "304921ea-5672-4d38-a4e5-dbdaeba736a8",
      image:
        "https://res.cloudinary.com/cirklebr/image/upload/c_fit,w_600/v1598522536/products/photo-1590736969955-71cc94801759_aury70.jpg",
      brandName: "Michael Kors",
      title: "Relógio Mod. MK450",
      price: 799.99,
      oldPrice: 1799.99,
      link: "/product/a909cb6c-630d-4dfa-a26d-5c85122de4a2",
    },
  ];

  const brands = [
    {
      id: "39dbf21f-e9d9-4c52-99d1-730ffba49a24",
      name: "Armani",
      image: "/images/brands/armani.png",
      link: "/brands/armani",
    },
    {
      id: "9ca7318e-6fcd-4eed-bb5e-2623c7d7b2f1",
      name: "Chanel",
      image: "/images/brands/chanel.png",
      link: "/brands/chanel",
    },
    {
      id: "f442a582-7803-47ff-af17-c05497926f84",
      name: "Dolce & Gabbanna",
      image: "/images/brands/deg.png",
      link: "/brands/deg",
    },
    {
      id: "207f004d-5190-4a3e-9a79-0ba424c2c32c",
      name: "Dior",
      image: "/images/brands/dior.png",
      link: "/brands/dior",
    },
    {
      id: "7b934def-5c05-495d-9d61-b6f30631dec2",
      name: "Prada",
      image: "/images/brands/prada.png",
      link: "/brands/prada",
    },
    {
      id: "6e64ae7a-9c9f-4cd9-ab02-07ccd9adcd19",
      name: "Versace",
      image: "/images/brands/versace.png",
      link: "/brands/versace",
    },
  ];

  const mainBanner = localStorage.getItem("mainBanner");
  const [banner, setBanner] = useState(
    mainBanner ? JSON.parse(mainBanner) : null
  );

  const initialHighlights = localStorage.getItem("highlights");
  const [highlights, setHighlights] = useState(
    initialHighlights ? JSON.parse(initialHighlights) : null
  );

  const cartContext = useCart();

  useEffect(() => {
    const remoteConfig = firebase.remoteConfig();
    remoteConfig.settings = {
      minimumFetchIntervalMillis: 60000,
      fetchTimeoutMillis: 60000,
    };
    remoteConfig.defaultConfig = {
      mainBanner: mainBanner ? JSON.parse(mainBanner) : null,
    };
    remoteConfig
      .fetchAndActivate()
      .then(() => {
        const banner = remoteConfig.getValue("mainBanner").asString();
        const highlights = remoteConfig.getValue("highlights").asString();

        // Banner
        if (banner) {
          setBanner(JSON.parse(banner));
          localStorage.setItem("mainBanner", banner);
        }

        // Highlights
        if (highlights) {
          setHighlights(JSON.parse(highlights));
          localStorage.setItem("highlights", highlights);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Hidden mdUp={true}>
        <SearchBar placeHolder="Procure marcas, categorias, modelos"></SearchBar>
      </Hidden>

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
      <HotSection products={hotProducts} brands={brands}></HotSection>
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
