import Axios from "axios";
import _cloneDeep from "lodash/cloneDeep";
import getConfig from "next/config";
import validator from "validator";
import { isCNPJ, isCPF, isCVCExpired, isMMYY } from "../../utils/validation";
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

/* -- CREDIT CARD -------------------------------------------------- */

export type CreditCardValidationResult = {
  valid: boolean;
  errors?: {
    docNumber: string;
    docType: string;
    email: string;
    installments: string;
    issuer: string;
    paymentMethodId: string;
    token: string;
    transactionAmount: string;
    creditCard: {
      number: string;
      cardHolderName: string;
      validUntil: string;
      cvc: string;
    };
  };
};

export const creditCardErrorsTemplate = {
  docNumber: "",
  docType: "",
  email: "",
  installments: "",
  issuer: "",
  paymentMethodId: "",
  token: "",
  transactionAmount: "",
  creditCard: {
    number: "",
    cardHolderName: "",
    validUntil: "",
    cvc: "",
  },
};

export type MercadoPagoCreditCardValidation = {
  description: string;
  docNumber: string;
  docType: string;
  email: string;
  installments: string;
  issuer: string;
  paymentMethodId: string;
  token: string;
  transactionAmount: string;
  creditCard: {
    number: string;
    cardHolderName: string;
    validUntil: string;
    cvc: string;
  };
};

export function validateCreditCardInfo(
  paymentInfo: MercadoPagoCreditCardValidation,
  validateToken: boolean
): CreditCardValidationResult {
  const errors = _cloneDeep(creditCardErrorsTemplate);

  let errorsCount = 0;

  if (validateToken) {
    if (validator.isEmpty(paymentInfo.token)) {
      errorsCount++;
      errors.docNumber =
        "Houve um problema com a administradora de pagamento. Tente novamente mais tarde.";
    }
  }

  if (validator.isEmpty(paymentInfo.creditCard.number)) {
    errorsCount++;
    errors.creditCard.number = "Por favor, preencha o número do cartão.";
  } else if (
    paymentInfo.creditCard.number.length < 13 ||
    paymentInfo.creditCard.number.length > 19
  ) {
    errorsCount++;
    errors.creditCard.number = "O número deve conter entre 13 e 19 números.";
  }

  if (validator.isEmpty(paymentInfo.creditCard.cardHolderName)) {
    errorsCount++;
    errors.creditCard.cardHolderName =
      "Por favor, preencha o nome como está no cartão.";
  }

  if (validator.isEmpty(paymentInfo.creditCard.cvc)) {
    errorsCount++;
    errors.creditCard.cvc = "Preencha o CVC.";
  } else if (
    paymentInfo.creditCard.cvc.length < 3 ||
    paymentInfo.creditCard.cvc.length > 4
  ) {
    errorsCount++;
    errors.creditCard.cvc = "CVC deve conter 3 ou 4 números";
  }

  if (validator.isEmpty(paymentInfo.creditCard.validUntil)) {
    errorsCount++;
    errors.creditCard.validUntil = "Preencha a validade.";
  } else if (!isMMYY(paymentInfo.creditCard.validUntil)) {
    errorsCount++;
    errors.creditCard.validUntil = "A data deve ser mês/ano";
  } else if (isCVCExpired(paymentInfo.creditCard.validUntil)) {
    errorsCount++;
    errors.creditCard.validUntil = "O cartão expirou";
  }

  if (validator.isEmpty(paymentInfo.docNumber)) {
    errorsCount++;
    errors.docNumber = "Por favor, preencha o número do documento.";
  } else if (paymentInfo.docType === "CPF" && !isCPF(paymentInfo.docNumber)) {
    errorsCount++;
    errors.docNumber = "Por favor, preencha um CPF válido.";
  } else if (paymentInfo.docType === "CNPJ" && !isCNPJ(paymentInfo.docNumber)) {
    errorsCount++;
    errors.docNumber = "Por favor, preencha um CNPJ válido.";
  }

  if (validator.isEmpty(paymentInfo.docType)) {
    errorsCount++;
    errors.docType = "Houve um erro desconhecido. DocType não foi informado.";
  }

  if (validator.isEmpty(paymentInfo.email)) {
    errorsCount++;
    errors.email = "Por favor, preencha o email.";
  } else if (!validator.isEmail(paymentInfo.email)) {
    errorsCount++;
    errors.email = "Por favor, preencha um email válido.";
  }

  if (validator.isEmpty(paymentInfo.installments)) {
    errorsCount++;
    errors.installments =
      "Houve um erro desconhecido. Installments não foi informado.";
  }

  if (validator.isEmpty(paymentInfo.issuer)) {
    errorsCount++;
    errors.issuer = "Houve um erro desconhecido. Issuer não foi informado.";
  }

  if (validator.isEmpty(paymentInfo.paymentMethodId)) {
    errorsCount++;
    errors.paymentMethodId =
      "Houve um erro desconhecido. PaymentMethodId não foi informado.";
  }

  if (validator.isEmpty(paymentInfo.transactionAmount)) {
    errorsCount++;
    errors.transactionAmount =
      "Houve um erro desconhecido. TransactionAmount não foi informado.";
  }

  if (errorsCount) {
    return {
      valid: false,
      errors,
    };
  } else {
    return {
      valid: true,
    };
  }
}

/* -- BAR CODE -------------------------------------------------- */

export type BarCodeValidationResult = {
  valid: boolean;
  errors?: {
    firstName: string;
    lastName: string;
    email: string;
    docNumber: string;
  };
};

export const barCodeErrorsTemplate = {
  firstName: "",
  lastName: "",
  email: "",
  docNumber: "",
};

export type MercadoPagoBarCodeValidation = {
  firstName: string;
  lastName: string;
  email: string;
  docNumber: string;
  docType: string;
};

export function validateBarCode(
  paymentInfo: MercadoPagoBarCodeValidation
): BarCodeValidationResult {
  console.log(
    "🚀 ~ file: MercadoPago.ts ~ line 342 ~ paymentInfo",
    paymentInfo
  );
  const errors = _cloneDeep(barCodeErrorsTemplate);

  let errorsCount = 0;

  if (validator.isEmpty(paymentInfo.firstName)) {
    errorsCount++;
    errors.firstName = "Por favor, preencha o nome.";
  }

  if (validator.isEmpty(paymentInfo.lastName)) {
    errorsCount++;
    errors.lastName = "Por favor, preencha o sobrenome.";
  }

  if (validator.isEmpty(paymentInfo.email)) {
    errorsCount++;
    errors.email = "Por favor, preencha o email.";
  } else if (!validator.isEmail(paymentInfo.email)) {
    errorsCount++;
    errors.email = "Por favor, preencha um email válido.";
  }

  if (validator.isEmpty(paymentInfo.docNumber)) {
    errorsCount++;
    errors.docNumber = "Por favor, preencha o número do documento.";
  } else if (paymentInfo.docType === "CPF" && !isCPF(paymentInfo.docNumber)) {
    errorsCount++;
    errors.docNumber = "Por favor, preencha um CPF válido.";
  } else if (paymentInfo.docType === "CNPJ" && !isCNPJ(paymentInfo.docNumber)) {
    errorsCount++;
    errors.docNumber = "Por favor, preencha um CNPJ válido.";
  }

  if (errorsCount) {
    return {
      valid: false,
      errors,
    };
  } else {
    return {
      valid: true,
    };
  }
}
