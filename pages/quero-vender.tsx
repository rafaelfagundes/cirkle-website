import { useMediaQuery } from "@material-ui/core";
import Axios from "axios";
import React from "react";
import WannaSellDesktop from "../src/components/Pages/WannaSell/WannaSellDesktopPage";
import WannaSellMobile from "../src/components/Pages/WannaSell/WannaSellMobilePage";
import Layout from "../src/components/Templates/Layout";
import Menu from "../src/modules/menu/Menu";
import theme from "../src/theme/theme";

function QueroVender({ menu }: { menu: Menu }): JSX.Element {
  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Layout menu={menu} containerMargin={false}>
      <>
        {!isSmartPhone && <WannaSellDesktop></WannaSellDesktop>}
        {isSmartPhone && <WannaSellMobile></WannaSellMobile>}
      </>
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
