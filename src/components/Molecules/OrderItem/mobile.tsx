import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import Colors from "../../../enums/Colors";
import Order from "../../../modules/order/Order";
import CustomButton from "../../Atoms/CustomButton";
import Icon from "../../Atoms/Icon";
import Row from "../../Atoms/Row";
import SizedBox from "../../Atoms/SizedBox";
import TitleAndData from "../../Atoms/TitleAndData";
import { calcTotal, getPayment, getStatus } from "./functions";

const OrderItem = styled.div`
  margin-bottom: 16px;
`;

const OrderHeader = styled.div`
  height: 30px;
  background-color: #eee;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
`;
const OrderID = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-width: 95px;
`;
const OrderData = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const OrderStatus = styled.div``;
const Text = styled.div`
  font-family: Commissioner, sans-serif;
  font-size: 12px;
  line-height: 12px;
  font-weight: 700;
  color: ${Colors.PRIMARY};
  margin-left: 5px;
`;

const OrderContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #eee;
  background-color: #fff;
  /* box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05); */
`;

function MobileOrdemItem({ order }: { order: Order }): JSX.Element {
  const router = useRouter();

  return (
    <OrderItem>
      <OrderHeader>
        <Row>
          <OrderID>
            <Icon type="package" size={16}></Icon>
            <Text>{order.id}</Text>
          </OrderID>
          <OrderData>
            <Icon type="calendar" size={16}></Icon>
            <Text>{moment(order.date).format("DD/MM/yyyy")}</Text>
          </OrderData>
        </Row>
        <OrderStatus>{getStatus(order.status, true)}</OrderStatus>
      </OrderHeader>
      <OrderContent>
        <Row spaceBetween>
          <TitleAndData title="Qtd" minWidth={30} dataCentered>
            {order.items.length.toString()}
          </TitleAndData>
          <TitleAndData title="Total" minWidth={80}>
            {calcTotal(order.items)}
          </TitleAndData>
          <TitleAndData title="Pagamento" minWidth={120}>
            {getPayment(order.payment)}
          </TitleAndData>
        </Row>
        <SizedBox width={20}></SizedBox>
        <CustomButton
          onClick={() => router.push(`/pedidos/${order.uid}`)}
          width={75}
          type="default"
          variant="outlined"
          icon="search"
        >
          Ver
        </CustomButton>
      </OrderContent>
    </OrderItem>
  );
}

export default MobileOrdemItem;
