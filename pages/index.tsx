import { Hidden } from "@material-ui/core";
import React from "react";
import HighlightsSection from "../src/components/HighlightsSection";
import HomeCategories from "../src/components/HomeCategories";
import HotSection from "../src/components/HotSection/index";
import MainBanner from "../src/components/MainBanner/index";
import NewsletterSignUp from "../src/components/NewsletterSignUp/index";
import SearchBar from "../src/components/SearchBar/index";
import SizedBox from "../src/components/SizedBox/index";
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

  const hotItems = [
    {
      image:
        "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      brandName: "Prada",
      title: "Vestido de Bolinhas Brancas - Vários Tamanhos",
      price: 2879.99,
      oldPrice: 3599.99,
      link: "/product/a909cb6c-630d-4dfa-a26d-5c85122de4a2",
    },
    {
      image:
        "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      brandName: "Chanel",
      title: "Sapato Chanel No. 37",
      price: 499.99,
      oldPrice: 799.99,
      link: "/product/a909cb6c-630d-4dfa-a26d-5c85122de4a2",
    },
    {
      image:
        "https://images.unsplash.com/photo-1529025530948-67e8a5c69b58?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",
      brandName: "Louis Vuitton",
      title: "Bolsa LV Paris",
      price: 1599.99,
      oldPrice: 2099.99,
      link: "/product/a909cb6c-630d-4dfa-a26d-5c85122de4a2",
    },
    {
      image:
        "https://images.unsplash.com/photo-1590736969955-71cc94801759?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80",
      brandName: "Michael Kors",
      title: "Relógio Mod. MK450",
      price: 799.99,
      oldPrice: 1799.99,
      link: "/product/a909cb6c-630d-4dfa-a26d-5c85122de4a2",
    },
  ];

  return (
    <>
      <Hidden smUp={true}>
        <SearchBar placeHolder="Procure por marcas, tipos, modelos"></SearchBar>
      </Hidden>
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
      <HighlightsSection data={highlights}></HighlightsSection>
      <HotSection data={hotItems}></HotSection>
      <NewsletterSignUp></NewsletterSignUp>
    </>
  );
}

export default Home;
