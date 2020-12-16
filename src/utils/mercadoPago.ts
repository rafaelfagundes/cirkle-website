import Axios from "axios";
import getConfig from "next/config";
const config = getConfig();
let publicRuntimeConfig: any;

if (config) {
  publicRuntimeConfig = getConfig().publicRuntimeConfig;

  if (process.browser) {
    window["Mercadopago"].setPublishableKey(
      publicRuntimeConfig.MERCADO_PAGO_PUB_KEY
    );
    window["Mercadopago"].getIdentificationTypes();
  }
}

type Document = {
  id: string;
  max_length: number;
  min_length: number;
  name: string;
  selected: boolean;
  value: string;
  type: number;
};

export type Issuer = {
  id: string;
  merchant_account_id: string;
  name: string;
  processing_mode: string;
  secure_thumbnail: string;
  thumbnail: string;
};

export type MercadoPagoCreditCard = {
  description: string;
  docNumber: string;
  docType: string;
  email: string;
  installments: string;
  issuer: string;
  paymentMethodId: string;
  token: string;
  transactionAmount: string;
};

export type MercadoPagoOtherPaymentMethod = {
  transaction_amount: number;
  description: string;
  payment_method_id: string;
  payer: {
    email: string;
    first_name: string;
    last_name: string;
    identification: {
      type: string;
      number: string;
    };
    address: {
      zip_code: string;
      street_name: string;
      street_number: string;
      neighborhood: string;
      city: string;
      federal_unit: string;
    };
  };
};

export type MercadoPagoResponse = {
  id: number;
  status: string;
  status_detail: string;
};

export async function getIdTypes(): Promise<Array<Document>> {
  const response = await Axios.get(
    `https://api.mercadopago.com/v1/identification_types?public_key=${publicRuntimeConfig.MERCADO_PAGO_PUB_KEY}`
  );

  if (response.status === 200) {
    return response.data;
  } else return null;
}

export async function getInstallments(
  payment_method_id: number,
  amount: number,
  issuer_id: number
): Promise<{ status: number; response: any }> {
  return new Promise((resolve) => {
    window["Mercadopago"].getInstallments(
      {
        payment_method_id,
        amount,
        issuer_id,
      },
      (status: number, response: any) => resolve({ status, response })
    );
  });
}

export function getIssuers(
  paymentMethodId: number
): Promise<{ status: number; response: any }> {
  return new Promise((resolve) => {
    window["Mercadopago"].getIssuers(
      paymentMethodId,
      (status: number, response: any) => resolve({ status, response })
    );
  });
}

export function getPaymentMethod(
  cardFirstSixNumbers: string
): Promise<{ status: number; response: any }> {
  return new Promise((resolve) => {
    window["Mercadopago"].getPaymentMethod(
      { bin: cardFirstSixNumbers },
      (status: number, response: any) => resolve({ status, response })
    );
  });
}

export async function getCardToken(
  form: HTMLFormElement
): Promise<{ status: number; response: any }> {
  return new Promise((resolve) => {
    window["Mercadopago"].createToken(form, (status: number, response: any) =>
      resolve({ status, response })
    );
  });
}

// export async function getCardToken(form: HTMLFormElement): Promise<any> {
//   return await window["Mercadopago"].createToken(
//     form,
//     async (status: number, response: any) => {
//       if (status === 200 || status === 201) {
//         const card = document.createElement("input");
//         card.setAttribute("name", "token");
//         card.setAttribute("type", "hidden");
//         card.setAttribute("value", response.id);
//         form.appendChild(card);

//         const obj = {};
//         const formData = new FormData(form);

//         for (const key of formData.keys()) {
//           obj[key] = formData.get(key);
//         }

//         console.log("🚀 ~ file: mercadoPago.ts ~ line 135 ~ obj", obj);
//         return obj;
//       } else return null;
//     }
//   );
// }
