import React from "react";
import Address from "../../modules/address/Address";
import AddressItem from "../AddressItem";
import Center from "../Center";
import CustomButton from "../CustomButton";
import SimpleText from "../SimpleText";
import SizedBox from "../SizedBox";
import Title from "../Title";

interface IAddressList {
  addressList: Array<Address>;
  removeAddress: (id: string) => void;
  setMainAddress: (id: string) => void;
  setShowNewAddressPanel: (value: boolean) => void;
}

function AddressList(props: IAddressList): JSX.Element {
  return (
    <>
      <SizedBox height={16}></SizedBox>
      <Title>Seus Endereços</Title>
      <SizedBox height={16}></SizedBox>

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
        <>
          <AddressItem
            _id={item._id}
            key={item.street}
            city={item.city}
            complement={item.complement}
            mainAddress={item.mainAddress}
            postalCode={item.postalCode}
            number={item.number}
            removeAddress={props.removeAddress}
            setMainAddress={props.setMainAddress}
            state={item.state}
            street={item.street}
            neighborhood={item.neighborhood}
          ></AddressItem>
          <SizedBox height={24}></SizedBox>
        </>
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
