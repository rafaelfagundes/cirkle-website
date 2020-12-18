import { useMediaQuery } from "@material-ui/core";
import _cloneDeep from "lodash/cloneDeep";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import Colors from "../../../../enums/Colors";
import { useAuth } from "../../../../hooks/auth/useAuth";
import { useCart } from "../../../../hooks/cart/useCart";
import { useOrder } from "../../../../hooks/order/useOrder";
import {
  creditCardErrorsTemplate,
  CreditCardValidationResult,
  getCardToken,
  getIdTypes,
  getInstallments,
  getIssuers,
  getPaymentMethod,
  Issuer,
  MercadoPagoCreditCard,
  validateCreditCardInfo,
} from "../../../../modules/mercadoPago/MercadoPago";
import theme from "../../../../theme/theme";
import Column from "../../../Atoms/Column";
import CustomButton from "../../../Atoms/CustomButton";
import RadioButton from "../../../Atoms/RadioButton";
import Row from "../../../Atoms/Row";
import SelectMenu, { AssetType, SelectItem } from "../../../Atoms/SelectMenu";
import SimpleText from "../../../Atoms/SimpleText";
import SizedBox from "../../../Atoms/SizedBox";
import StatefulTextInput from "../../../Atoms/StatefulTextInput";
import Subtitle from "../../../Atoms/Subtitle";
import CartFooterButtons from "../../../Molecules/CartFooterButtons";
import { CardAndForm, CardContainer, PaymentForm } from "../styles";

function CreditCard(): JSX.Element {
  let cardData: any;
  const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));

  const cartContext = useCart();
  const authContext = useAuth();

  const [loadingPayment, setLoadingPayment] = useState(false);

  const [name, setName] = useState("");
  const [cvc, setCvc] = useState("");
  const [focused, setFocused] = useState(null);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [email, setEmail] = useState(
    "test_user_37176104@testuser.com" || authContext?.user?.email
  );

  const [installmentsSelect, setInstallmentsSelect] = useState([]);
  const [documents, setDocuments] = useState([]);

  const [errors, setErrors] = useState(creditCardErrorsTemplate);

  const router = useRouter();

  const orderContext = useOrder();

  const goToFinishPage = async (): Promise<void> => {
    setErrors(creditCardErrorsTemplate);
    setLoadingPayment(true);
    function getValue(name: string): string {
      if (document.getElementsByName(name).length) {
        return document.getElementsByName(name)[0]["value"];
      }
      return null;
    }

    const _payment: MercadoPagoCreditCard = {
      token: getValue("token"),
      description: getValue("description"),
      docNumber: getValue("docNumber"),
      docType: getValue("docType"),
      email: getValue("email"),
      installments: getValue("installments"),
      issuer: getValue("issuer"),
      paymentMethodId: getValue("paymentMethodId"),
      transactionAmount: getValue("transactionAmount"),
    };

    let creditCardValidationResult: CreditCardValidationResult = validateCreditCardInfo(
      {
        ..._payment,
        creditCard: {
          cardHolderName: name,
          cvc,
          number: cardNumber,
          validUntil: expiry,
        },
      },
      false
    );

    if (!creditCardValidationResult.valid) {
      setLoadingPayment(false);
      console.log("errors", creditCardValidationResult.errors);
      setErrors(creditCardValidationResult.errors);
      return;
    }

    if (!getValue("token")) {
      await getPaymentToken();
      _payment["token"] = getValue("token");
    }

    creditCardValidationResult = validateCreditCardInfo(
      {
        ..._payment,
        creditCard: {
          cardHolderName: name,
          cvc,
          number: cardNumber,
          validUntil: expiry,
        },
      },
      true
    );
    if (!creditCardValidationResult.valid) {
      setLoadingPayment(false);
      return;
    } else {
      setLoadingPayment(false);
      orderContext.setPayment(_payment);
      router.push("/comprar/concluir");
    }
  };

  const goToAddressPage = (): void => {
    router.push("/comprar/envio");
  };

  const setIssuers = async (response: any) => {
    const issuerSelect = document.getElementById("issuer");
    issuerSelect.innerHTML = "";

    response.forEach((issuer: Issuer) => {
      const opt = document.createElement("option");
      opt.text = issuer.name;
      opt.value = issuer.id;
      issuerSelect.appendChild(opt);
    });

    let issuerId = response[0].id;

    if (response.length > 1) {
      issuerId = response.filter((o: any) => o.name === "Outro")[0].id;
    }

    if (cardData?.id) {
      console.log("3. Recuperando parcelas");
      const result = await getInstallments(
        cardData.id,
        cartContext.cart.total,
        issuerId
      );

      if (result.status === 200) {
        setInstallments(result.response);
      } else {
        console.error("Erro ao recuperar parcelas");
      }
    }
    issuerSelect["value"] = issuerId;
  };

  function setInstallments(response: any) {
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

  async function setPaymentMethod(response: any) {
    const card = response[0];
    cardData = card;
    document.getElementById("paymentMethodId")["value"] = response[0].id;

    console.log("2. Recuperando emissores");
    const result = await getIssuers(card.id);
    if (result.status === 200) {
      setIssuers(result.response);
    }
  }

  async function initCreditCard() {
    console.log("1a. Recuperando documentos");
    const result = await getIdTypes();
    const _documents = [];
    if (result) {
      result.forEach((doc, index) => {
        doc["selected"] = index === 0 ? true : false;
        doc["value"] = null;
        _documents.push(doc);
      });
      setDocuments(_documents);
    }
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

  const getPaymentToken = async () => {
    const form = document.querySelector("form");
    const result = await getCardToken(form);

    if (result.status === 200) {
      const card = document.createElement("input");
      card.setAttribute("name", "token");
      card.setAttribute("type", "hidden");
      card.setAttribute("value", result.response.id);
      form.appendChild(card);
    } else {
      console.error(
        "Não foi possível gerar o token de pagamento, verifique todos os campos"
      );
    }
  };

  const getAllCardInfo = async (bin: string) => {
    console.log("1b. Recuperando meio de pagamento");
    const result = await getPaymentMethod(bin);
    if (result.status === 200) {
      setPaymentMethod(result.response);
    } else {
      console.error("Não foi possível recuperar o meio de pagamento");
    }
  };

  useEffect(() => {
    initCreditCard();
  }, []);

  useEffect(() => {
    if (typeof cardNumber === "string" && cardNumber.length > 6) {
      let bin = cardNumber?.replace(/ /g, "");
      bin = bin?.slice(0, 6);
      getAllCardInfo(bin);
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
          {!isSmartPhone && (
            <PaymentForm>
              <Column>
                <SizedBox height={isSmartPhone ? 26 : 0}></SizedBox>
                <StatefulTextInput
                  name="number"
                  value={cardNumber}
                  inputType="cardNumber"
                  onChange={setCardNumber}
                  onFocus={(e: any) => setFocused(e.target.name)}
                  maxLength={19}
                  type="tel"
                  width={400}
                  error={errors.creditCard.number}
                >
                  Número Do Cartão
                </StatefulTextInput>
                <SizedBox height={20}></SizedBox>

                <StatefulTextInput
                  name="name"
                  value={name}
                  type="text"
                  onChange={setName}
                  onFocus={(e) => setFocused(e.target.name)}
                  uppercase
                  width={400}
                  error={errors.creditCard.cardHolderName}
                >
                  Seu Nome Como No Cartão
                </StatefulTextInput>

                <SizedBox height={20}></SizedBox>
                <Row>
                  <StatefulTextInput
                    value={expiry}
                    type="tel"
                    inputType="cardValidUntil"
                    name="expiry"
                    onChange={setExpiry}
                    onFocus={(e) => setFocused(e.target.name)}
                    width={157}
                    error={errors.creditCard.validUntil}
                  >
                    Validade
                  </StatefulTextInput>
                  <SizedBox width={20}></SizedBox>
                  <StatefulTextInput
                    type="tel"
                    name="cvc"
                    inputType="cardCvc"
                    onChange={setCvc}
                    onFocus={(e) => setFocused(e.target.name)}
                    onBlur={() => setFocused("name")}
                    maxLength={4}
                    value={cvc}
                    width={157}
                    error={errors.creditCard.cvc}
                  >
                    CVC
                  </StatefulTextInput>
                </Row>
              </Column>
            </PaymentForm>
          )}
          <CardContainer isSmartPhone={isSmartPhone}>
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
          {isSmartPhone && (
            <PaymentForm>
              <Column>
                <SizedBox height={isSmartPhone ? 26 : 0}></SizedBox>
                <StatefulTextInput
                  name="number"
                  value={cardNumber}
                  inputType="cardNumber"
                  onChange={setCardNumber}
                  onFocus={(e: any) => setFocused(e.target.name)}
                  maxLength={19}
                  type="tel"
                  width={400}
                  error={errors.creditCard.number}
                >
                  Número Do Cartão
                </StatefulTextInput>
                <SizedBox height={20}></SizedBox>

                <StatefulTextInput
                  name="name"
                  value={name}
                  type="text"
                  onChange={setName}
                  onFocus={(e) => setFocused(e.target.name)}
                  uppercase
                  width={400}
                  error={errors.creditCard.cardHolderName}
                >
                  Seu Nome Como No Cartão
                </StatefulTextInput>

                <SizedBox height={20}></SizedBox>
                <Row>
                  <StatefulTextInput
                    value={expiry}
                    type="tel"
                    inputType="cardValidUntil"
                    name="expiry"
                    onChange={setExpiry}
                    onFocus={(e) => setFocused(e.target.name)}
                    width={157}
                    error={errors.creditCard.validUntil}
                  >
                    Validade
                  </StatefulTextInput>
                  <SizedBox width={20}></SizedBox>
                  <StatefulTextInput
                    type="tel"
                    name="cvc"
                    inputType="cardCvc"
                    onChange={setCvc}
                    onFocus={(e) => setFocused(e.target.name)}
                    onBlur={() => setFocused("name")}
                    maxLength={4}
                    value={cvc}
                    width={157}
                    error={errors.creditCard.cvc}
                  >
                    CVC
                  </StatefulTextInput>
                </Row>
              </Column>
            </PaymentForm>
          )}
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
        <SizedBox height={8}></SizedBox>
        <>
          {documents.map((doc, index) => (
            <React.Fragment key={index}>
              {doc.selected && doc.id === "CPF" && (
                <StatefulTextInput
                  type="tel"
                  name="cpf"
                  inputType="cpf"
                  value={doc.value || ""}
                  onChange={(value: string) => setDocument(doc.id, value)}
                  width={335}
                  error={errors.docNumber}
                >
                  CPF
                </StatefulTextInput>
              )}
              {doc.selected && doc.id === "CNPJ" && (
                <StatefulTextInput
                  type="tel"
                  name="cnpj"
                  inputType="cnpj"
                  value={doc.value || ""}
                  onChange={(value: string) => setDocument(doc.id, value)}
                  width={335}
                  error={errors.docNumber}
                >
                  CNPJ
                </StatefulTextInput>
              )}
            </React.Fragment>
          ))}
        </>
        <SizedBox height={24}></SizedBox>
        <StatefulTextInput
          type="text"
          name="email"
          onChange={setEmail}
          value={email}
          initialValue={email}
          width={335}
          error={errors.email}
        >
          Seu Email
        </StatefulTextInput>
        {installmentsSelect.length > 0 && (
          <>
            <SizedBox height={32}></SizedBox>
            <SelectMenu
              items={installmentsSelect}
              setSelected={setInstallmentsSelect}
              title="Parcelamento"
              errorText=""
              width={335}
            ></SelectMenu>
          </>
        )}
        <SizedBox height={20}></SizedBox>
      </div>
      <span style={{ display: "none" }}>
        <form method="post" id="paymentForm">
          <div>
            <div>
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                name="email"
                type="text"
                readOnly
                value={email}
              />
            </div>
            <div>
              <label htmlFor="docType">Tipo de documento</label>
              <select
                id="docType"
                name="docType"
                data-checkout="docType"
                value={documents.filter((o) => o.selected)[0]?.name || ""}
              ></select>
            </div>
            <div>
              <label htmlFor="docNumber">Número do documento</label>
              <input
                id="docNumber"
                name="docNumber"
                data-checkout="docNumber"
                type="text"
                readOnly
                value={
                  documents
                    .filter((o) => o.selected)[0]
                    ?.value?.replace(/[^0-9]/g, "") || ""
                }
              />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="cardholderName">Titular do cartão</label>
              <input
                id="cardholderName"
                data-checkout="cardholderName"
                type="text"
                value={name}
                readOnly
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
                  readOnly
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
                  readOnly
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
                value={
                  typeof cardNumber === "string" &&
                  cardNumber?.replace(/ /g, "")
                }
                readOnly
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
                readOnly
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
                value={
                  installmentsSelect.filter((o) => o.selected)[0]?.value || ""
                }
              ></select>
            </div>
            <div>
              <input
                type="hidden"
                name="transactionAmount"
                id="transactionAmount"
                value={cartContext.cart.total}
                readOnly
              />
              <input
                type="hidden"
                name="paymentMethodId"
                id="paymentMethodId"
                readOnly
              />
              <input
                type="hidden"
                name="description"
                id="description"
                readOnly
              />
            </div>
          </div>
        </form>
        <CustomButton onClick={getPaymentToken} width={220}>
          GetTokenAndPay
        </CustomButton>
      </span>
      <CartFooterButtons
        buttons={[
          {
            text: "Alterar Endereço",
            onClick: goToAddressPage,
            type: "text",
            width: 180,
            isBackButton: true,
          },
          {
            text: "Revisar Pedido",
            onClick: goToFinishPage,
            type: "success",
            width: 200,
            loading: loadingPayment,
          },
        ]}
      ></CartFooterButtons>
    </>
  );
}

export default CreditCard;
