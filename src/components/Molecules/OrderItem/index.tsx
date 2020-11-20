import { useMediaQuery } from "@material-ui/core";
import React from "react";
import Order from "../../../modules/order/Order";
import theme from "../../../theme/theme";
import DesktopOrderItem from "./desktop";
import MobileOrdemItem from "./mobile";

function OrderItem({
  order,
  last,
}: {
  order: Order;
  last: boolean;
}): JSX.Element {
  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      {isSmartPhone && <MobileOrdemItem order={order}></MobileOrdemItem>}
      {!isSmartPhone && (
        <DesktopOrderItem order={order} last={last}></DesktopOrderItem>
      )}
    </>
  );
}

export default OrderItem;
