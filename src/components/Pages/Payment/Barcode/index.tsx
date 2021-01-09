import _cloneDeep from "lodash/cloneDeep";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Colors from "../../../../enums/Colors";
import { useAuth } from "../../../../hooks/auth/useAuth";
import { useCart } from "../../../../hooks/cart/useCart";
import { useOrder } from "../../../../hooks/order/useOrder";
import {
  barCodeErrorsTemplate,
  BarCodeValidationResult,
  getIdTypes,
  MercadoPagoOtherPaymentMethod,
  validateBarCode,
} from "../../../../modules/mercadoPago/MercadoPago";
import RadioButton from "../../../Atoms/RadioButton";
import Row from "../../../Atoms/Row";
import SimpleText from "../../../Atoms/SimpleText";
import SizedBox from "../../../Atoms/SizedBox";
import StatefulTextInput from "../../../Atoms/StatefulTextInput";
import Subtitle from "../../../Atoms/Subtitle";
import CartFooterButtons from "../../../Molecules/CartFooterButtons";

export enum MercadoPagoPaymentType {
  BOLETO = "bolbradesco",
  LOTERICA = "pec",
}

interface BarcodeProps {
  title: string;
  message: string;
  type: MercadoPagoPaymentType;
}

function Barcode(props: BarcodeProps): JSX.Element {
  const authContext = useAuth();
  const orderContext = useOrder();
  const cartContext = useCart();

  const [firstName, setFirstName] = useState(
    orderContext?.order?.user?.firstName ||
      authContext?.user?.name?.split(" ")[0] ||
      ""
  );
  const [lastName, setLastName] = useState(
    orderContext?.order?.user?.lastName ||
      authContext?.user?.name?.split(" ")[1] ||
      ""
  );
  const [email, setEmail] = useState(
    orderContext?.order?.user?.email || authContext?.user?.email || ""
  );
  const [documents, setDocuments] = useState([]);
  const [loadingPayment, setLoadingPayment] = useState(false);

  const [errors, setErrors] = useState(barCodeErrorsTemplate);

  const router = useRouter();

  const goToFinishPage = (): void => {
    setErrors(barCodeErrorsTemplate);
    setLoadingPayment(true);

    const _document = documents.filter((o) => o.selected)[0];

    const _payment: MercadoPagoOtherPaymentMethod = {
      description: "",
      payer: {
        email,
        address: {
          city: orderContext.order.address.city,
          federal_unit: orderContext.order.address.state,
          neighborhood: orderContext.order.address.neighborhood,
          street_name: orderContext.order.address.street,
          street_number: String(orderContext.order.address.number),
          zip_code: orderContext.order.address.postalCode,
        },
        first_name: firstName,
        last_name: lastName,
        identification: {
          number: _document.value?.replace(/[^0-9]/g, ""),
          type: _document.id,
        },
      },
      transaction_amount: orderContext.getTotal(cartContext.isShippingFree()),
      payment_method_id: props.type,
    };

    const barCodeValidationResult: BarCodeValidationResult = validateBarCode({
      email,
      firstName,
      lastName,
      docNumber: _document?.value || "",
      docType: _document?.id || "",
    });

    if (!barCodeValidationResult.valid) {
      setLoadingPayment(false);
      console.log("errors", barCodeValidationResult.errors);
      setErrors(barCodeValidationResult.errors);
      return;
    }

    setLoadingPayment(false);
    orderContext.setPayment(_payment);
    router.push("/comprar/concluir");
  };

  const goToAddressPage = (): void => {
    router.push("/comprar/envio");
  };

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

  async function getDocuments() {
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
  useEffect(() => {
    getDocuments();
  }, []);

  return (
    <div>
      <Subtitle color={Colors.SECONDARY}>{props.title?.toUpperCase()}</Subtitle>
      <SizedBox height={20}></SizedBox>

      <StatefulTextInput
        value={firstName}
        onChange={setFirstName}
        width={400}
        initialValue={authContext?.user?.name?.split(" ")[0]}
        error={errors.firstName}
      >
        Nome
      </StatefulTextInput>
      <SizedBox height={24}></SizedBox>
      <StatefulTextInput
        value={lastName}
        onChange={setLastName}
        width={400}
        initialValue={authContext?.user?.name?.split(" ")[1]}
        error={errors.lastName}
      >
        Sobrenome
      </StatefulTextInput>
      <SizedBox height={24}></SizedBox>
      <StatefulTextInput
        value={email}
        onChange={setEmail}
        width={400}
        initialValue={authContext?.user?.email}
        error={errors.email}
      >
        Email
      </StatefulTextInput>
      <SizedBox height={24}></SizedBox>
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
                width={400}
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
                width={400}
                error={errors.docNumber}
              >
                CNPJ
              </StatefulTextInput>
            )}
          </React.Fragment>
        ))}
      </>
      <SizedBox height={20}></SizedBox>
      <SimpleText color={Colors.BLUE_JEANS}>{props.message}</SimpleText>
      <SizedBox height={20}></SizedBox>
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
    </div>
  );
}

export default Barcode;
