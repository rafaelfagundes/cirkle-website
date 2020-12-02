import Axios from "axios";
import Cleave from "cleave.js/react";
import _cloneDeep from "lodash/cloneDeep";
import React, { useEffect, useRef, useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import styled from "styled-components";
import Colors from "../../../../enums/Colors";
import { useCart } from "../../../../hooks/cart/useCart";
import Address from "../../../../modules/address/Address";
import CheckBoxWithLabel from "../../../Atoms/CheckboxWithLabel";
import Column from "../../../Atoms/Column";
import CustomTextField from "../../../Atoms/CustomTextField";
import LoadingAnimation from "../../../Atoms/LoadingAnimation";
import Row from "../../../Atoms/Row";
import SelectMenu, { AssetType } from "../../../Atoms/SelectMenu";
import SizedBox from "../../../Atoms/SizedBox";
import Subtitle from "../../../Atoms/Subtitle";

const PaymentForm = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const InputFrame = styled.div`
  padding: 10px;
  border: 2px solid ${Colors.PRIMARY};
  max-width: 310px;
  border-radius: 4px;
`;

const CardNumber = styled(Cleave)`
  border: none;
  outline: none;
  font-family: Commissioner, sans-serif;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  width: 100%;
`;

const CardHolder = styled.input`
  border: none;
  outline: none;
  font-family: Commissioner, sans-serif;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  width: 100%;
`;

const ExpirationDate = styled(Cleave)`
  border: none;
  outline: none;
  font-family: Commissioner, sans-serif;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  max-width: 120px;
`;

const CVC = styled.input`
  border: none;
  outline: none;
  font-family: Commissioner, sans-serif;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  max-width: 120px;
`;

const BillingAddress = styled.div`
  max-width: 618px;
`;

function CreditCard(): JSX.Element {
  const cartContext = useCart();

  const [name, setName] = useState("");
  const [cvc, setCvc] = useState("");
  const [focused, setFocused] = useState(null);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");

  const [loadingPostalCode, setLoadingPostalCode] = useState(false);

  const [billingAddressIsDifferent, setBillingAddressIsDifferent] = useState(
    false
  );

  const [monthPayments, setMonthPayments] = useState([
    {
      text: `1x de ${new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(cartContext.cart.total)} (À Vista)`,
      value: 1,
      selected: true,
      assetType: AssetType.NONE,
    },
    {
      text: `2x de ${new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(cartContext.cart.total / 2)} (Sem Juros)`,
      value: 2,
      selected: false,
      assetType: AssetType.NONE,
    },
    {
      text: `3x de ${new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(cartContext.cart.total / 3)} (Sem Juros)`,
      value: 3,
      selected: false,
      assetType: AssetType.NONE,
    },
    {
      text: `4x de ${new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(cartContext.cart.total / 4)} (Sem Juros)`,
      value: 4,
      selected: false,
      assetType: AssetType.NONE,
    },
    {
      text: `5x de ${new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(cartContext.cart.total / 5)} (Sem Juros)`,
      value: 5,
      selected: false,
      assetType: AssetType.NONE,
    },
    {
      text: `6x de ${new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(cartContext.cart.total / 6)} (Sem Juros)`,
      value: 6,
      selected: false,
      assetType: AssetType.NONE,
    },
  ]);

  const street = useRef(null);
  const number = useRef(null);
  const complement = useRef(null);
  const neighborhood = useRef(null);
  const city = useRef(null);
  const state = useRef(null);
  const postalCode = useRef(null);

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

  const _setPostalCode = (address: Address) => {
    cartContext.setShipping({
      id: null,
      postalCode: address.postalCode,
      type: null,
      value: null,
    });
  };

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
                _setPostalCode(address);
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

  return (
    <div>
      <Subtitle color={Colors.SECONDARY}>CARTÃO DE CRÉDITO OU DÉBITO</Subtitle>
      <SizedBox height={20}></SizedBox>
      <PaymentForm>
        <Cards
          cvc={cvc}
          expiry={expiry}
          focused={focused}
          name={name}
          number={cardNumber}
          locale={{ valid: "Validade" }}
          placeholders={{ name: "SEU NOME" }}
        />
        <SizedBox width={20}></SizedBox>
        <Column>
          <InputFrame>
            <CardNumber
              options={{ creditCard: true }}
              name="number"
              placeholder="Número Do Cartão"
              value={cardNumber}
              onChange={(e: any) => setCardNumber(e.target.value)}
              onFocus={(e: any) => setFocused(e.target.name)}
              maxLength={19}
            />
          </InputFrame>
          <SizedBox height={20}></SizedBox>
          <InputFrame>
            <CardHolder
              type="text"
              name="name"
              placeholder="Seu Nome Como No Cartão"
              onChange={(e) => setName(e.target.value)}
              onFocus={(e) => setFocused(e.target.name)}
            />
          </InputFrame>
          <SizedBox height={20}></SizedBox>
          <Row>
            <InputFrame>
              <ExpirationDate
                options={{ date: true, datePattern: ["m", "y"] }}
                type="tel"
                name="expiry"
                placeholder="Validade"
                onChange={(e) => setExpiry(e.target.value)}
                onFocus={(e) => setFocused(e.target.name)}
              />
            </InputFrame>
            <SizedBox width={20}></SizedBox>
            <InputFrame>
              <CVC
                type="tel"
                name="cvc"
                placeholder="CVC"
                onChange={(e) => setCvc(e.target.value)}
                onFocus={(e) => setFocused(e.target.name)}
                maxLength={4}
              />
            </InputFrame>
          </Row>
        </Column>
      </PaymentForm>
      <SizedBox height={32}></SizedBox>
      <SelectMenu
        items={monthPayments}
        setSelected={setMonthPayments}
        title="Parcelamento"
        errorText=""
      ></SelectMenu>
      <SizedBox height={20}></SizedBox>
      <CheckBoxWithLabel
        value={billingAddressIsDifferent}
        onClick={() => setBillingAddressIsDifferent(!billingAddressIsDifferent)}
        label="O endereço de faturamento é diferente do endereço de entrega"
      ></CheckBoxWithLabel>
      <SizedBox height={20}></SizedBox>
      {billingAddressIsDifferent && (
        <BillingAddress>
          <Subtitle color={Colors.SECONDARY}>
            Preencha o endereço de cobrança
          </Subtitle>
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
            <CustomTextField
              ref={number}
              error={addressErrors.number}
              width={100}
            >
              Número*
            </CustomTextField>
          </span>
          <SizedBox height={20}></SizedBox>
          <span data-test="address-complement">
            <CustomTextField ref={complement}>Complemento</CustomTextField>
          </span>
          <SizedBox height={20}></SizedBox>
          <span data-test="address-neighborhood">
            <CustomTextField
              ref={neighborhood}
              error={addressErrors.neighborhood}
            >
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
          <SizedBox height={20}></SizedBox>
        </BillingAddress>
      )}
    </div>
  );
}

export default CreditCard;
