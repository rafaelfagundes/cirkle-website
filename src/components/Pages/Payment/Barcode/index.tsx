import _cloneDeep from "lodash/cloneDeep";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Colors from "../../../../enums/Colors";
import { useAuth } from "../../../../hooks/auth/useAuth";
import { getIdTypes } from "../../../../utils/mercadoPago";
import RadioButton from "../../../Atoms/RadioButton";
import Row from "../../../Atoms/Row";
import SimpleText from "../../../Atoms/SimpleText";
import SizedBox from "../../../Atoms/SizedBox";
import StatefulTextInput from "../../../Atoms/StatefulTextInput";
import Subtitle from "../../../Atoms/Subtitle";
import CartFooterButtons from "../../../Molecules/CartFooterButtons";
import { CNPJ, CPF, InputFrame } from "../styles";

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

  const router = useRouter();

  const goToFinishPage = (): void => {
    router.push("/comprar/concluir");
  };

  const goToAddressPage = (): void => {
    router.push("/comprar/envio");
  };

  const [name, setName] = useState("");
  const [surName, setSurName] = useState("");
  const [email, setEmail] = useState("");

  const [documents, setDocuments] = useState([]);
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
        value={name}
        onChange={setName}
        width={400}
        initialValue={authContext?.user?.name?.split(" ")[0]}
      >
        Nome
      </StatefulTextInput>
      <SizedBox height={24}></SizedBox>
      <StatefulTextInput
        value={surName}
        onChange={setSurName}
        width={400}
        initialValue={authContext?.user?.name?.split(" ")[1]}
      >
        Sobrenome
      </StatefulTextInput>
      <SizedBox height={24}></SizedBox>
      <StatefulTextInput
        value={email}
        onChange={setEmail}
        width={400}
        initialValue={authContext?.user?.email}
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
                  value={doc.value || ""}
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
                  value={doc.value || ""}
                  onChange={(e) => setDocument(doc.id, e.target.value)}
                ></CNPJ>
              </InputFrame>
            )}
          </React.Fragment>
        ))}
      </>
      <SizedBox height={20}></SizedBox>
      <SimpleText>{props.message}</SimpleText>
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
          },
        ]}
      ></CartFooterButtons>
    </div>
  );
}

export default Barcode;
