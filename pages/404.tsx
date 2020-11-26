import Axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import Center from "../src/components/Atoms/Center";
import CustomButton from "../src/components/Atoms/CustomButton";
import Padding from "../src/components/Atoms/Padding";
import SizedBox from "../src/components/Atoms/SizedBox";
import Layout from "../src/components/Templates/Layout";
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
  max-width: 100%;
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

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

interface Page404Props {
  menu: Menu;
}

function Page404({ menu }: Page404Props): JSX.Element {
  const router = useRouter();

  const _goTo = (route: string) => {
    router.push(route);
  };

  return (
    <Layout menu={menu}>
      <Padding horizontal={16}>
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
            <Image src="/images/404-min.png"></Image>
          </Center>
          <Buttons>
            <CustomButton
              variant="contained"
              width={187}
              onClick={() => _goTo("/")}
            >
              Voltar ao Início
            </CustomButton>
            <SizedBox width={16}></SizedBox>
            <CustomButton
              variant="outlined"
              width={187}
              onClick={() => _goTo("/contato")}
            >
              Entre em Contato
            </CustomButton>
          </Buttons>
          <SizedBox height={16}></SizedBox>
          <Center>
            <Caption>
              Volte à página inicial ou entre em contato se achar que é um erro.
            </Caption>
          </Center>
          <SizedBox height={72}></SizedBox>
        </>
      </Padding>
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
