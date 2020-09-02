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
import Colors from "../src/enums/Colors";
import { useCart } from "../src/hooks/use-cart";
import Product from "../src/types/Product";

function Home(): JSX.Element {
  const hotProducts: Array<Product> = [
    {
      id: "323d1e6f-1999-4e6e-ad47-e75a675c470a",
      image:
        "https://res.cloudinary.com/cirklebr/image/upload/c_fit,w_600/v1598522500/products/photo-1502716119720-b23a93e5fe1b_gjurjv.jpg",
      brand: "Prada",
      title: "Vestido de Bolinhas Brancas - Vários Tamanhos",
      price: 2879.99,
      priceWhenNew: 3599.99,
      description: "Officiis Voluptatem Aut",
      sku: "3beb3384-68f7-4989-aef4-04e1cb665bc5",
      color: "Vermelho",
      qty: 1,
      size: "M",
    },
    {
      id: "520b83d9-dac9-47ce-9456-990fb4bf703c",
      image:
        "https://res.cloudinary.com/cirklebr/image/upload/c_fit,w_600/v1598522519/products/photo-1535043934128-cf0b28d52f95_tmxiwy.jpg",
      brand: "Chanel",
      title: "Sapato Chanel No. 37",
      price: 499.99,
      priceWhenNew: 799.99,
      description: "Ut Cum Animi",
      sku: "4161656e-2a84-4551-904e-93a3bc040d97",
      color: "Bege",
      qty: 1,
      size: "M",
    },
    {
      id: "db71af90-20b2-48f7-b4b9-be4128367952",
      image:
        "https://res.cloudinary.com/cirklebr/image/upload/c_fit,w_600/v1598522529/products/photo-1529025530948-67e8a5c69b58_dgeib0.jpg",
      brand: "Louis Vuitton",
      title: "Bolsa LV Paris",
      price: 1599.99,
      priceWhenNew: 2099.99,
      description: "Accusantium Quibusdam Suscipit",
      sku: "7524a1bb-a3db-45d7-bbbe-e45d330196d0",
      color: "Preto",
      qty: 1,
      size: "M",
    },
    {
      id: "1fe7fed8-702d-483a-8b58-1e94a22f701d",
      image:
        "https://res.cloudinary.com/cirklebr/image/upload/c_fit,w_600/v1598522536/products/photo-1590736969955-71cc94801759_aury70.jpg",
      brand: "Michael Kors",
      title: "Relógio Mod. MK450",
      price: 527.0,
      priceWhenNew: 1799.99,
      description: "Rem Doloremque Qui",
      sku: "131e6b5a-d161-42dc-b51f-1ef2892f722d",
      color: "Dourado",
      qty: 1,
      size: "M",
    },
    {
      id: "d94dc774-fe8f-4cfd-90c2-949d16b1fade",
      image:
        "https://res.cloudinary.com/cirklebr/image/upload/c_fit,w_600/v1599061346/products/photo-1514326005837-fb4791d25e03_clwtgo.jpg",
      brand: "Armani",
      title: "Chapéu Gorgeous",
      price: 141.0,
      priceWhenNew: 399.0,
      description: "Officiis Quis Assumenda",
      sku: "d4bbe03c-7253-4a0f-ad96-abd36ac25ed7",
      color: "Azul Escuro",
      qty: 1,
      size: "M",
    },
    {
      id: "46675848-4802-4422-b48e-0bc6ba463a55",
      image:
        "https://res.cloudinary.com/cirklebr/image/upload/c_fit,w_600/v1599061305/products/photo-1567954038072-773e351a5ed6_ino549.jpg",
      brand: "Versace",
      title: "Saia Awesome",
      price: 210.0,
      priceWhenNew: 467.0,
      description: "Provident Voluptas Quis",
      sku: "bbc499ec-936d-42bf-90e3-68e7b03bac9f",
      color: "Cinza",
      qty: 1,
      size: "M",
    },
    {
      id: "93f60b67-282c-4cc7-b7dc-7f89e82d1777",
      image:
        "https://res.cloudinary.com/cirklebr/image/upload/c_fit,w_600/v1599061421/products/photo-1584036553516-bf83210aa16c_zsjzvm.jpg",
      brand: "Dior",
      title: "Óculos Incredible",
      price: 447.0,
      priceWhenNew: 500.0,
      description: "Nesciunt Reprehenderit Ea",
      sku: "d62bb975-70e9-402d-9e39-4e3b2c3ce859",
      color: "Marrom",
      qty: 1,
      size: "M",
    },
    {
      id: "304921ea-5672-4d38-a4e5-dbdaeba736a8",
      image:
        "https://res.cloudinary.com/cirklebr/image/upload/c_fit,w_600/v1599061237/products/photo-1518953789413-9598f0909795_rqdfet.jpg",
      brand: "Dolce & Gabbana",
      title: "Fantastic Ring",
      price: 478.0,
      priceWhenNew: 748.0,
      description: "Molestiae Sint Error",
      sku: "09a90e70-d4f3-4d79-a702-d21084656fb0",
      color: "Ouro",
      qty: 1,
      size: "M",
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
