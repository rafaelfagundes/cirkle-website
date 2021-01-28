import { useMediaQuery } from "@material-ui/core";
import moment from "moment";
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
import theme from "../../src/theme/theme";
import { capitalizeFirstLetter } from "../../src/utils/string";

function OrderPage(): JSX.Element {
  const router = useRouter();
  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));

  const { data } = useSWR(
    router.query.id ? `/orders/${router.query.id}` : null,
    {
      revalidateOnFocus: true,
      refreshInterval: 30000,
      shouldRetryOnError: true,
      errorRetryInterval: 500,
      errorRetryCount: 10,
    }
  );

  console.log("data", data);

  const getPaymentIcon = (payment: any) => {
    if (payment?.hasOwnProperty("paymentMethodId")) {
      return "payment-cc";
    } else {
      if (payment?.payment_method_id === "bolbradesco") {
        return "payment-barcode";
      } else {
        return "ticket-dark";
      }
    }
  };

  const getPaymentType = (payment: any) => {
    if (payment?.hasOwnProperty("paymentMethodId")) {
      return "Cartão de Crédito";
    } else {
      if (payment?.payment_method_id === "bolbradesco") {
        return "Boleto Bancário";
      } else {
        return "Pagamento na Lotérica";
      }
    }
  };

  const getPaymentInstallments = (payment: any) => {
    if (payment?.hasOwnProperty("paymentMethodId")) {
      return `${payment?.installments}x ${new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(payment?.installmentValue)}`;
    } else {
      if (payment?.payment_method_id === "bolbradesco") {
        return "À vista";
      } else {
        return "À vista";
      }
    }
  };

  const getPaymentBrand = (payment: any) => {
    if (payment?.hasOwnProperty("paymentMethodId")) {
      return capitalizeFirstLetter(payment?.paymentMethodId);
    } else {
      if (payment?.payment_method_id === "bolbradesco") {
        return "";
      } else {
        return "Não precisa imprimir boleto";
      }
    }
  };

  function openURL(url: string) {
    window.open(url);
  }

  return (
    <Page
      title={data ? `Pedido #${data.orderId}` : "Pedido"}
      image="/images/orders.jpg"
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
                  icon={getPaymentIcon(data.payment.input)}
                  line1={getPaymentType(data.payment.input)}
                  line2={getPaymentInstallments(data.payment.input)}
                  line3={getPaymentBrand(data.payment.input)}
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
              {data.payment?.input?.payment_method_id === "bolbradesco" &&
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
                      onClick={() =>
                        openURL(
                          data.payment.response.transaction_details
                            .external_resource_url
                        )
                      }
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
                      {`${moment(
                        data.payment.response.date_of_expiration
                      ).format("DD/MM/YYYY[ às ]HH:mm")}`}
                    </SimpleText>
                    <SizedBox height={32}></SizedBox>
                    <BoletoNumber leftAlign>
                      {data?.payment?.response?.barcode?.content}
                    </BoletoNumber>
                  </>
                )}
              {data.payment?.input?.payment_method_id === "pec" &&
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
                      onClick={() =>
                        openURL(
                          data.payment.response.transaction_details
                            .external_resource_url
                        )
                      }
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
                subtitle={`${data.shipping.company.name} ${data.shipping.name} - ${data.shipping.custom_delivery_range.min} à ${data.shipping.custom_delivery_range.max} dias úteis`}
              >
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(data.shipping.custom_price)}
              </CartDescItem>
            )}
            <SizedBox height={20}></SizedBox>

            {data.isShippingFree && (
              <CartDescItem
                title="frete"
                subtitle={`${data.shipping.company.name} ${data.shipping.name} - ${data.shipping.custom_delivery_range.min} à ${data.shipping.custom_delivery_range.max} dias úteis`}
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
              }).format(
                data.payment.input.transaction_amount ||
                  data.payment.input.transactionAmount
              )}
            </CartTotal>
            {data.payment.input.hasOwnProperty("paymentMethodId") && (
              <>
                <SizedBox height={20}></SizedBox>
                <CartInstallments
                  singlePayment={
                    data.payment?.input?.installments === "1" || false
                  }
                >
                  {getPaymentInstallments(data.payment.input)}
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

export default OrderPage;
