import { Container, useMediaQuery } from "@material-ui/core";
import Axios from "axios";
import React from "react";
import Layout from "../src/components/Layout";
import SizedBox from "../src/components/SizedBox";
import Title from "../src/components/Title";
import Menu from "../src/modules/menu/Menu";
import theme from "../src/theme/theme";

function Contato({ menu }: { menu: Menu }): JSX.Element {
  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Layout containerMargin={false} menu={menu}>
      <Container maxWidth="md" disableGutters={!isSmartPhone}>
        <SizedBox height={isSmartPhone ? 32 : 72}></SizedBox>
        <Title>Contato</Title>
        <SizedBox height={72}></SizedBox>
      </Container>
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

export default Contato;
