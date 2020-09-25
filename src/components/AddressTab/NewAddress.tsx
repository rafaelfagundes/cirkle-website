import Axios from "axios";
import _ from "lodash";
import React, { useRef, useState } from "react";
import Address from "../../modules/address/Address";
import CustomButton from "../CustomButton";
import CustomTextField from "../CustomTextField";
import LoadingAnimation from "../LoadingAnimation";
import Row from "../Row";
import SimpleText from "../SimpleText";
import SizedBox from "../SizedBox";
import Title from "../Title";

function NewAddress({
  addAddress,
  cancelAddAddress,
}: {
  addAddress: (address: Address) => void;
  cancelAddAddress: () => void;
}): JSX.Element {
  const [loadingPostalCode, setLoadingPostalCode] = useState(false);

  const street = useRef(null);
  const number = useRef(null);
  const complement = useRef(null);
  const neighborhood = useRef(null);
  const city = useRef(null);
  const state = useRef(null);
  const postalCode = useRef(null);

  const addressErrorsTemplate = {
    street: "",
    number: "",
    neighborhood: "",
    city: "",
    state: "",
    postalCode: "",
  };

  const [addressErrors, setAddressErrors] = useState(
    _.cloneDeep(addressErrorsTemplate)
  );

  const _setAddress = (address: Address) => {
    street.current.children[0].value = address.street;
    neighborhood.current.children[0].value = address.neighborhood;
    city.current.children[0].value = address.city;
    state.current.children[0].value = address.state;

    number.current.children[0].focus();
  };

  const _clearAddress = () => {
    street.current.children[0].value = "";
    neighborhood.current.children[0].value = "";
    city.current.children[0].value = "";
    state.current.children[0].value = "";
  };

  React.useEffect(() => {
    let _postalCode = "";
    const postalCodeInterval = setInterval(async () => {
      if (postalCode?.current?.children[0].value) {
        if (
          postalCode?.current?.children[0].value.length === "12345-123".length
        ) {
          if (postalCode.current.children[0].value !== _postalCode) {
            try {
              _postalCode = postalCode.current.children[0].value;

              const url = `https://brasilapi.com.br/api/cep/v1/${_postalCode.replace(
                "-",
                ""
              )}`;
              setLoadingPostalCode(true);
              const result = await Axios.get(url);
              if (result) {
                const { cep, state, city, neighborhood, street } = result.data;

                const address: Address = {
                  postalCode: cep,
                  number: 0,
                  state,
                  city,
                  neighborhood,
                  street,
                };

                _setAddress(address);
                setLoadingPostalCode(false);
              }
            } catch (error) {
              setLoadingPostalCode(false);
            }
          }
        } else {
          _clearAddress();
        }
      }
    }, 1000);

    return () => {
      clearInterval(postalCodeInterval);
    };
  }, []);

  const _add = () => {
    const address: Address = {
      street: street.current.children[0].value,
      number: number.current.children[0].value,
      complement: complement.current.children[0].value,
      neighborhood: neighborhood.current.children[0].value,
      city: city.current.children[0].value,
      state: state.current.children[0].value,
      postalCode: postalCode.current.children[0].value,
    };

    addAddress(address);
  };

  return (
    <>
      <SizedBox height={16}></SizedBox>
      <Title>Cadastrar Novo Endereço</Title>
      <SizedBox height={16}></SizedBox>
      <SimpleText>
        Informe o CEP abaixo, tentaremos preencher os campos para você
        automaticamente
      </SimpleText>
      <SizedBox height={16}></SizedBox>
      <Row>
        <CustomTextField
          type="postalCode"
          ref={postalCode}
          error={addressErrors.postalCode}
          width={120}
        >
          CEP*
        </CustomTextField>
        <SizedBox width={8}></SizedBox>
        {loadingPostalCode && (
          <LoadingAnimation size={36} color={true}></LoadingAnimation>
        )}
      </Row>
      <SizedBox height={16}></SizedBox>
      <CustomTextField ref={street} error={addressErrors.street}>
        Logradouro (Rua, Avenida, Alameda, etc)*
      </CustomTextField>
      <SizedBox height={16}></SizedBox>
      <CustomTextField ref={number} error={addressErrors.number} width={100}>
        Número*
      </CustomTextField>
      <SizedBox height={16}></SizedBox>
      <CustomTextField ref={complement}>Complemento</CustomTextField>
      <SizedBox height={16}></SizedBox>
      <CustomTextField ref={neighborhood} error={addressErrors.neighborhood}>
        Bairro*
      </CustomTextField>
      <SizedBox height={16}></SizedBox>
      <CustomTextField ref={city} error={addressErrors.city}>
        Cidade*
      </CustomTextField>
      <SizedBox height={16}></SizedBox>
      <CustomTextField ref={state} error={addressErrors.state}>
        Estado*
      </CustomTextField>

      <SizedBox height={36}></SizedBox>
      <Row>
        <CustomButton
          width={300}
          type="delete"
          variant="text"
          onClick={cancelAddAddress}
        >
          Cancelar
        </CustomButton>
        <SizedBox width={16}></SizedBox>
        <CustomButton
          width={300}
          type="primary"
          variant="contained"
          onClick={_add}
        >
          Adicionar
        </CustomButton>
      </Row>
    </>
  );
}

export default NewAddress;
