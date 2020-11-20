import React from "react";
import Order from "../../../../modules/order/Order";
import OrderItem from "../../../Molecules/OrderItem";

interface OrdersDesktopProps {
  orders: Array<Order>;
}

function OrdersDesktop(props: OrdersDesktopProps): JSX.Element {
  return (
    <div>
      {props.orders.map((order, index) => (
        <OrderItem
          key={order.id}
          order={order}
          last={index === props.orders.length - 1}
        ></OrderItem>
      ))}
    </div>
  );
}

export default OrdersDesktop;
