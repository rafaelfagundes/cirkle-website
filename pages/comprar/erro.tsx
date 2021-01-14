import { useMediaQuery } from "@material-ui/core";
import Axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styled from "styled-components";
import Card from "../../src/components/Atoms/Card";
import Center from "../../src/components/Atoms/Center";
import CustomButton from "../../src/components/Atoms/CustomButton";
import SimpleText from "../../src/components/Atoms/SimpleText";
import SizedBox from "../../src/components/Atoms/SizedBox";
import Title from "../../src/components/Atoms/Title";
import Layout from "../../src/components/Templates/Layout";
import Colors from "../../src/enums/Colors";
import { useCart } from "../../src/hooks/cart/useCart";
import { useOrder } from "../../src/hooks/order/useOrder";
import Menu from "../../src/modules/menu/Menu";
import theme from "../../src/theme/theme";

const LimitMessage = styled.div`
  max-width: 400px;
`;

const OrderStatus = {
  0: { title: 0, message: "Success" },
  100: {
    title: "Erro Desconhecido",
    message: "Ocorreu um erro desconhecido ao tentar efetuar o pedido.",
  },
  200: {
    title: "Erro ao Contactar Serviço de Pagamento",
    message: "Ocorreu um erro ao tentar contactar o serviço de pagamento.",
  },
  201: {
    title: "Erro ao Processar Pagamento",
    message:
      "Um erro ocorreu ao tentar efetuar o pagamento. Tente novamente mais tarde. Se o problema persistir entre em contato com a administradora do cartão.",
  },
  300: {
    title: "Dados Inválidos Foram Enviados",
    message: "Por motivos de segurança esse pedido foi negado.",
  },
  400: {
    title: "Erro ao Contactar Serviço de Entrega",
    message: "Ocorreu um erro ao tentar contactar o serviço de entrega.",
  },
  401: {
    title: "Erro ao Processar Pedido de Entrega",
    message:
      "Um erro ocorreu ao tentar efetuar o pedido de transporte. Tente novamente mais tarde.",
  },
  500: {
    title: "Item(ns) estão fora de estoque",
    message:
      "Pedimos desculpas, mas um ou mais itens saíram de estoque ao tentar efetuar o pedido. Nenhuma cobrança foi efetuada.",
  },
  600: {
    title: "Cupom de Desconto Inválido",
    message: "O cupom inserido é inválido ou já foi usado.",
  },
};

function PurchaseError({ menu }: { menu: Menu }): JSX.Element {
  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));
  const orderContext = useOrder();
  const cartContext = useCart();

  const router = useRouter();

  // if (cartContext.cart.items.length === 0) {
  //   if (process.browser) {
  //     router.push("/");
  //     return <></>;
  //   }
  // }

  useEffect(() => {
    // Scroll to top when page is loaded
    if (process.browser) window.scrollTo(0, 0);
  }, []);

  return (
    <Layout menu={menu}>
      <SizedBox height={isSmartPhone ? 16 : 32}></SizedBox>
      <Card>
        <SizedBox height={32}></SizedBox>
        <Center>
          <img src="/images/close.svg" width={96} height={96}></img>
        </Center>
        <SizedBox height={32}></SizedBox>
        <Center>
          <Title color={Colors.ERROR} size={22}>
            O PEDIDO NÃO PÔDE
          </Title>
        </Center>
        <SizedBox height={4}></SizedBox>
        <Center>
          <Title color={Colors.ERROR} size={22}>
            SER CONCLUÍDO
          </Title>
        </Center>
        <SizedBox height={32}></SizedBox>
        <Center>
          <SimpleText bold centered size={1.4}>
            {
              OrderStatus[orderContext?.order?.orderResultData?.status?.code]
                ?.title
            }
          </SimpleText>
        </Center>
        {/* <SizedBox height={4}></SizedBox>
        <Center>
          <SimpleText bold centered size={1.4}>
            pela instituição financeira
          </SimpleText>
        </Center> */}
        <SizedBox height={24}></SizedBox>
        <Center>
          <LimitMessage>
            <SimpleText centered color={Colors.SECONDARY}>
              {
                OrderStatus[orderContext?.order?.orderResultData?.status?.code]
                  ?.message
              }
            </SimpleText>
          </LimitMessage>
        </Center>
        {/* <Center>
          <SimpleText centered color={Colors.SECONDARY}>
            ou tente novamente com outro cartão ou
          </SimpleText>
        </Center>
        <Center>
          <SimpleText centered color={Colors.SECONDARY}>
            forma de pagamento
          </SimpleText>
        </Center> */}
        <SizedBox height={48}></SizedBox>
        <Center>
          <CustomButton
            variant="contained"
            onClick={() => router.back()}
            width={220}
          >
            Tentar Novamente
          </CustomButton>
        </Center>
        <SizedBox height={8}></SizedBox>

        <Center>
          <SimpleText centered color={Colors.SECONDARY} size={0.9}>
            Todas as informações do carrinho
          </SimpleText>
        </Center>
        <Center>
          <SimpleText centered color={Colors.SECONDARY} size={0.9}>
            estão salvas
          </SimpleText>
        </Center>

        <SizedBox height={32}></SizedBox>
      </Card>
      <SizedBox height={isSmartPhone ? 16 : 32}></SizedBox>
    </Layout>
  );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getStaticProps(): Promise<any> {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library

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

export default PurchaseError;
