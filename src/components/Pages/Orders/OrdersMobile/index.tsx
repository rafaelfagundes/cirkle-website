import React from "react";
import Order from "../../../../modules/order/Order";
import SizedBox from "../../../Atoms/SizedBox";
import OrderItem from "../../../Molecules/OrderItem";

interface OrdersMobileProps {
  orders: Array<Order>;
}

function OrdersMobile(props: OrdersMobileProps): JSX.Element {
  return (
    <div>
      <SizedBox height={20}></SizedBox>
      {props.orders.map((order) => (
        <OrderItem key={order.id} order={order} last={false}></OrderItem>
      ))}
    </div>
  );
}

export default OrdersMobile;
