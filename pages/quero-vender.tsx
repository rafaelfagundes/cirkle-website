import { useMediaQuery } from "@material-ui/core";
import Axios from "axios";
import React from "react";
import WannaSellHero from "../src/components/Pages/WannaSell/WannaSellHero";
import Layout from "../src/components/Templates/Layout";
import Menu from "../src/modules/menu/Menu";
import theme from "../src/theme/theme";

function QueroVender({ menu }: { menu: Menu }): JSX.Element {
  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Layout menu={menu} containerMargin={false}>
      <>{!isSmartPhone && <WannaSellHero></WannaSellHero>}</>
    </Layout>
  );
}

export async function getStaticProps(): Promise<any> {
  const menuUrl = `${process.env.API_ENDPOINT}/menu`;
  const menuResult = await Axios.get(menuUrl);
  const menu = menuResult.data;

  return {
    props: {
      menu,
    },
    revalidate: 60,
  };
}

export default QueroVender;
