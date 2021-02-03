import _orderBy from "lodash/orderBy";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { useAuth } from "../../../../hooks/auth/useAuth";
import Order, { PaymentStatus } from "../../../../modules/order/Order";
import Center from "../../../Atoms/Center";
import LoadingAnimation from "../../../Atoms/LoadingAnimation";
import SizedBox from "../../../Atoms/SizedBox";
import Title from "../../../Atoms/Title";
import EmptyPage from "../../../Templates/EmptyPage";
import OrdersDesktop from "../../Orders/OrdersDesktop";

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

function OrdersTab(): JSX.Element {
  const authContext = useAuth();

  const router = useRouter();
  const [orders, setOrders] = useState([]);

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
          date: o.date,
          id: o.id,
          items: o.items,
          payment: {
            status: getPaymentStatus(o.payment.status),
            type: o.payment.type,
            paymentLink: o.payment.paymentLink,
          },
          status: o.status,
          uid: o.uid,
        };

        _orders.push(_order);
      });

      setOrders(_orderBy(_orders, ["date"], ["desc"]));
    }
  }, [data]);

  const _goTo = (route: string) => {
    router.push(route);
  };

  return (
    <>
      {data && orders.length === 0 && (
        <>
          <EmptyPage
            buttonAction={() => _goTo("/")}
            buttonText="Explorar"
            icon="package"
            title="Nenhum Pedido"
            subtitle="Não perca tempo e explore toda nossa loja"
          ></EmptyPage>
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
      {orders.length > 0 && <OrdersDesktop orders={orders}></OrdersDesktop>}
    </>
  );
}

export default OrdersTab;
