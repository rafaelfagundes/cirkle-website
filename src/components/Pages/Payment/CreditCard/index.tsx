import { useMediaQuery } from "@material-ui/core";
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
import theme from "../../../../theme/theme";
import CheckBoxWithLabel from "../../../Atoms/CheckboxWithLabel";
import Column from "../../../Atoms/Column";
import CustomTextField from "../../../Atoms/CustomTextField";
import LoadingAnimation from "../../../Atoms/LoadingAnimation";
import RadioButton from "../../../Atoms/RadioButton";
import Row from "../../../Atoms/Row";
import SelectMenu, { AssetType, SelectItem } from "../../../Atoms/SelectMenu";
import SimpleText from "../../../Atoms/SimpleText";
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
  max-width: 290px;
  border-radius: 4px;
`;

const CardContainer = styled.div`
  width: 290px;
  margin-right: 20px;
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

const CPF = styled(Cleave)`
  border: none;
  outline: none;
  font-family: Commissioner, sans-serif;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  width: 80%;
`;

const CNPJ = styled(Cleave)`
  border: none;
  outline: none;
  font-family: Commissioner, sans-serif;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  width: 80%;
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
  max-width: 102px;
`;

const BillingAddress = styled.div`
  max-width: 618px;
`;

const CardAndForm = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

function CreditCard(): JSX.Element {
  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));

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
  const [installmentsSelect, setInstallmentsSelect] = useState([]);
  const [documents, setDocuments] = useState([]);
  let cardData;

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

  function getIssuers(paymentMethodId: number) {
    window["Mercadopago"].getIssuers(paymentMethodId, setIssuers);
  }

  function getInstallments(
    payment_method_id: number,
    amount: number,
    issuer_id: number
  ) {
    window["Mercadopago"].getInstallments(
      {
        payment_method_id,
        amount,
        issuer_id,
      },
      setInstallments
    );
  }

  const setIssuers = (status: number, response: any) => {
    if (status === 200) {
      let issuerId = response[0].id;

      if (response.length > 1) {
        issuerId = response.filter((o: any) => o.name === "Outro")[0].id;
      }

      if (cardData?.id) {
        getInstallments(cardData.id, cartContext.cart.total, issuerId);
      }
    }
  };

  function setInstallments(status: number, response: any) {
    if (status === 200) {
      const _installments: Array<SelectItem> = [];

      response[0].payer_costs.forEach((installment: any, index: number) => {
        _installments.push({
          text: `${installment.installments}x de ${new Intl.NumberFormat(
            "pt-BR",
            {
              style: "currency",
              currency: "BRL",
            }
          ).format(installment.installment_amount)}`,
          value: installment.installments,
          selected: index === 0 ? true : false,
          assetType: AssetType.IMAGE,
          assetValue: response[0].issuer.secure_thumbnail,
          secondaryValue: installment.installment_amount,
          secondaryText: `Total: ${new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(installment.total_amount)}`,
        });
      });

      setInstallmentsSelect(_installments);
    }
  }

  function setPaymentMethod(status: number, response: any) {
    if (status === 200) {
      const card = response[0];

      cardData = card;
      getIssuers(card.id);
    }
  }

  async function initCreditCard() {
    const pubkey = "TEST-c70a3ca7-6fc5-4378-b21c-50bed0944d17";

    window["Mercadopago"].setPublishableKey(pubkey);

    window["Mercadopago"].getIdentificationTypes();

    const idTypes = await Axios.get(
      `https://api.mercadopago.com/v1/identification_types?public_key=${pubkey}`
    );

    const _documents = [];

    idTypes?.data?.forEach(
      (
        doc: {
          id: string;
          max_length: number;
          min_length: number;
          name: string;
          selected: boolean;
          value: string;
          type: number;
        },
        index: number
      ) => {
        doc["selected"] = index === 0 ? true : false;
        doc["value"] = null;
        _documents.push(doc);
      }
    );

    setDocuments(_documents);
  }

  const setDocument = (id: string, value?: string) => {
    const _documents = _cloneDeep(documents);

    _documents.forEach((doc) => {
      if (doc.id === id) {
        doc.selected = true;
        doc.value = value;
      } else {
        doc.selected = false;
      }
    });

    setDocuments(_documents);
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

  useEffect(() => {
    initCreditCard();
  }, []);

  useEffect(() => {
    if (cardNumber.length > 6) {
      const bin = cardNumber.replaceAll(" ", "");
      window["Mercadopago"].getPaymentMethod(
        {
          bin,
        },
        setPaymentMethod
      );
    } else if (cardNumber !== "") {
      cardData = null;
      setInstallmentsSelect([]);
    }
  }, [cardNumber]);

  return (
    <div>
      <Subtitle color={Colors.SECONDARY}>CARTÃO DE CRÉDITO OU DÉBITO</Subtitle>
      <SizedBox height={20}></SizedBox>
      <CardAndForm>
        <CardContainer>
          <Cards
            cvc={cvc}
            expiry={expiry}
            focused={focused}
            name={name}
            number={cardNumber}
            locale={{ valid: "Validade" }}
            placeholders={{ name: "SEU NOME" }}
          />
        </CardContainer>
        <PaymentForm>
          <Column>
            <SizedBox height={isSmartPhone ? 26 : 0}></SizedBox>
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
      </CardAndForm>
      <SizedBox height={32}></SizedBox>
      <Subtitle>Documento de Identidade</Subtitle>
      <SizedBox height={10}></SizedBox>
      <Row>
        {documents.map((doc) => (
          <React.Fragment key={doc.id}>
            <span
              onClick={() => setDocument(doc.id)}
              style={{ cursor: "pointer" }}
            >
              <Row>
                <RadioButton onClick={null} value={doc.selected}></RadioButton>
                <SizedBox width={5}></SizedBox>
                <SimpleText>{doc.name}</SimpleText>
              </Row>
            </span>
            <SizedBox width={20}></SizedBox>
          </React.Fragment>
        ))}
      </Row>
      <SizedBox height={5}></SizedBox>
      <>
        {documents.map((doc, index) => (
          <>
            {doc.selected && doc.id === "CPF" && (
              <InputFrame key={index}>
                <CPF
                  options={{
                    delimiters: [".", ".", "-"],
                    blocks: [3, 3, 3, 2],
                    uppercase: true,
                  }}
                  type="tel"
                  name="cpf"
                  placeholder="CPF"
                  value={doc.value}
                  onChange={(e) => setDocument(doc.id, e.target.value)}
                ></CPF>
              </InputFrame>
            )}
            {doc.selected && doc.id === "CNPJ" && (
              <InputFrame key={index}>
                <CNPJ
                  options={{
                    delimiters: [".", ".", "/", "-"],
                    blocks: [2, 3, 3, 4, 2],
                    uppercase: true,
                  }}
                  type="tel"
                  name="cnpj"
                  placeholder="CNPJ"
                  value={doc.value}
                  onChange={(e) => setDocument(doc.id, e.target.value)}
                ></CNPJ>
              </InputFrame>
            )}
          </>
        ))}
      </>
      <SizedBox height={32}></SizedBox>
      <SelectMenu
        items={installmentsSelect}
        setSelected={setInstallmentsSelect}
        title="Parcelamento"
        errorText=""
        width={290}
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
