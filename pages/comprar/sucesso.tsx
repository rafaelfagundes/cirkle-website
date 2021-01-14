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
import { useCart } from "../../src/hooks/cart/useCart";
import { useOrder } from "../../src/hooks/order/useOrder";
import Menu from "../../src/modules/menu/Menu";
import theme from "../../src/theme/theme";

function PurchaseSuccess({ menu }: { menu: Menu }): JSX.Element {
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

  const emptyCartAndOrder = () => {
    orderContext.emptyOrder();
    cartContext.emptyCart();
  };

  React.useEffect(() => {
    // Scroll to top when page is loaded
    if (process.browser) window.scrollTo(0, 0);

    // Empty cart and order context
    emptyCartAndOrder();
  }, []);

  let orderResult: any;
  if (orderContext?.order?.orderResultData) {
    orderResult = orderContext.order.orderResultData;
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
    <Layout menu={menu}>
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
              {isBoletoOrLoterica(
                orderResult.payload.payment.payment_method_id
              ) && (
                <Title color={Colors.MONEY} size={22}>
                  Pedido Concluído
                </Title>
              )}
              {!isBoletoOrLoterica(
                orderResult.payload.payment.payment_method_id
              ) && (
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
          {isBoletoOrLoterica(
            orderResult.payload.payment.payment_method_id
          ) && (
            <>
              <HorizontalLine></HorizontalLine>
              <SizedBox height={32}></SizedBox>
              <>
                {isBoletoOrLoterica(
                  orderResult.payload.payment.payment_method_id
                ) === "bolbradesco" && (
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
                          openBoletoURL(
                            orderResult.payload.payment.transaction_details
                              .external_resource_url
                          )
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
                        {`${moment(
                          orderResult.payload.payment.date_of_expiration
                        ).format("DD/MM/YYYY[ às ]HH:mm")}`}
                      </SimpleText>
                    </Center>
                    <SizedBox height={32}></SizedBox>
                    <BoletoNumber>
                      {orderResult.payload.payment.barcode.content}
                    </BoletoNumber>
                  </>
                )}
                {isBoletoOrLoterica(
                  orderResult.payload.payment.payment_method_id
                ) === "pec" && (
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
                          openBoletoURL(
                            orderResult.payload.payment.transaction_details
                              .external_resource_url
                          )
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
              {isBoletoOrLoterica(
                orderResult.payload.payment.payment_method_id
              ) && (
                <SimpleText bold centered>
                  Todos os detalhes do pedido
                </SimpleText>
              )}
              {!isBoletoOrLoterica(
                orderResult.payload.payment.payment_method_id
              ) && (
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
              {orderResult.payload.user.email}
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
              {`${orderResult.payload.shipping.deliveryRange.min} à ${orderResult.payload.shipping.deliveryRange.max} dias úteis`}
            </SimpleText>
          </Center>
          <SizedBox height={36}></SizedBox>

          {/* <Center>
            <CustomButton variant="outlined" onClick={null} width={220}>
              Acompanhar Pedido
            </CustomButton>
          </Center> */}
          <HorizontalLine></HorizontalLine>
          <SizedBox height={36}></SizedBox>
          <Center>
            <CustomButton
              variant={
                isBoletoOrLoterica(
                  orderResult.payload.payment.payment_method_id
                )
                  ? "outlined"
                  : "contained"
              }
              onClick={null}
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

          <SizedBox height={16}></SizedBox>
        </Card>
      )}
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
