import { useMediaQuery } from "@material-ui/core";
import _orderBy from "lodash/orderBy";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Center from "../src/components/Atoms/Center";
import LoadingAnimation from "../src/components/Atoms/LoadingAnimation";
import SizedBox from "../src/components/Atoms/SizedBox";
import Title from "../src/components/Atoms/Title";
import OrdersDesktop from "../src/components/Pages/Orders/OrdersDesktop";
import OrdersMobile from "../src/components/Pages/Orders/OrdersMobile";
import EmptyPage from "../src/components/Templates/EmptyPage";
import Page from "../src/components/Templates/Page";
import { useAuth } from "../src/hooks/auth/useAuth";
import Order, { PaymentStatus } from "../src/modules/order/Order";
import theme from "../src/theme/theme";

function getPaymentStatus(paymentStatus: string): PaymentStatus {
  switch (paymentStatus) {
    case "PAYMENT_PENDING":
      return PaymentStatus.PENDING;
    case "PAYMENT_CONFIRMED":
      return PaymentStatus.SUCCESS;
    case "PAYMENT_ERROR":
      return PaymentStatus.ERROR;

    default:
      return PaymentStatus.SUCCESS;
  }
}

function Orders(): JSX.Element {
  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();
  const authContext = useAuth();
  const [orders, setOrders] = useState([]);

  const _goTo = (route: string) => {
    router.push(route);
  };

  const { data } = useSWR(authContext.user ? "/orders" : null, {
    shouldRetryOnError: true,
    errorRetryInterval: 500,
    errorRetryCount: 10,
  });

  useEffect(() => {
    if (data && data.length) {
      const _orders: Array<Order> = [];

      data.forEach((o: any) => {
        const _order: Order = {
          date: o.created_at,
          id: o.orderId,
          items: o.products,
          payment: {
            status: getPaymentStatus(o.status),
            type: o.paymentType,
            paymentLink:
              o?.payment?.response?.transaction_details?.external_resource_url,
          },
          status: o.status,
          uid: o.uid,
        };

        _orders.push(_order);
      });

      setOrders(_orderBy(_orders, ["date"], ["desc"]));
    }
  }, [data]);

  return (
    <Page
      image="/images/orders.jpg"
      title="Meus Pedidos"
      noPadding={isSmartPhone}
    >
      <SizedBox height={20}></SizedBox>
      {data && orders.length === 0 && (
        <>
          <SizedBox height={isSmartPhone ? 48 : 72}></SizedBox>
          <EmptyPage
            buttonAction={() => _goTo("/")}
            buttonText="Explorar"
            icon="package"
            title="Nenhum Pedido"
            subtitle="Não perca tempo e explore toda nossa loja"
          ></EmptyPage>
          <SizedBox height={isSmartPhone ? 48 : 72}></SizedBox>
        </>
      )}
      {!data && (
        <>
          <SizedBox height={72}></SizedBox>
          <Center>
            <LoadingAnimation color size={72}></LoadingAnimation>
          </Center>
          <SizedBox height={36}></SizedBox>
          <Center>
            <Title>Carregando Pedidos</Title>
          </Center>
          <SizedBox height={72}></SizedBox>
        </>
      )}
      {orders.length > 0 && isSmartPhone && (
        <OrdersMobile orders={orders}></OrdersMobile>
      )}
      {orders.length > 0 && !isSmartPhone && (
        <OrdersDesktop orders={orders}></OrdersDesktop>
      )}
    </Page>
  );
}

export default Orders;
