import React from "react";
import Address from "../../../modules/address/Address";
import AddressItem from "../../AddressItem";
import Center from "../../Center";
import CustomButton from "../../CustomButton";
import SimpleText from "../../SimpleText";
import SizedBox from "../../SizedBox";

interface IAddressList {
  addressList: Array<Address>;
  removeAddress: (id: string) => void;
  editAddress: (id: string) => void;
  setMainAddress: (id: string) => void;
  setShowNewAddressPanel: (value: boolean) => void;
}

function AddressList(props: IAddressList): JSX.Element {
  return (
    <>
      {props.addressList.length === 0 && (
        <>
          <Center>
            <SimpleText>
              Nenhum endereço cadastrado. Salve um endereço para facilitar as
              futuras compras.
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
          ></AddressItem>
          <SizedBox height={24}></SizedBox>
        </span>
      ))}

      <SizedBox height={16}></SizedBox>
      <Center>
        <CustomButton
          width={300}
          type="primary"
          variant="outlined"
          onClick={() => props.setShowNewAddressPanel(true)}
        >
          Adicionar Endereço
        </CustomButton>
      </Center>
    </>
  );
}

export default AddressList;
