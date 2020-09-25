import React from "react";
import styled from "styled-components";
import Colors from "../../enums/Colors";
import Card from "../Card";
import Icon from "../Icon";
import Row from "../Row";
import SimpleText from "../SimpleText";
import SizedBox from "../SizedBox";

interface IAddressItemsProps {
  _id: string;
  street: string;
  number: number;
  complement: string;
  neighborhood?: string;
  city: string;
  state: string;
  postalCode: string;
  mainAddress: boolean;
  removeAddress: (id: string) => void;
  setMainAddress: (id: string) => void;
}

const StyledAddressItem = styled.div`
  position: relative;
  max-width: 375px;
`;

const CloseButtonHolder = styled.div`
  position: absolute;
  max-width: 375px;
  top: -8px;
  right: -8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  background-color: ${Colors.WHITE};
`;

const DefaultButtonHolder = styled.div`
  position: absolute;
  max-width: 375px;
  top: -8px;
  right: 24px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  background-color: ${Colors.PRIMARY};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
`;

function AddressItem(props: IAddressItemsProps): JSX.Element {
  return (
    <StyledAddressItem>
      <Card bgColor={props.mainAddress ? Colors.PRIMARY : Colors.WHITE}>
        {!props.mainAddress && (
          <>
            <CloseButtonHolder title="Remover Endereço">
              <Icon
                type="close-red"
                onClick={() => props.removeAddress(props._id)}
              ></Icon>
            </CloseButtonHolder>
            <DefaultButtonHolder title="Definir Como Padrão">
              <Icon
                size={14}
                type="star-light"
                onClick={() => props.setMainAddress(props._id)}
              ></Icon>
            </DefaultButtonHolder>
          </>
        )}
        <Row spaceBetween>
          <SimpleText
            size={1.1}
            color={props.mainAddress ? Colors.WHITE : Colors.PRIMARY}
          >{`${props.street}, ${props.number}`}</SimpleText>
          {props.mainAddress && (
            <SimpleText size={0.8} color={Colors.MIDDLE_YELLOW}>
              PADRÃO
            </SimpleText>
          )}
        </Row>
        <SizedBox height={4}></SizedBox>
        <SimpleText color={props.mainAddress ? Colors.WHITE : Colors.PRIMARY}>
          {props.complement
            ? `${props.complement} - ${props.neighborhood}`
            : `${props.neighborhood}`}
        </SimpleText>
        <SizedBox height={8}></SizedBox>
        <Row spaceBetween>
          <SimpleText
            size={0.9}
            color={props.mainAddress ? Colors.WHITE : Colors.PRIMARY}
          >{`${props.city} - ${props.state}`}</SimpleText>
          <SimpleText
            size={0.9}
            color={props.mainAddress ? Colors.WHITE : Colors.PRIMARY}
          >{`CEP ${props.postalCode}`}</SimpleText>
        </Row>
      </Card>
    </StyledAddressItem>
  );
}

export default AddressItem;
