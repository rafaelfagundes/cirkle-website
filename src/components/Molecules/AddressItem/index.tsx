import React from "react";
import styled from "styled-components";
import Colors from "../../../enums/Colors";
import Card from "../../Atoms/Card";
import CustomButton from "../../Atoms/CustomButton";
import Icon from "../../Atoms/Icon";
import LoadingAnimation from "../../Atoms/LoadingAnimation";
import Padding from "../../Atoms/Padding";
import Row from "../../Atoms/Row";
import SimpleText from "../../Atoms/SimpleText";
import SizedBox from "../../Atoms/SizedBox";

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
  loading: boolean;
}

const StyledAddressItem = styled.div`
  position: relative;
  /* width: 375px; */
  border-radius: 4px;
  border: 1px solid #eee;
`;

const CloseButtonHolder = styled.div<{ loading: boolean }>`
  position: absolute;
  max-width: 375px;
  top: -8px;
  right: -8px;
  box-shadow: ${(props) =>
    props.loading ? "none" : "0px 4px 8px rgba(0, 0, 0, 0.15)"};
  border-radius: 12px;
  background-color: ${(props) =>
    props.loading ? "transparent" : Colors.WHITE};
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
                <CloseButtonHolder
                  title="Remover Endereço"
                  loading={props.loading}
                >
                  {!props.loading && (
                    <Icon
                      type="close-red"
                      onClick={() => props.removeAddress(props.id)}
                    ></Icon>
                  )}
                  {props.loading && (
                    <LoadingAnimation size={24} color></LoadingAnimation>
                  )}
                </CloseButtonHolder>
              </span>
            )}
            <Row spaceBetween>
              <SimpleText
                size={1.1}
                color={props.mainAddress ? Colors.WHITE : Colors.PRIMARY}
              >{`${props.street}, ${props.number}`}</SimpleText>
              {props.mainAddress && (
                <SimpleText size={0.7} color={Colors.MIDDLE_YELLOW}>
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
        <Padding horizontal={10} vertical={10}>
          <Row spaceBetween>
            <CustomButton
              type="edit"
              onClick={() => props.editAddress(props.id)}
            >
              Editar
            </CustomButton>
            {!props.mainAddress && (
              <>
                <SizedBox width={20}></SizedBox>
                <CustomButton
                  onClick={() => props.setMainAddress(props.id)}
                  width={175}
                >
                  Definir Como Padrão
                </CustomButton>
              </>
            )}
          </Row>
        </Padding>
      </Card>
    </StyledAddressItem>
  );
}

export default AddressItem;
