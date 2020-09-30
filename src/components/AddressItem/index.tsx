import React from "react";
import styled from "styled-components";
import Colors from "../../enums/Colors";
import Card from "../Card";
import CustomButton from "../CustomButton";
import Icon from "../Icon";
import Padding from "../Padding";
import Row from "../Row";
import SimpleText from "../SimpleText";
import SizedBox from "../SizedBox";

interface IAddressItemsProps {
  id: string;
  street: string;
  number: number;
  complement: string;
  neighborhood?: string;
  city: string;
  state: string;
  postalCode: string;
  mainAddress: boolean;
  removeAddress: (id: string) => void;
  editAddress: (id: string) => void;
  setMainAddress: (id: string) => void;
}

const StyledAddressItem = styled.div`
  position: relative;
  /* width: 375px; */
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

function AddressItem(props: IAddressItemsProps): JSX.Element {
  return (
    <StyledAddressItem>
      <Card
        bgColor={props.mainAddress ? Colors.PRIMARY : Colors.WHITE}
        padding={false}
      >
        <Padding horizontal={20} vertical={20}>
          <>
            {!props.mainAddress && (
              <span data-test="address-remove-button">
                <CloseButtonHolder title="Remover Endereço">
                  <Icon
                    type="close-red"
                    onClick={() => props.removeAddress(props.id)}
                  ></Icon>
                </CloseButtonHolder>
              </span>
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
            <SimpleText
              color={props.mainAddress ? Colors.WHITE : Colors.PRIMARY}
            >
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
          </>
        </Padding>
        <Row spaceBetween>
          <CustomButton
            type="edit"
            onClick={() => props.editAddress(props.id)}
            width={400}
          >
            Editar
          </CustomButton>
          {!props.mainAddress && (
            <CustomButton
              onClick={() => props.setMainAddress(props.id)}
              width={400}
            >
              Definir Padrão
            </CustomButton>
          )}
        </Row>
      </Card>
    </StyledAddressItem>
  );
}

export default AddressItem;
