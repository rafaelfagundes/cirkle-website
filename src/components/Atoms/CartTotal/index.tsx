import React from "react";
import Colors from "../../../enums/Colors";
import Row from "../Row";
import SimpleText from "../SimpleText";

function CartTotal({ children }: { children: string }): JSX.Element {
  return (
    <Row spaceBetween>
      <SimpleText bold size={1.1}>
        TOTAL
      </SimpleText>
      <SimpleText bold color={Colors.MONEY} size={1.1}>
        {children}
      </SimpleText>
    </Row>
  );
}

export default CartTotal;
