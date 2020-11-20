import Axios from "axios";
import React from "react";
import WannaSell from "../src/components/Pages/WannaSell/WannaSellPage";
import Layout from "../src/components/Templates/Layout";
import Menu from "../src/modules/menu/Menu";

function QueroVender({ menu }: { menu: Menu }): JSX.Element {
  return (
    <Layout menu={menu} containerMargin={false}>
      <WannaSell></WannaSell>
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
