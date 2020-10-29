import Axios from "axios";
import React from "react";
import styled from "styled-components";
import Center from "../src/components/Center";
import Layout from "../src/components/Layout";
import SizedBox from "../src/components/SizedBox";
import Colors from "../src/enums/Colors";
import Menu from "../src/modules/menu/Menu";

const Title = styled.span`
  font-family: Commissioner, Lato, sans-serif;
  font-weight: 500;
  font-size: 72px;
  line-height: 86px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.03em;
  color: ${Colors.PRIMARY};
  z-index: 1;
`;

const Subtitle = styled.span`
  font-family: Commissioner, Lato, sans-serif;
  font-weight: 400;
  font-size: 32px;
  line-height: 38px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.03em;
  color: ${Colors.PRIMARY};
  z-index: 1;
`;

const Image = styled.img`
  margin-top: -140px;
  width: 500px;
  height: 500px;
  margin-bottom: -108px;
`;

const Caption = styled.div`
  font-family: Commissioner, Lato, sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.03em;
  color: ${Colors.PRIMARY};
`;

interface Page404Props {
  menu: Menu;
}

function Page404({ menu }: Page404Props): JSX.Element {
  return (
    <Layout menu={menu}>
      <>
        <SizedBox height={30}></SizedBox>
        <Center>
          <Title>Oops!</Title>
        </Center>
        <SizedBox height={5}></SizedBox>
        <Center>
          <Subtitle>A página que você procura não existe.</Subtitle>
        </Center>
        <Center>
          <Image src="/images/404.png"></Image>
        </Center>
        <Center>
          <Caption>
            Você pode voltar à página inicial ou entrar em contato se achar que
            é um erro.
          </Caption>
        </Center>
        <SizedBox height={72}></SizedBox>
      </>
    </Layout>
  );
}

export async function getStaticProps(): Promise<any> {
  function getMenu(url: string) {
    return Axios.get(url);
  }

  const menuUrl = `${process.env.API_ENDPOINT}/menu`;

  const results = await Promise.all([getMenu(menuUrl)]);

  const menu = results[0].data;

  return {
    props: {
      menu,
    },
    revalidate: 60,
  };
}

export default Page404;
