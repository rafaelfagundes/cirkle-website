import { useMediaQuery } from "@material-ui/core";
import Axios from "axios";
import React from "react";
import WannaSellDesktop from "../src/components/Pages/WannaSell/WannaSellDesktopPage";
import WannaSellMobile from "../src/components/Pages/WannaSell/WannaSellMobilePage";
import Layout from "../src/components/Templates/Layout";
import Menu from "../src/modules/menu/Menu";
import theme from "../src/theme/theme";

interface PageProps {
  menu: Menu;
  search: any;
}

function QueroVender(props: PageProps): JSX.Element {
  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Layout menu={props.menu} search={props.search} containerMargin={false}>
      <>
        {!isSmartPhone && <WannaSellDesktop></WannaSellDesktop>}
        {isSmartPhone && <WannaSellMobile></WannaSellMobile>}
      </>
    </Layout>
  );
}

export async function getStaticProps(): Promise<any> {
  function getContent(url: string) {
    return Axios.get(url);
  }

  const menuUrl = `${process.env.API_ENDPOINT}/menu`;
  const searchUrl = `${process.env.API_ENDPOINT}/isearch`;

  const results = await Promise.all([
    getContent(menuUrl),
    getContent(searchUrl),
  ]);

  const menu = results[0].data;
  const search = results[1].data;

  return {
    props: {
      menu,
      search,
    },
    revalidate: 1440,
  };
}
export default QueroVender;
