import { useMediaQuery } from "@material-ui/core";
import Axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import BoletoNumber from "../../src/components/Atoms/BoletoNumber";
import Card from "../../src/components/Atoms/Card";
import Center from "../../src/components/Atoms/Center";
import CustomButton from "../../src/components/Atoms/CustomButton";
import HorizontalLine from "../../src/components/Atoms/HorizontalLine";
import Icon from "../../src/components/Atoms/Icon";
import SimpleText from "../../src/components/Atoms/SimpleText";
import SizedBox from "../../src/components/Atoms/SizedBox";
import Title from "../../src/components/Atoms/Title";
import Layout from "../../src/components/Templates/Layout";
import Colors from "../../src/enums/Colors";
import { useAuth } from "../../src/hooks/auth/useAuth";
import { useCart } from "../../src/hooks/cart/useCart";
import { useOrder } from "../../src/hooks/order/useOrder";
import Menu from "../../src/modules/menu/Menu";
import theme from "../../src/theme/theme";
import { logEventWithParams } from "../../src/utils/logs";

interface PageProps {
  menu: Menu;
  search: any;
}

function PurchaseSuccess(props: PageProps): JSX.Element {
  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));
  const orderContext = useOrder();
  const cartContext = useCart();
  const authContext = useAuth();
  const router = useRouter();

  const createAccount = () => {
    router.push("/cadastrar");
  };

  const goToOrders = () => {
    if (isSmartPhone) {
      router.push("/meus-pedidos");
    } else {
      router.push("/perfil?aba=meus-pedidos");
    }
  };

  const emptyCartAndOrder = () => {
    orderContext.emptyOrder();
    cartContext.emptyCart();
  };

  React.useEffect(() => {
    // Scroll to top when page is loaded
    if (process.browser) window.scrollTo(0, 0);

    // Empty cart and order context
    setTimeout(emptyCartAndOrder, 2000);
    // emptyCartAndOrder();
  }, []);

  let orderResult: any;
  if (orderContext?.order?.orderResultData) {
    orderResult = orderContext.order.orderResultData;
  }
  if (orderResult) {
    const items = cartContext.cart.items.map((item) => ({
      item_id: item.uid,
      item_name: item.title,
      item_brand: item.brand.name,
      item_category: item.subCategory.slug,
      item_variant: item.cartColor,
      price: item.price,
      currency: "BRL",
      quantity: 1,
    }));
    logEventWithParams("purchase", {
      currency: "BRL",
      items,
      transaction_id: orderContext.order.orderResultData.orderId.toUpperCase(),
      shipping: orderContext.order.shipping.custom_price,
      value: cartContext.cart.subtotal,
    });
  }

  function isBoletoOrLoterica(paymentMethodId: string) {
    if (paymentMethodId === "bolbradesco" || paymentMethodId === "pec")
      return paymentMethodId;
    return false;
  }

  function openBoletoURL(url: string) {
    window.open(url);
  }

  return (
    <Layout menu={props.menu} search={props.search}>
      <SizedBox height={isSmartPhone ? 16 : 32}></SizedBox>
      {orderResult && (
        <Card>
          <SizedBox height={32}></SizedBox>
          <Center>
            <img src="/images/check.svg" width={96} height={96}></img>
          </Center>
          <SizedBox height={32}></SizedBox>
          <Center>
            <>
              {isBoletoOrLoterica(orderResult.payload.paymentMethodId) && (
                <Title color={Colors.MONEY} size={22}>
                  Pedido Concluído
                </Title>
              )}
              {!isBoletoOrLoterica(orderResult.payload.paymentMethodId) && (
                <Title color={Colors.MONEY} size={22}>
                  Compra Concluída
                </Title>
              )}
            </>
          </Center>
          <SizedBox height={4}></SizedBox>
          <Center>
            <Title color={Colors.MONEY} size={22}>
              Com Sucesso!
            </Title>
          </Center>
          <SizedBox height={32}></SizedBox>
          <Center>
            <SimpleText>{`PEDIDO #${orderResult.orderId.toUpperCase()}`}</SimpleText>
          </Center>
          <SizedBox height={32}></SizedBox>
          {isBoletoOrLoterica(orderResult.payload.paymentMethodId) && (
            <>
              <HorizontalLine></HorizontalLine>
              <SizedBox height={32}></SizedBox>
              <>
                {isBoletoOrLoterica(orderResult.payload.paymentMethodId) ===
                  "bolbradesco" && (
                  <>
                    <Center>
                      <Title>Pagamento Via Boleto</Title>
                    </Center>
                    <SizedBox height={16}></SizedBox>
                    <Center>
                      <CustomButton
                        width={220}
                        type="edit"
                        onClick={() =>
                          openBoletoURL(orderResult.payload.resourceUrl)
                        }
                        icon="printer"
                      >
                        Imprimir Boleto
                      </CustomButton>
                    </Center>
                    <SizedBox height={12}></SizedBox>
                    <Center>
                      <SimpleText centered color={Colors.GRAY} size={0.9}>
                        O boleto é válido até
                      </SimpleText>
                    </Center>
                    <SizedBox height={4}></SizedBox>
                    <Center>
                      <SimpleText centered color={Colors.PRIMARY} size={1}>
                        {`${moment(orderResult.payload.dateOfExpiration).format(
                          "DD/MM/YYYY[ às ]HH:mm"
                        )}`}
                      </SimpleText>
                    </Center>
                    <SizedBox height={32}></SizedBox>
                    <BoletoNumber>{orderResult.payload.barcode}</BoletoNumber>
                  </>
                )}
                {isBoletoOrLoterica(orderResult.payload.paymentMethodId) ===
                  "pec" && (
                  <>
                    <Center>
                      <Title>Pagamento Na Lotérica</Title>
                    </Center>
                    <SizedBox height={16}></SizedBox>
                    <Center>
                      <SimpleText size={0.9} centered>
                        Após pressionar o botão abaixo,
                      </SimpleText>
                    </Center>
                    <Center>
                      <SimpleText size={0.9} centered>
                        anote os dados e informe ao atendente da casa lotérica.
                      </SimpleText>
                    </Center>
                    <SizedBox height={16}></SizedBox>
                    <Center>
                      <CustomButton
                        onClick={() =>
                          openBoletoURL(orderResult.payload.resourceUrl)
                        }
                        width={230}
                        type="edit"
                        icon="ticket"
                      >
                        Abrir Dados de Pagamento
                      </CustomButton>
                    </Center>
                    <SizedBox height={16}></SizedBox>
                    <Center>
                      <SimpleText size={0.9} color={Colors.MONEY} centered>
                        Dica: caso esteja no celular tire um print dos dados,
                      </SimpleText>
                    </Center>
                    <Center>
                      <SimpleText size={0.9} color={Colors.MONEY} centered>
                        caso esteja no computador, tire uma foto com o
                      </SimpleText>
                    </Center>
                    <Center>
                      <SimpleText size={0.9} color={Colors.MONEY} centered>
                        smartphone.
                      </SimpleText>
                    </Center>
                  </>
                )}
              </>
              <SizedBox height={36}></SizedBox>
              <HorizontalLine></HorizontalLine>
              <SizedBox height={32}></SizedBox>
            </>
          )}
          <Center>
            <>
              {isBoletoOrLoterica(orderResult.payload.paymentMethodId) && (
                <SimpleText bold centered>
                  Todos os detalhes do pedido
                </SimpleText>
              )}
              {!isBoletoOrLoterica(orderResult.payload.paymentMethodId) && (
                <SimpleText bold centered>
                  Todos os detalhes da compra
                </SimpleText>
              )}
            </>
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
              {orderResult.payload.email}
            </SimpleText>
          </Center>
          <SizedBox height={36}></SizedBox>
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
              {`${orderResult.payload.rangeMin} à ${orderResult.payload.rangeMax} dias úteis`}
            </SimpleText>
          </Center>
          <SizedBox height={36}></SizedBox>
          <HorizontalLine></HorizontalLine>
          <SizedBox height={36}></SizedBox>

          {!authContext.user && (
            <>
              <Center>
                <CustomButton
                  variant="contained"
                  onClick={createAccount}
                  width={220}
                >
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
                  seus pedidos de forma simples
                </SimpleText>
              </Center>
            </>
          )}
          {authContext.user && (
            <>
              <Center>
                <CustomButton
                  variant="contained"
                  onClick={goToOrders}
                  width={220}
                >
                  Meus Pedidos
                </CustomButton>
              </Center>
              <SizedBox height={8}></SizedBox>
              <Center>
                <SimpleText centered color={Colors.SECONDARY} size={0.9}>
                  Acompanhe aqui seus pedidos
                </SimpleText>
              </Center>
            </>
          )}

          <SizedBox height={16}></SizedBox>
        </Card>
      )}
      <SizedBox height={isSmartPhone ? 16 : 32}></SizedBox>
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

export default PurchaseSuccess;
