import React from "react";
import Address from "../../../../modules/address/Address";
import Center from "../../../Atoms/Center";
import CustomButton from "../../../Atoms/CustomButton";
import SimpleText from "../../../Atoms/SimpleText";
import SizedBox from "../../../Atoms/SizedBox";
import AddressItem from "../../../Molecules/AddressItem";

interface IAddressList {
  addressList: Array<Address>;
  removeAddress: (id: string) => void;
  editAddress: (id: string) => void;
  setMainAddress: (id: string) => void;
  setShowNewAddressPanel: (value: boolean) => void;
  loading: boolean;
}

function AddressList(props: IAddressList): JSX.Element {
  return (
    <>
      {props.addressList.length === 0 && (
        <>
          <Center>
            <SimpleText>Nenhum endereço cadastrado.</SimpleText>
          </Center>
          <Center>
            <SimpleText>
              Salve um endereço para facilitar futuras compras.
            </SimpleText>
          </Center>
          <SizedBox height={16}></SizedBox>
        </>
      )}

      {props.addressList.map((item) => (
        <span key={item.street}>
          <AddressItem
            id={item.id}
            city={item.city}
            complement={item.complement}
            mainAddress={item.mainAddress}
            postalCode={item.postalCode}
            number={item.number}
            removeAddress={props.removeAddress}
            setMainAddress={props.setMainAddress}
            editAddress={props.editAddress}
            state={item.state}
            street={item.street}
            neighborhood={item.neighborhood}
            loading={props.loading}
          ></AddressItem>
          <SizedBox height={24}></SizedBox>
        </span>
      ))}

      <SizedBox height={16}></SizedBox>
      <Center>
        <CustomButton
          width={180}
          type="primary"
          variant="outlined"
          onClick={() => props.setShowNewAddressPanel(true)}
        >
          + Adicionar Endereço
        </CustomButton>
      </Center>
    </>
  );
}

export default AddressList;
