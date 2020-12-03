import { useMediaQuery } from "@material-ui/core";
import Axios from "axios";
import React from "react";
import Card from "../../src/components/Atoms/Card";
import Center from "../../src/components/Atoms/Center";
import CustomButton from "../../src/components/Atoms/CustomButton";
import SimpleText from "../../src/components/Atoms/SimpleText";
import SizedBox from "../../src/components/Atoms/SizedBox";
import Title from "../../src/components/Atoms/Title";
import Layout from "../../src/components/Templates/Layout";
import Colors from "../../src/enums/Colors";
import { useAuth } from "../../src/hooks/auth/useAuth";
import Menu from "../../src/modules/menu/Menu";
import theme from "../../src/theme/theme";

function PurchaseError({ menu }: { menu: Menu }): JSX.Element {
  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));
  const authContext = useAuth();

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
            O pagamento foi recusado
          </SimpleText>
        </Center>
        <SizedBox height={4}></SizedBox>
        <Center>
          <SimpleText bold centered size={1.4}>
            pela instituição financeira
          </SimpleText>
        </Center>
        <SizedBox height={24}></SizedBox>
        <Center>
          <SimpleText centered color={Colors.SECONDARY}>
            Entre em contato com a instituição financeira,
          </SimpleText>
        </Center>
        <Center>
          <SimpleText centered color={Colors.SECONDARY}>
            ou tente novamente com outro cartão ou
          </SimpleText>
        </Center>
        <Center>
          <SimpleText centered color={Colors.SECONDARY}>
            forma de pagamento
          </SimpleText>
        </Center>
        <SizedBox height={48}></SizedBox>
        <Center>
          <CustomButton variant="contained" onClick={null} width={220}>
            Tenter Novamente
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
