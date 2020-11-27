import moment from "moment";
import React from "react";
import styled from "styled-components";
import Order from "../../../modules/order/Order";
import CustomButton from "../../Atoms/CustomButton";
import Padding from "../../Atoms/Padding";
import Row from "../../Atoms/Row";
import SimpleText from "../../Atoms/SimpleText";
import TitleAndData from "../../Atoms/TitleAndData";
import { calcTotal, getPayment, getStatus } from "./functions";

const OrderItem = styled.div<{ last: boolean }>`
  display: flex;
  flex-direction: column;
  /* height: 120px; */
  /* border: ${(props) => (props.last ? "none" : "1px solid #e4e4e4")}; */
  border: 1px solid #eee;
  width: 100%;
  margin-bottom: 20px;
  border-radius: 4px;
`;

const BasicInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background-color: #eee;
  padding: 10px 16px;
`;

function DesktopOrderItem({
  order,
  last = false,
}: {
  order: Order;
  last: boolean;
}): JSX.Element {
  return (
    <OrderItem last={last}>
      <BasicInfo>
        <SimpleText bold size={0.8}>{`#${order.id}`}</SimpleText>
        {getStatus(order.status, false)}
      </BasicInfo>
      <Padding horizontal={20} vertical={16}>
        <Row spaceBetween>
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
          <CustomButton
            type="default"
            variant="outlined"
            onClick={null}
            width={120}
            icon="search"
          >
            Detalhes
          </CustomButton>
        </Row>
      </Padding>
    </OrderItem>
  );
}

export default DesktopOrderItem;
