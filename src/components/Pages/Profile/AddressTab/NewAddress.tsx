import Axios from "axios";
import _cloneDeep from "lodash/cloneDeep";
import React, { useEffect, useRef, useState } from "react";
import validator from "validator";
import Address from "../../../../modules/address/Address";
import CustomButton from "../../../Atoms/CustomButton";
import CustomTextField from "../../../Atoms/CustomTextField";
import LoadingAnimation from "../../../Atoms/LoadingAnimation";
import Row from "../../../Atoms/Row";
import SimpleText from "../../../Atoms/SimpleText";
import SizedBox from "../../../Atoms/SizedBox";
import Title from "../../../Atoms/Title";

function NewAddress({
  loading,
  addAddress,
  updateAddress,
  cancelAddAddress,
  editAddressObj,
}: {
  loading: boolean;
  addAddress: (address: Address) => void;
  updateAddress: (address: Address) => void;
  cancelAddAddress: () => void;
  editAddressObj: Address;
}): JSX.Element {
  const [loadingPostalCode, setLoadingPostalCode] = useState(false);

  const street = useRef(null);
  const number = useRef(null);
  const complement = useRef(null);
  const neighborhood = useRef(null);
  const city = useRef(null);
  const state = useRef(null);
  const postalCode = useRef(null);

  const _fillFields = () => {
    console.log("Preenchendo campos...");
    street.current.children[0].value = editAddressObj.street;
    number.current.children[0].value = editAddressObj.number;
    complement.current.children[0].value = editAddressObj.complement;
    neighborhood.current.children[0].value = editAddressObj.neighborhood;
    city.current.children[0].value = editAddressObj.city;
    state.current.children[0].value = editAddressObj.state;
    postalCode.current.children[0].value = editAddressObj.postalCode;
  };

  useEffect(() => {
    let editFillInterval: number;
    if (editAddressObj) {
      editFillInterval = setInterval(() => {
        if (
          street &&
          number &&
          complement &&
          neighborhood &&
          city &&
          state &&
          postalCode
        ) {
          _fillFields();
          clearInterval(editFillInterval);
        }
      }, 100);
    }

    return () => {
      clearInterval(editFillInterval);
    };
  }, []);

  // if (editAddressObj) _fillFields();

  const addressErrorsTemplate = {
    postalCode: "",
    street: "",
    number: "",
    neighborhood: "",
    city: "",
    state: "",
  };

  const [addressErrors, setAddressErrors] = useState(
    _cloneDeep(addressErrorsTemplate)
  );

  const _setAddress = (address: Address) => {
    street.current.children[0].value = address.street;
    neighborhood.current.children[0].value = address.neighborhood;
    city.current.children[0].value = address.city;
    state.current.children[0].value = address.state;
  };

  const _clearAddress = () => {
    street.current.children[0].value = "";
    neighborhood.current.children[0].value = "";
    city.current.children[0].value = "";
    state.current.children[0].value = "";
  };

  useEffect(() => {
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
                  id: null,
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
    }, 250);

    return () => {
      clearInterval(postalCodeInterval);
    };
  }, []);

  const _validate = () => {
    const _errors = _cloneDeep(addressErrorsTemplate);
    let _errorsCount = 0;
    setAddressErrors(_errors);

    const _street = street.current?.children[0].value;
    const _number = number.current?.children[0].value;
    const _neighborhood = neighborhood.current?.children[0].value;
    const _city = city.current?.children[0].value;
    const _state = state.current?.children[0].value;
    const _postalCode = postalCode.current?.children[0].value;

    if (validator.isEmpty(_street)) {
      _errorsCount++;
      _errors.street = "Por favor, preencha a rua.";
    }
    if (validator.isEmpty(_number)) {
      _errorsCount++;
      _errors.number = "Por favor, preencha o número da residência.";
    } else if (!validator.isNumeric(_number)) {
      _errorsCount++;
      _errors.number =
        'Por favor, preencha somente números. Para outras informações use o campo "complemento".';
    }
    if (validator.isEmpty(_neighborhood)) {
      _errorsCount++;
      _errors.neighborhood = "Por favor, preencha o bairro.";
    }
    if (validator.isEmpty(_city)) {
      _errorsCount++;
      _errors.city = "Por favor, preencha a cidade.";
    }
    if (validator.isEmpty(_state)) {
      _errorsCount++;
      _errors.state = "Por favor, preencha o estado.";
    } else if (!validator.isLength(_state, { min: 2, max: 2 })) {
      _errorsCount++;
      _errors.state =
        "Por favor, preencha somente a sigla do estado. Exemplo: MG.";
    }
    if (validator.isEmpty(_postalCode)) {
      _errorsCount++;
      _errors.postalCode = "Por favor, preencha o CEP.";
    } else if (!validator.isNumeric(_postalCode.replace("-", ""))) {
      _errorsCount++;
      _errors.postalCode = "Por favor, informe somente números no CEP";
    } else if (!validator.isLength(_postalCode, { min: 9, max: 9 })) {
      _errorsCount++;
      _errors.postalCode = "Por favor, informe o CEP no formato:  12345-123.";
    }

    if (_errorsCount) {
      setAddressErrors(_errors);
      return false;
    } else {
      return true;
    }
  };

  const _add = () => {
    if (!_validate()) return false;
    const address: Address = {
      id: null,
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

  const _edit = () => {
    if (!_validate()) return false;
    const address: Address = {
      id: editAddressObj.id,
      mainAddress: editAddressObj.mainAddress,
      street: street.current.children[0].value,
      number: number.current.children[0].value,
      complement: complement.current.children[0].value,
      neighborhood: neighborhood.current.children[0].value,
      city: city.current.children[0].value,
      state: state.current.children[0].value,
      postalCode: postalCode.current.children[0].value,
    };

    updateAddress(address);
  };

  return (
    <>
      <SizedBox height={20}></SizedBox>
      <Title>
        {editAddressObj ? "Editar Endereço" : "Cadastrar Novo Endereço"}
      </Title>
      <SizedBox height={20}></SizedBox>
      {!editAddressObj && (
        <>
          <SimpleText>
            Informe o CEP abaixo, tentaremos preencher os campos para você
            automaticamente
          </SimpleText>
        </>
      )}
      <SizedBox height={20}></SizedBox>
      <Row>
        <span data-test="address-postalCode">
          <CustomTextField
            type="postalCode"
            ref={postalCode}
            error={addressErrors.postalCode}
            width={120}
          >
            CEP*
          </CustomTextField>
        </span>
        <SizedBox width={8}></SizedBox>
        {loadingPostalCode && (
          <LoadingAnimation size={36} color={true}></LoadingAnimation>
        )}
      </Row>
      <SizedBox height={20}></SizedBox>
      <span data-test="address-street">
        <CustomTextField ref={street} error={addressErrors.street}>
          Logradouro (Rua, Avenida, Alameda, etc)*
        </CustomTextField>
      </span>
      <SizedBox height={20}></SizedBox>
      <span data-test="address-number">
        <CustomTextField ref={number} error={addressErrors.number} width={100}>
          Número*
        </CustomTextField>
      </span>
      <SizedBox height={20}></SizedBox>
      <span data-test="address-complement">
        <CustomTextField ref={complement}>Complemento</CustomTextField>
      </span>
      <SizedBox height={20}></SizedBox>
      <span data-test="address-neighborhood">
        <CustomTextField ref={neighborhood} error={addressErrors.neighborhood}>
          Bairro*
        </CustomTextField>
      </span>
      <SizedBox height={20}></SizedBox>
      <span data-test="address-city">
        <CustomTextField ref={city} error={addressErrors.city}>
          Cidade*
        </CustomTextField>
      </span>
      <SizedBox height={20}></SizedBox>
      <span data-test="address-state">
        <CustomTextField ref={state} error={addressErrors.state}>
          Sigla do Estado*
        </CustomTextField>
      </span>

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
        <SizedBox width={20}></SizedBox>
        <CustomButton
          width={300}
          type="primary"
          variant="contained"
          onClick={editAddressObj ? _edit : _add}
          loading={loading}
        >
          {editAddressObj ? "Salvar" : "Adicionar"}
        </CustomButton>
      </Row>
    </>
  );
}

export default NewAddress;
