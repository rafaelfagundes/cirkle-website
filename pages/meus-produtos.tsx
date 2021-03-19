import { useMediaQuery } from "@material-ui/core";
import Axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import useSWR from "swr";
import Center from "../src/components/Atoms/Center";
import Column from "../src/components/Atoms/Column";
import Icon from "../src/components/Atoms/Icon";
import LoadingAnimation from "../src/components/Atoms/LoadingAnimation";
import Padding from "../src/components/Atoms/Padding";
import SizedBox from "../src/components/Atoms/SizedBox";
import Title from "../src/components/Atoms/Title";
import ClientProductItem from "../src/components/Molecules/ClientProductItem";
import ClientProductsStats from "../src/components/Molecules/ClientProductsStats";
import EmptyPage from "../src/components/Templates/EmptyPage";
import Page from "../src/components/Templates/Page";
import Menu from "../src/modules/menu/Menu";
import theme from "../src/theme/theme";

const ProductsList = styled.div<{ isSmartPhone: boolean }>`
  padding: 0 16px;
`;

interface PageProps {
  menu: Menu;
  search: any;
}

function MyProducts(props: PageProps): JSX.Element {
  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));

  const router = useRouter();

  const _goTo = (route: string) => {
    typeof window !== "undefined" && router.push(route);
  };

  const { data, error } = useSWR("/client-products");
  if (error) console.error(error);

  const { data: stats, error: statsError } = useSWR("/client-products/stats");
  if (statsError) console.error(error);

  return (
    <Page
      image="/images/my-products.jpg"
      title="Meus Produtos"
      noPadding={isSmartPhone}
      menu={props.menu}
      search={props.search}
    >
      {stats && (
        <>
          <SizedBox height={32}></SizedBox>
          <Padding horizontal={16}>
            <ClientProductsStats
              products={stats.products}
              selling={stats.selling}
              sold={stats.sold}
              unapproved={stats.unapproved}
              donated={stats.donated}
              total={stats.total}
            ></ClientProductsStats>
          </Padding>
        </>
      )}
      <SizedBox height={32}></SizedBox>
      <ProductsList isSmartPhone={isSmartPhone}>
        {data?.length === 0 && (
          <>
            <EmptyPage
              buttonAction={() => _goTo("/quero-vender")}
              buttonText="Quero Vender"
              icon="box"
              title="Nenhum Produto à Venda :("
              subtitle="Não perca tempo, venda seus produtos e faça a moda circular"
            ></EmptyPage>
            <SizedBox height={32}></SizedBox>
          </>
        )}
        {data?.length > 0 && (
          <>
            {data.map((product: any) => (
              <ClientProductItem
                key={product.puid}
                item={product}
              ></ClientProductItem>
            ))}
          </>
        )}
        {!data && (
          <Column>
            <SizedBox height={72}></SizedBox>
            <Center>
              <Icon type="box" size={128}></Icon>
            </Center>
            <SizedBox height={32}></SizedBox>
            <Center>
              <Title>Carregando Seus Produtos</Title>
            </Center>
            <SizedBox height={32}></SizedBox>
            <Center>
              <LoadingAnimation size={72} color></LoadingAnimation>
            </Center>
            <SizedBox height={72}></SizedBox>
          </Column>
        )}
      </ProductsList>
    </Page>
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

export default MyProducts;
