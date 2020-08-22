import { Hidden } from "@material-ui/core";
import React from "react";
import HighlightsSection from "../src/components/HighlightsSection";
import HomeCategories from "../src/components/HomeCategories";
import HotSection from "../src/components/HotSection/index";
import MainBanner from "../src/components/MainBanner/index";
import NewsletterSignUp from "../src/components/NewsletterSignUp";
import SearchBar from "../src/components/SearchBar/index";
import SizedBox from "../src/components/SizedBox/index";
import TopTextBanner from "../src/components/TopTextBanner";
import { Colors } from "../src/theme/theme";

function Home(): JSX.Element {
  const highlights = [
    {
      id: "9c2c5e99-4395-4634-a7a3-43ca8e4026c0",
      title: "Calçados para o Verão",
      subtitle: "Confira as Novidades",
      image: "/images/highlights/shoes.jpg",
      link: "/highlights/65445b8a-c0a3-4cc9-a2aa-d95ef5539d47",
    },
    {
      id: "3d3c7436-74e3-4e89-b1c8-3cc1ef24bd32",
      title: "Vestidos para festa",
      subtitle: "Mostre-me mais",
      image: "/images/highlights/dresses.jpg",
      link: "/highlights/ab2504be-6282-4299-b3fd-676f58fbe47d",
    },
    {
      id: "0c74c9c5-b359-48c1-bf75-9549cfc25db8",
      title: "Fantasias infantis",
      subtitle: "Veja as mais divertidas",
      image: "/images/highlights/kids.jpg",
      link: "/highlights/a5616bd8-7af4-4ec0-b7df-973a0b548142",
    },
    {
      id: "e95a99a5-2ef1-4156-a0bf-74a5f4440029",
      title: "Bolsas com até 70% OFF",
      subtitle: "Quero ver mais",
      image: "/images/highlights/purses.jpg",
      link: "/highlights/51da52ab-d307-4144-947f-8bf310fe78aa",
    },
  ];

  const hotProducts = [
    {
      id: "323d1e6f-1999-4e6e-ad47-e75a675c470a",
      image:
        "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      brandName: "Prada",
      title: "Vestido de Bolinhas Brancas - Vários Tamanhos",
      price: 2879.99,
      oldPrice: 3599.99,
      link: "/product/a909cb6c-630d-4dfa-a26d-5c85122de4a2",
    },
    {
      id: "520b83d9-dac9-47ce-9456-990fb4bf703c",
      image:
        "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      brandName: "Chanel",
      title: "Sapato Chanel No. 37",
      price: 499.99,
      oldPrice: 799.99,
      link: "/product/a909cb6c-630d-4dfa-a26d-5c85122de4a2",
    },
    {
      id: "db71af90-20b2-48f7-b4b9-be4128367952",
      image:
        "https://images.unsplash.com/photo-1529025530948-67e8a5c69b58?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",
      brandName: "Louis Vuitton",
      title: "Bolsa LV Paris",
      price: 1599.99,
      oldPrice: 2099.99,
      link: "/product/a909cb6c-630d-4dfa-a26d-5c85122de4a2",
    },
    {
      id: "1fe7fed8-702d-483a-8b58-1e94a22f701d",
      image:
        "https://images.unsplash.com/photo-1590736969955-71cc94801759?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80",
      brandName: "Michael Kors",
      title: "Relógio Mod. MK450",
      price: 799.99,
      oldPrice: 1799.99,
      link: "/product/a909cb6c-630d-4dfa-a26d-5c85122de4a2",
    },
    {
      id: "d94dc774-fe8f-4cfd-90c2-949d16b1fade",
      image:
        "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      brandName: "Prada",
      title: "Vestido de Bolinhas Brancas - Vários Tamanhos",
      price: 2879.99,
      oldPrice: 3599.99,
      link: "/product/a909cb6c-630d-4dfa-a26d-5c85122de4a2",
    },
    {
      id: "46675848-4802-4422-b48e-0bc6ba463a55",
      image:
        "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      brandName: "Chanel",
      title: "Sapato Chanel No. 37",
      price: 499.99,
      oldPrice: 799.99,
      link: "/product/a909cb6c-630d-4dfa-a26d-5c85122de4a2",
    },
    {
      id: "93f60b67-282c-4cc7-b7dc-7f89e82d1777",
      image:
        "https://images.unsplash.com/photo-1529025530948-67e8a5c69b58?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",
      brandName: "Louis Vuitton",
      title: "Bolsa LV Paris",
      price: 1599.99,
      oldPrice: 2099.99,
      link: "/product/a909cb6c-630d-4dfa-a26d-5c85122de4a2",
    },
    {
      id: "304921ea-5672-4d38-a4e5-dbdaeba736a8",
      image:
        "https://images.unsplash.com/photo-1590736969955-71cc94801759?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80",
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

  return (
    <>
      <Hidden mdUp={true}>
        <SearchBar placeHolder="Procure marcas, categorias, modelos"></SearchBar>
      </Hidden>

      <TopTextBanner
        color={Colors.AMARANTH_PINK}
        textColor={Colors.TYRIAN_PURPLE}
      >
        Frete grátis para pedidos acima de R$200
      </TopTextBanner>
      <MainBanner
        url="https://images.unsplash.com/photo-1506152983158-b4a74a01c721?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80"
        primaryText="até 70% off"
        secondaryText="bolsas e acessórios"
        position="bottom-right"
        primaryTextColor={Colors.WHITE}
        primaryBackgroundColor={Colors.PARADISE_PINK}
        secondaryTextColor={Colors.BLACK}
        secondaryBackgroundColor={Colors.MIDDLE_YELLOW}
      ></MainBanner>

      <Hidden smUp={true}>
        <SizedBox height={16}></SizedBox>
        <HomeCategories></HomeCategories>
      </Hidden>
      <SizedBox height={16}></SizedBox>
      <Hidden only={["xs", "sm"]}>
        <SizedBox height={32}></SizedBox>
      </Hidden>
      <HighlightsSection data={highlights}></HighlightsSection>
      <HotSection products={hotProducts} brands={brands}></HotSection>
      <NewsletterSignUp></NewsletterSignUp>
      <SizedBox height={32}></SizedBox>
    </>
  );
}

export default Home;
