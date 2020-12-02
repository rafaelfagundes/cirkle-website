import React from "react";
import Colors from "../../../enums/Colors";
import Row from "../Row";
import SimpleText from "../SimpleText";
import SizedBox from "../SizedBox";

function CartDescItem({
  title,
  subtitle,
  negative,
  children,
}: {
  title: string;
  subtitle?: string;
  negative?: boolean;
  children: string;
}): JSX.Element {
  return (
    <Row spaceBetween>
      <Row>
        <SimpleText>{title.toUpperCase()}</SimpleText>
        {subtitle && (
          <>
            <SizedBox width={10}></SizedBox>
            <SimpleText color={Colors.GRAY} size={0.9}>
              {subtitle}
            </SimpleText>
          </>
        )}
      </Row>
      <SimpleText bold color={negative ? Colors.SECONDARY : Colors.PRIMARY}>
        {`${negative ? "-" : ""}${children}`}
      </SimpleText>
    </Row>
  );
}

export default CartDescItem;
