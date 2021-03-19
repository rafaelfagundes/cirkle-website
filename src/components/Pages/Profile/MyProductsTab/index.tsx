import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import useSWR from "swr";
import Center from "../../../Atoms/Center";
import Column from "../../../Atoms/Column";
import Icon from "../../../Atoms/Icon";
import LoadingAnimation from "../../../Atoms/LoadingAnimation";
import SizedBox from "../../../Atoms/SizedBox";
import Title from "../../../Atoms/Title";
import ClientProductItem from "../../../Molecules/ClientProductItem";
import ClientProductsStats from "../../../Molecules/ClientProductsStats";
import EmptyPage from "../../../Templates/EmptyPage";

const StyledWishlist = styled.div``;

function MyProductsTab(): JSX.Element {
  const router = useRouter();

  const _goTo = (route: string) => {
    typeof window !== "undefined" && router.push(route);
  };

  const { data, error } = useSWR("/client-products");
  if (error) console.error(error);

  const { data: stats, error: statsError } = useSWR("/client-products/stats");
  if (statsError) console.error(error);

  return (
    <StyledWishlist>
      {stats && (
        <>
          <ClientProductsStats
            products={stats.products}
            selling={stats.selling}
            sold={stats.sold}
            unapproved={stats.unapproved}
            donated={stats.donated}
            total={stats.total}
          ></ClientProductsStats>
          <SizedBox height={32}></SizedBox>
        </>
      )}
      {data?.length === 0 && (
        <EmptyPage
          buttonAction={() => _goTo("/quero-vender")}
          buttonText="Quero Vender"
          icon="box"
          title="Nenhum Produto à Venda :("
          subtitle="Não perca tempo, venda seus produtos e faça a moda circular"
        ></EmptyPage>
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
    </StyledWishlist>
  );
}

export default MyProductsTab;
