import moment from "moment";
import React from "react";
import styled from "styled-components";
import Order from "../../../modules/order/Order";
import CustomButton from "../../Atoms/CustomButton";
import Icon from "../../Atoms/Icon";
import Row from "../../Atoms/Row";
import SizedBox from "../../Atoms/SizedBox";
import TitleAndData from "../../Atoms/TitleAndData";
import { calcTotal, getPayment, getStatus } from "./functions";

const OrderItem = styled(Row)<{ last: boolean }>`
  height: 80px;
  border-bottom: ${(props) => (props.last ? "none" : "1px solid #e4e4e4")};
`;

function DesktopOrderItem({
  order,
  last = false,
}: {
  order: Order;
  last: boolean;
}): JSX.Element {
  return (
    <OrderItem spaceBetween last={last}>
      <Row>
        <Icon type="shipping-package" size={32}></Icon>
        <SizedBox width={20}></SizedBox>
        <TitleAndData title="ID#" minWidth={93}>
          {order.id}
        </TitleAndData>
        <TitleAndData title="Data" minWidth={134}>
          {moment(order.date).format("DD/MM/yyyy HH:mm")}
        </TitleAndData>
        <TitleAndData title="Qtd" dataCentered minWidth={47}>
          {order.items.length.toString()}
        </TitleAndData>
        <TitleAndData title="Total" minWidth={93}>
          {calcTotal(order.items)}
        </TitleAndData>
        <TitleAndData title="Pagamento" minWidth={140}>
          {getPayment(order.payment)}
        </TitleAndData>
        <TitleAndData title="Status">
          {getStatus(order.status, false)}
        </TitleAndData>
        <SizedBox width={20}></SizedBox>
      </Row>
      <CustomButton
        type="default"
        variant="outlined"
        onClick={null}
        width={120}
      >
        Detalhes
      </CustomButton>
    </OrderItem>
  );
}

export default DesktopOrderItem;
