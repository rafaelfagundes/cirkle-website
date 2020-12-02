import React from "react";
import styled from "styled-components";
import Colors from "../../../enums/Colors";
import Column from "../Column";
import Icon from "../Icon";
import SimpleText from "../SimpleText";
import SizedBox from "../SizedBox";

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  /* background-color: #ff0; */
  justify-content: space-between;
`;

interface CartHeaderDataItemProps {
  icon: string;
  line1: string;
  line2: string;
  line3: string;
}

function CartHeaderDataItem(props: CartHeaderDataItemProps): JSX.Element {
  return (
    <StyledRow>
      <Icon type={props.icon}></Icon>
      <SizedBox width={10}></SizedBox>
      <Column>
        <SimpleText bold size={1}>
          {props.line1}
        </SimpleText>
        <SizedBox height={4}></SizedBox>
        <SimpleText size={0.9} color={Colors.DARK_GRAY}>
          {props.line2}
        </SimpleText>
        <SizedBox height={4}></SizedBox>
        <SimpleText size={0.9}>{props.line3}</SimpleText>
      </Column>
    </StyledRow>
  );
}

export default CartHeaderDataItem;
