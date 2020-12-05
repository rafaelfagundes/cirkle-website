import { useMediaQuery } from "@material-ui/core";
import Axios from "axios";
import Cleave from "cleave.js/react";
import _cloneDeep from "lodash/cloneDeep";
import React, { useEffect, useRef, useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import styled from "styled-components";
import Colors from "../../../../enums/Colors";
import { useAuth } from "../../../../hooks/auth/useAuth";
import { useCart } from "../../../../hooks/cart/useCart";
import Address from "../../../../modules/address/Address";
import theme from "../../../../theme/theme";
import CheckBoxWithLabel from "../../../Atoms/CheckboxWithLabel";
import Column from "../../../Atoms/Column";
import CustomButton from "../../../Atoms/CustomButton";
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
  const authContext = useAuth();

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
      const issuerSelect = document.getElementById("issuer");
      issuerSelect.innerHTML = "";

      response.forEach(
        (issuer: {
          id: string;
          merchant_account_id: string;
          name: string;
          processing_mode: string;
          secure_thumbnail: string;
          thumbnail: string;
        }) => {
          const opt = document.createElement("option");
          opt.text = issuer.name;
          opt.value = issuer.id;
          issuerSelect.appendChild(opt);
        }
      );

      let issuerId = response[0].id;

      if (response.length > 1) {
        issuerId = response.filter((o: any) => o.name === "Outro")[0].id;
      }

      if (cardData?.id) {
        getInstallments(cardData.id, cartContext.cart.total, issuerId);
      }

      issuerSelect["value"] = issuerId;
    }
  };

  function setInstallments(status: number, response: any) {
    if (status === 200) {
      document.getElementById("installments")["options"].length = 0;
      response[0].payer_costs.forEach((payerCost: any) => {
        const opt = document.createElement("option");
        opt.text = payerCost.recommended_message;
        opt.value = payerCost.installments;
        document.getElementById("installments").appendChild(opt);
      });

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

      document.getElementById("paymentMethodId")["value"] = response[0].id;
    }
  }

  async function initCreditCard() {
    const pubkey = "TEST-36a3608a-da17-4d66-8aec-c35409112b98";

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

  const getCardToken = async () => {
    const form = document.getElementById("paymentForm");

    window["Mercadopago"].createToken(
      form,
      async (status: number, response: any) => {
        console.log("response", response);

        const form = document.getElementById("paymentForm");
        const card = document.createElement("input");
        card.setAttribute("name", "token");
        card.setAttribute("type", "hidden");
        card.setAttribute("value", response.id);
        form.appendChild(card);

        console.log("form", form);

        const obj = {};
        const formData = new FormData(form);
        for (const key of formData.keys()) {
          obj[key] = formData.get(key);
        }

        console.log("obj", obj);

        try {
          const response = await Axios.post("/orders", {
            payment: obj,
          });

          console.log("response.data", response.data);
        } catch (error) {
          console.log("error", error);
        }
      }
    );
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
      const bin = cardNumber?.replaceAll(" ", "");
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
    <>
      <div>
        <Subtitle color={Colors.SECONDARY}>
          CARTÃO DE CRÉDITO OU DÉBITO
        </Subtitle>
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
                  type="tel"
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
                  <RadioButton
                    onClick={null}
                    value={doc.selected}
                  ></RadioButton>
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
            <React.Fragment key={index}>
              {doc.selected && doc.id === "CPF" && (
                <InputFrame>
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
                <InputFrame>
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
            </React.Fragment>
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
          onClick={() =>
            setBillingAddressIsDifferent(!billingAddressIsDifferent)
          }
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
      <span style={{ display: "block" }}>
        <form action="/process-payment" method="post" id="paymentForm">
          <h3>Detalhe do comprador</h3>
          <div>
            <div>
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                name="email"
                type="text"
                // value={authContext?.user?.email || ""}
                value="test_user_37176104@testuser.com"
              />
            </div>
            <div>
              <label htmlFor="docType">Tipo de documento</label>
              <select
                id="docType"
                name="docType"
                data-checkout="docType"
                value={documents.filter((o) => o.selected)[0]?.name}
              ></select>
            </div>
            <div>
              <label htmlFor="docNumber">Número do documento</label>
              <input
                id="docNumber"
                name="docNumber"
                data-checkout="docNumber"
                type="text"
                value={documents
                  .filter((o) => o.selected)[0]
                  ?.value?.replaceAll(".", "")
                  ?.replaceAll("-", "")
                  ?.replaceAll("/", "")}
              />
            </div>
          </div>
          <h3>Detalhes do cartão</h3>
          <div>
            <div>
              <label htmlFor="cardholderName">Titular do cartão</label>
              <input
                id="cardholderName"
                data-checkout="cardholderName"
                type="text"
                value={name}
              />
            </div>
            <div>
              <label htmlFor="">Data de vencimento</label>
              <div>
                <input
                  type="text"
                  placeholder="MM"
                  id="cardExpirationMonth"
                  data-checkout="cardExpirationMonth"
                  onPaste={null}
                  onCopy={null}
                  onCut={null}
                  onDrag={null}
                  onDrop={null}
                  autoComplete="off"
                  value={expiry.split("/")[0]}
                />
                <span className="date-separator">/</span>
                <input
                  type="text"
                  placeholder="YY"
                  id="cardExpirationYear"
                  data-checkout="cardExpirationYear"
                  onPaste={null}
                  onCopy={null}
                  onCut={null}
                  onDrag={null}
                  onDrop={null}
                  autoComplete="off"
                  value={expiry.split("/")[1]}
                />
              </div>
            </div>
            <div>
              <label htmlFor="cardNumber">Número do cartão</label>
              <input
                type="text"
                id="cardNumber"
                data-checkout="cardNumber"
                onPaste={null}
                onCopy={null}
                onCut={null}
                onDrag={null}
                onDrop={null}
                autoComplete="off"
                value={cardNumber?.replaceAll(" ", "")}
              />
            </div>
            <div>
              <label htmlFor="securityCode">Código de segurança</label>
              <input
                id="securityCode"
                data-checkout="securityCode"
                type="text"
                onPaste={null}
                onCopy={null}
                onCut={null}
                onDrag={null}
                onDrop={null}
                autoComplete="off"
                value={cvc}
              />
            </div>
            <div id="issuerInput">
              <label htmlFor="issuer">Banco emissor</label>
              <select id="issuer" name="issuer" data-checkout="issuer"></select>
            </div>
            <div>
              <label htmlFor="installments">Parcelas</label>
              <select
                id="installments"
                name="installments"
                value={installmentsSelect.filter((o) => o.selected)[0]?.value}
              ></select>
            </div>
            <div>
              <input
                type="hidden"
                name="transactionAmount"
                id="transactionAmount"
                value={cartContext.cart.total}
              />
              <input
                type="hidden"
                name="paymentMethodId"
                id="paymentMethodId"
              />
              <input type="hidden" name="description" id="description" />
            </div>
          </div>
        </form>
      </span>
      <CustomButton onClick={getCardToken} width={220}>
        GetTokenAndPay
      </CustomButton>
    </>
  );
}

export default CreditCard;
