import { useMediaQuery } from "@material-ui/core";
import React from "react";
import Colors from "../../../enums/Colors";
import theme from "../../../theme/theme";
import Column from "../Column";
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
  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Row spaceBetween>
      {isSmartPhone && (
        <Column>
          <SimpleText>{title.toUpperCase()}</SimpleText>
          {subtitle && (
            <>
              <SizedBox height={2}></SizedBox>
              <SimpleText color={Colors.GRAY} size={0.9}>
                {subtitle}
              </SimpleText>
            </>
          )}
        </Column>
      )}
      {!isSmartPhone && (
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
      )}
      <SimpleText bold color={negative ? Colors.SECONDARY : Colors.PRIMARY}>
        {`${negative ? "-" : ""}${children}`}
      </SimpleText>
    </Row>
  );
}

export default CartDescItem;
