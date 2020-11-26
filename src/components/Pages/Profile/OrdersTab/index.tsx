import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import Order, {
  OrderStatus,
  PaymentStatus,
  PaymentType,
} from "../../../../modules/order/Order";
import EmptyPage from "../../../Templates/EmptyPage";
import OrdersDesktop from "../../Orders/OrdersDesktop";

function OrdersTab(): JSX.Element {
  const order1: Order = {
    date: moment().toISOString(),
    id: "D7CED3BA",
    payment: {
      status: PaymentStatus.SUCCESS,
      type: PaymentType.CREDIT_CARD,
      paymentLink: "http://localhost:3000/meus-pedidos",
    },
    status: OrderStatus.SHIPPED,
    items: [
      {
        brand: {
          id: "213867ba-f6c3-4484-8eee-e1c1eba7db77",
          image: "",
          name: "Armani",
        },
        colors: [
          { id: "23216", name: "Preto", hexColor: "#FFF", textureImage: "" },
        ],
        description: "",
        enabled: true,
        id: "c8e5a798-9c42-4959-a03e-c60c144e2ab4",
        image: "",
        pHeight: 100,
        pLength: 100,
        pWeight: 100,
        pWidth: 100,
        price: 599,
        priceWhenNew: 1000,
        qty: 1,
        sizes: [],
        title: "Óculos",
        uid: "c8e5a798-9c42-4959-a03e-c60c144e2ab4",
        viewCount: 1,
        cartColor: "Preto",
        cartQty: 1,
        cartSize: "M",
      },
    ],
  };

  const order2: Order = {
    date: moment().toISOString(),
    id: "BB3C3C11",
    payment: {
      status: PaymentStatus.PENDING,
      type: PaymentType.PIX,
      paymentLink: "http://localhost:3000/meus-pedidos",
    },
    status: OrderStatus.PAYMENT_PENDING,
    items: [
      {
        brand: {
          id: "213867ba-f6c3-4484-8eee-e1c1eba7db77",
          image: "",
          name: "Armani",
        },
        colors: [
          { id: "23216", name: "Preto", hexColor: "#FFF", textureImage: "" },
        ],
        description: "",
        enabled: true,
        id: "ce04e9c1-96c5-4ba6-87b6-435df40a66d9",
        image: "",
        pHeight: 100,
        pLength: 100,
        pWeight: 100,
        pWidth: 100,
        price: 499,
        priceWhenNew: 1000,
        qty: 1,
        sizes: [],
        title: "Óculos",
        uid: "ce04e9c1-96c5-4ba6-87b6-435df40a66d9",
        viewCount: 1,
        cartColor: "Preto",
        cartQty: 1,
        cartSize: "M",
      },
      {
        brand: {
          id: "213867ba-f6c3-4484-8eee-e1c1eba7db77",
          image: "",
          name: "Armani",
        },
        colors: [
          { id: "23216", name: "Preto", hexColor: "#FFF", textureImage: "" },
        ],
        description: "",
        enabled: true,
        id: "a5f16353-a8f8-4e79-9516-7f338a11b369",
        image: "",
        pHeight: 100,
        pLength: 100,
        pWeight: 100,
        pWidth: 100,
        price: 299,
        priceWhenNew: 1000,
        qty: 1,
        sizes: [],
        title: "Óculos",
        uid: "a5f16353-a8f8-4e79-9516-7f338a11b369",
        viewCount: 1,
        cartColor: "Preto",
        cartQty: 1,
        cartSize: "M",
      },
    ],
  };

  const order3: Order = {
    date: moment().toISOString(),
    id: "BB3C3C11",
    payment: {
      status: PaymentStatus.ERROR,
      type: PaymentType.BOLETO,
      paymentLink: "http://localhost:3000/meus-pedidos",
    },
    status: OrderStatus.PAYMENT_ERROR,
    items: [
      {
        brand: {
          id: "213867ba-f6c3-4484-8eee-e1c1eba7db77",
          image: "",
          name: "Armani",
        },
        colors: [
          { id: "23216", name: "Preto", hexColor: "#FFF", textureImage: "" },
        ],
        description: "",
        enabled: true,
        id: "ce04e9c1-96c5-4ba6-87b6-435df40a66d9",
        image: "",
        pHeight: 100,
        pLength: 100,
        pWeight: 100,
        pWidth: 100,
        price: 512,
        priceWhenNew: 1000,
        qty: 1,
        sizes: [],
        title: "Óculos",
        uid: "ce04e9c1-96c5-4ba6-87b6-435df40a66d9",
        viewCount: 1,
        cartColor: "Preto",
        cartQty: 1,
        cartSize: "M",
      },
      {
        brand: {
          id: "213867ba-f6c3-4484-8eee-e1c1eba7db77",
          image: "",
          name: "Armani",
        },
        colors: [
          { id: "23216", name: "Preto", hexColor: "#FFF", textureImage: "" },
        ],
        description: "",
        enabled: true,
        id: "a5f16353-a8f8-4e79-9516-7f338a11b369",
        image: "",
        pHeight: 100,
        pLength: 100,
        pWeight: 100,
        pWidth: 100,
        price: 701,
        priceWhenNew: 1000,
        qty: 1,
        sizes: [],
        title: "Óculos",
        uid: "a5f16353-a8f8-4e79-9516-7f338a11b369",
        viewCount: 1,
        cartColor: "Preto",
        cartQty: 1,
        cartSize: "M",
      },
    ],
  };

  const orders: Array<Order> = [order1, order2, order3];

  const router = useRouter();

  const _goTo = (route: string) => {
    router.push(route);
  };

  return (
    <>
      {orders.length === 0 && (
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
      {orders.length > 0 && <OrdersDesktop orders={orders}></OrdersDesktop>}
    </>
  );
}

export default OrdersTab;
