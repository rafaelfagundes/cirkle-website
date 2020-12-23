import React from "react";
import Colors from "../../../enums/Colors";
import Row from "../Row";
import SimpleText from "../SimpleText";

function CartInstallments({
  children,
  singlePayment,
}: {
  children: string;
  singlePayment: boolean;
}): JSX.Element {
  return (
    <Row spaceBetween>
      <SimpleText bold size={1}>
        {singlePayment ? "À VISTA" : "PARCELAMENTO"}
      </SimpleText>
      <SimpleText bold color={Colors.MONEY} size={1}>
        {children}
      </SimpleText>
    </Row>
  );
}

export default CartInstallments;
