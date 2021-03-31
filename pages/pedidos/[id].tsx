import { useMediaQuery } from "@material-ui/core";
import Axios from "axios";
import moment from "moment";
import { GetStaticPaths } from "next";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import BoletoNumber from "../../src/components/Atoms/BoletoNumber";
import CartDescItem from "../../src/components/Atoms/CartDescItem";
import CartHeaderDataItem from "../../src/components/Atoms/CartHeaderDataItem";
import CartInstallments from "../../src/components/Atoms/CartInstallments";
import CartTotal from "../../src/components/Atoms/CartTotal";
import Center from "../../src/components/Atoms/Center";
import Column from "../../src/components/Atoms/Column";
import CustomButton from "../../src/components/Atoms/CustomButton";
import HorizontalLine from "../../src/components/Atoms/HorizontalLine";
import LoadingAnimation from "../../src/components/Atoms/LoadingAnimation";
import Padding from "../../src/components/Atoms/Padding";
import Row from "../../src/components/Atoms/Row";
import SimpleText from "../../src/components/Atoms/SimpleText";
import SizedBox from "../../src/components/Atoms/SizedBox";
import Subtitle from "../../src/components/Atoms/Subtitle";
import Title from "../../src/components/Atoms/Title";
import CartItem from "../../src/components/Molecules/CartItem";
import { getStatus } from "../../src/components/Molecules/OrderItem/functions";
import Page from "../../src/components/Templates/Page";
import Colors from "../../src/enums/Colors";
import Menu from "../../src/modules/menu/Menu";
import theme from "../../src/theme/theme";
import { capitalizeFirstLetter } from "../../src/utils/string";

function OrderPage({ menu }: { menu: Menu }): JSX.Element {
  const router = useRouter();
  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));

  const { data, error } = useSWR(
    router.query.id ? `/orders/${router.query.id}` : null,
    {
      revalidateOnFocus: true,
      refreshInterval: 30000,
      shouldRetryOnError: true,
      errorRetryInterval: 100,
      errorRetryCount: 300,
    }
  );

  if (error) console.error(error);
  if (data) console.log(data);

  const getPaymentIcon = (paymentType: string) => {
    switch (paymentType) {
      case "CREDIT_CARD":
        return "payment-cc";
      case "BOLETO":
        return "payment-barcode";
      case "PEC":
        return "ticket-dark";
      default:
        return "ticket-dark";
    }
  };

  const getPaymentType = (paymentType: string) => {
    switch (paymentType) {
      case "CREDIT_CARD":
        return "Cartão de Crédito";
      case "BOLETO":
        return "Boleto Bancário";
      case "PEC":
        return "Pagamento na Lotérica";
      default:
        return "ERRO";
    }
  };

  const getPaymentInstallments = (payment: any) => {
    switch (payment.method) {
      case "CREDIT_CARD":
        return `${payment?.installments}x ${new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(payment?.installmentValue)}`;
      case "BOLETO":
        return "À vista";
      case "PEC":
        return "À vista";
      default:
        return "ERRO";
    }
  };

  const getPaymentBrand = (payment: any) => {
    switch (payment.method) {
      case "CREDIT_CARD":
        return capitalizeFirstLetter(payment?.issuerName);
      case "BOLETO":
        return "";
      case "PEC":
        return "Não precisa imprimir boleto";
      default:
        return "ERRO";
    }
  };

  function openURL(url: string) {
    window.open(url);
  }

  return (
    <Page
      title={data ? `Pedido #${data.orderId}` : "Pedido"}
      image="/images/orders.jpg"
      menu={menu}
    >
      <Padding
        horizontal={isSmartPhone ? 0 : 20}
        vertical={isSmartPhone ? 0 : 20}
      >
        {data && (
          <>
            {!isSmartPhone && (
              <Row spaceBetween>
                <CustomButton
                  onClick={() => router.back()}
                  variant="text"
                  icon="chevron-left"
                  width={216}
                >
                  Voltar Para Meus Pedidos
                </CustomButton>
                <div>
                  <Row spaceBetween>
                    <Row>
                      <SimpleText
                        color={Colors.SECONDARY}
                      >{`Pedido realizado em:`}</SimpleText>
                      <SizedBox width={5}></SizedBox>
                      <SimpleText bold>{`${moment(data.created_at).format(
                        "DD/MM/yyyy HH:mm"
                      )}`}</SimpleText>
                      <SizedBox width={15}></SizedBox>
                    </Row>
                    {getStatus(data.status, false, 14)}
                  </Row>
                </div>
              </Row>
            )}
            {isSmartPhone && (
              <Column>
                <SizedBox height={20}></SizedBox>
                <CustomButton
                  onClick={() => router.back()}
                  variant="text"
                  icon="chevron-left"
                  width={216}
                >
                  Voltar Para Meus Pedidos
                </CustomButton>
                <SizedBox height={10}></SizedBox>
                <HorizontalLine></HorizontalLine>
                <SizedBox height={16}></SizedBox>
                <Row>
                  <SimpleText
                    color={Colors.SECONDARY}
                  >{`Pedido realizado em:`}</SimpleText>
                  <SizedBox width={5}></SizedBox>
                  <SimpleText bold>{`${moment(data.created_at).format(
                    "DD/MM/yyyy HH:mm"
                  )}`}</SimpleText>
                  <SizedBox width={15}></SizedBox>
                </Row>
                <SizedBox height={16}></SizedBox>
                {getStatus(data.status, false, 14)}
              </Column>
            )}
            <SizedBox height={32}></SizedBox>

            {!isSmartPhone && (
              <Row spaceBetween>
                <CartHeaderDataItem
                  icon="user"
                  line1={data.user?.firstName + " " + data.user?.lastName}
                  line2={data.user?.phone}
                  line3={data.user?.email}
                ></CartHeaderDataItem>
                <CartHeaderDataItem
                  icon="map-pin"
                  line1={`${data.address?.street}, ${data.address?.number}`}
                  line2={`${data.address?.neighborhood}, ${data.address?.city} - ${data.address?.state}`}
                  line3={data.address?.postalCode}
                ></CartHeaderDataItem>
                <CartHeaderDataItem
                  icon={getPaymentIcon(data.payment.method)}
                  line1={getPaymentType(data.payment.method)}
                  line2={getPaymentInstallments(data.payment)}
                  line3={getPaymentBrand(data.payment)}
                ></CartHeaderDataItem>
              </Row>
            )}
            {isSmartPhone && (
              <div>
                <CartHeaderDataItem
                  icon="user"
                  line1={data.user?.firstName + " " + data.user?.lastName}
                  line2={data.user?.phone}
                  line3={data.user?.email}
                ></CartHeaderDataItem>
                <SizedBox height={20}></SizedBox>
                <CartHeaderDataItem
                  icon="map-pin"
                  line1={`${data.address?.street}, ${data.address?.number}`}
                  line2={`${data.address?.neighborhood}, ${data.address?.city} - ${data.address?.state}`}
                  line3={data.address?.postalCode}
                ></CartHeaderDataItem>
                <SizedBox height={20}></SizedBox>
                <CartHeaderDataItem
                  icon={getPaymentIcon(data.payment)}
                  line1={getPaymentType(data.payment)}
                  line2={getPaymentInstallments(data.payment)}
                  line3={getPaymentBrand(data.payment)}
                ></CartHeaderDataItem>
              </div>
            )}

            {data?.status === "SHIPPED" && (
              <>
                <SizedBox height={32}></SizedBox>
                <CustomButton
                  onClick={() => openURL(`/rastreio/${data.uid}`)}
                  width={200}
                  icon="truck-light"
                >
                  Rastrear Pedido
                </CustomButton>
              </>
            )}
            <>
              {data.payment?.method === "BOLETO" &&
                data?.status === "PAYMENT_PENDING" && (
                  <>
                    <SizedBox height={32}></SizedBox>
                    <HorizontalLine></HorizontalLine>
                    <SizedBox height={32}></SizedBox>
                    <Title>Pagamento Via Boleto</Title>
                    <SizedBox height={16}></SizedBox>

                    <CustomButton
                      width={220}
                      type="edit"
                      onClick={() => openURL(data.payment.link)}
                      icon="printer"
                    >
                      Imprimir Boleto
                    </CustomButton>
                    <SizedBox height={12}></SizedBox>

                    <SimpleText color={Colors.GRAY} size={0.9}>
                      O boleto é válido até
                    </SimpleText>
                    <SizedBox height={4}></SizedBox>

                    <SimpleText color={Colors.PRIMARY} size={1}>
                      {`${moment(data.payment.expiresAt).format(
                        "DD/MM/YYYY[ às ]HH:mm"
                      )}`}
                    </SimpleText>
                    <SizedBox height={32}></SizedBox>
                    <BoletoNumber leftAlign>
                      {data?.payment?.barCodeContent}
                    </BoletoNumber>
                  </>
                )}
              {data.payment?.method === "PEC" &&
                data?.status === "PAYMENT_PENDING" && (
                  <>
                    <SizedBox height={32}></SizedBox>
                    <HorizontalLine></HorizontalLine>
                    <SizedBox height={32}></SizedBox>
                    <Title>Pagamento Na Lotérica</Title>
                    <SizedBox height={16}></SizedBox>
                    <SimpleText size={0.9}>
                      Após pressionar o botão abaixo,
                    </SimpleText>
                    <SimpleText size={0.9}>
                      anote os dados e informe ao atendente da casa lotérica.
                    </SimpleText>
                    <SizedBox height={16}></SizedBox>
                    <CustomButton
                      onClick={() => openURL(data.payment.link)}
                      width={230}
                      type="edit"
                      icon="ticket"
                    >
                      Abrir Dados de Pagamento
                    </CustomButton>
                    <SizedBox height={16}></SizedBox>
                    <SimpleText size={0.9} color={Colors.MONEY}>
                      Dica: caso esteja no celular tire um print dos dados,
                    </SimpleText>
                    <SimpleText size={0.9} color={Colors.MONEY}>
                      caso esteja no computador, tire uma foto com o
                    </SimpleText>
                    <SimpleText size={0.9} color={Colors.MONEY}>
                      smartphone.
                    </SimpleText>
                  </>
                )}
              <SizedBox height={32}></SizedBox>
              <HorizontalLine></HorizontalLine>
              <SizedBox height={32}></SizedBox>
            </>

            <Subtitle color={Colors.SECONDARY}>{`${data.products.length} ${
              data.products.length === 1 ? "ITEM" : "ITENS"
            }`}</Subtitle>
            <SizedBox height={20}></SizedBox>
            <>
              {data.products.map((item: any, index: number) => (
                <React.Fragment key={item.id}>
                  <>
                    <CartItem
                      item={item}
                      showBackground={false}
                      showSelects={false}
                      isImmutable={true}
                    ></CartItem>
                  </>
                  {index !== data.products.length - 1 && (
                    <>
                      <SizedBox height={16}></SizedBox>
                      <HorizontalLine></HorizontalLine>
                      <SizedBox height={24}></SizedBox>
                    </>
                  )}
                </React.Fragment>
              ))}
            </>
            <SizedBox height={48}></SizedBox>
            <HorizontalLine></HorizontalLine>
            <SizedBox height={20}></SizedBox>

            {!data.isShippingFree && (
              <CartDescItem
                title="frete"
                subtitle={`${data.shipping.companyName} ${data.shipping.productName} - ${data.shipping.deliveryRangeMin} à ${data.shipping.deliveryRangeMax} dias úteis`}
              >
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(data.shipping.price)}
              </CartDescItem>
            )}
            <SizedBox height={20}></SizedBox>

            {data.isShippingFree && (
              <CartDescItem
                title="frete"
                subtitle={`${data.shipping.companyName} ${data.shipping.productName} - ${data.shipping.deliveryRangeMin} à ${data.shipping.deliveryRangeMax} dias úteis`}
              >
                <SimpleText bold color={Colors.ORANGE_PANTONE}>
                  GRÁTIS
                </SimpleText>
              </CartDescItem>
            )}
            <CartTotal>
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(data.payment.amount)}
            </CartTotal>
            {data.payment.method === "CREDIT_CARD" && (
              <>
                <SizedBox height={20}></SizedBox>
                <CartInstallments
                  singlePayment={data.payment.installments === 1 || false}
                >
                  {`${data.payment.installments}x de ${new Intl.NumberFormat(
                    "pt-BR",
                    {
                      style: "currency",
                      currency: "BRL",
                    }
                  ).format(data.payment.installmentValue)}`}
                </CartInstallments>
              </>
            )}

            <SizedBox height={20}></SizedBox>
          </>
        )}
        {!data && (
          <>
            <SizedBox height={72}></SizedBox>
            <Center>
              <LoadingAnimation size={72} color></LoadingAnimation>
            </Center>
            <SizedBox height={72}></SizedBox>
          </>
        )}
      </Padding>
    </Page>
  );
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};

export async function getStaticProps(): Promise<any> {
  function getContent(url: string) {
    return Axios.get(url);
  }

  const menuUrl = `${process.env.API_ENDPOINT}/menu`;
  const results = await Promise.all([getContent(menuUrl)]);
  const menu = results[0].data;

  return {
    props: {
      menu,
    },
    revalidate: 1440,
  };
}

export default OrderPage;
