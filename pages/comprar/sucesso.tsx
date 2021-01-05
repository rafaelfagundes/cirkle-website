import { useMediaQuery } from "@material-ui/core";
import Axios from "axios";
import React from "react";
import Card from "../../src/components/Atoms/Card";
import Center from "../../src/components/Atoms/Center";
import CustomButton from "../../src/components/Atoms/CustomButton";
import Icon from "../../src/components/Atoms/Icon";
import SimpleText from "../../src/components/Atoms/SimpleText";
import SizedBox from "../../src/components/Atoms/SizedBox";
import Title from "../../src/components/Atoms/Title";
import Layout from "../../src/components/Templates/Layout";
import Colors from "../../src/enums/Colors";
import { useAuth } from "../../src/hooks/auth/useAuth";
import Menu from "../../src/modules/menu/Menu";
import theme from "../../src/theme/theme";

function PurchaseSuccess({ menu }: { menu: Menu }): JSX.Element {
  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));
  const authContext = useAuth();

  // Scroll to top when page is loaded
  React.useEffect(() => {
    if (process.browser) window.scrollTo(0, 0);
  }, []);

  return (
    <Layout menu={menu}>
      <SizedBox height={isSmartPhone ? 16 : 32}></SizedBox>
      <Card>
        <SizedBox height={32}></SizedBox>
        <Center>
          <img src="/images/check.svg" width={96} height={96}></img>
        </Center>
        <SizedBox height={32}></SizedBox>
        <Center>
          <Title color={Colors.MONEY} size={22}>
            Compra Concluída
          </Title>
        </Center>
        <SizedBox height={4}></SizedBox>
        <Center>
          <Title color={Colors.MONEY} size={22}>
            Com Sucesso!
          </Title>
        </Center>
        <SizedBox height={32}></SizedBox>
        <Center>
          <SimpleText>PEDIDO #AET65433A</SimpleText>
        </Center>
        <SizedBox height={32}></SizedBox>
        <Center>
          <SimpleText bold centered>
            Todos os detalhes da compra
          </SimpleText>
        </Center>
        <SizedBox height={4}></SizedBox>
        <Center>
          <SimpleText bold centered>
            foram enviados para
          </SimpleText>
        </Center>
        <SizedBox height={8}></SizedBox>
        <Center>
          <SimpleText centered color={Colors.SECONDARY}>
            {authContext?.user?.email}
          </SimpleText>
        </Center>
        <SizedBox height={32}></SizedBox>
        <Center>
          <Icon type="truck" size={32}></Icon>
        </Center>
        <SizedBox height={4}></SizedBox>
        <Center>
          <SimpleText centered>Previsão de Entrega</SimpleText>
        </Center>
        <SizedBox height={4}></SizedBox>
        <Center>
          <SimpleText centered color={Colors.SECONDARY}>
            2 à 4 dias úteis
          </SimpleText>
        </Center>
        <SizedBox height={24}></SizedBox>
        <Center>
          <CustomButton variant="outlined" onClick={null} width={220}>
            Acompanhar Pedido
          </CustomButton>
        </Center>
        <SizedBox height={16}></SizedBox>
        <Center>
          <CustomButton variant="contained" onClick={null} width={220}>
            Criar Conta
          </CustomButton>
        </Center>
        <SizedBox height={8}></SizedBox>

        <Center>
          <SimpleText centered color={Colors.SECONDARY} size={0.9}>
            Crie uma conta para acompanhar
          </SimpleText>
        </Center>
        <Center>
          <SimpleText centered color={Colors.SECONDARY} size={0.9}>
            seus pedidos facilmente
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

export default PurchaseSuccess;
