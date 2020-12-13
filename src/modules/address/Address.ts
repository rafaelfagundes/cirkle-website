import _cloneDeep from "lodash/cloneDeep";
import validator from "validator";

type Address = {
  id?: string;
  street: string;
  number: number;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  postalCode: string;
  mainAddress?: boolean;
  customAddress?: boolean;
};

type AddressValidationResult = {
  valid: boolean;
  errors?: {
    postalCode: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
  };
};

export const addressErrorsTemplate = {
  postalCode: "",
  street: "",
  number: "",
  neighborhood: "",
  city: "",
  state: "",
};

export function validateAddress(address: Address): AddressValidationResult {
  const errors = _cloneDeep(addressErrorsTemplate);

  let errorsCount = 0;

  if (validator.isEmpty(address.street)) {
    errorsCount++;
    errors.street = "Por favor, preencha a rua.";
  }
  if (validator.isEmpty(String(address.number))) {
    errorsCount++;
    errors.number = "Por favor, preencha o número da residência.";
  }
  if (address.number === 0) {
    errorsCount++;
    errors.number = "Por favor, preencha o número da residência.";
  } else if (!validator.isNumeric(String(address.number))) {
    errorsCount++;
    errors.number =
      'Por favor, preencha somente números. Para outras informações use o campo "complemento".';
  }
  if (validator.isEmpty(address.neighborhood)) {
    errorsCount++;
    errors.neighborhood = "Por favor, preencha o bairro.";
  }
  if (validator.isEmpty(address.city)) {
    errorsCount++;
    errors.city = "Por favor, preencha a cidade.";
  }
  if (validator.isEmpty(address.state)) {
    errorsCount++;
    errors.state = "Por favor, preencha o estado.";
  } else if (!validator.isLength(address.state, { min: 2, max: 2 })) {
    errorsCount++;
    errors.state =
      "Por favor, preencha somente a sigla do estado. Exemplo: MG.";
  }
  if (validator.isEmpty(address.postalCode)) {
    errorsCount++;
    errors.postalCode = "Por favor, preencha o CEP.";
  } else if (!validator.isNumeric(address.postalCode.replace("-", ""))) {
    errorsCount++;
    errors.postalCode = "Por favor, informe somente números no CEP";
  } else if (!validator.isLength(address.postalCode, { min: 9, max: 9 })) {
    errorsCount++;
    errors.postalCode = "Por favor, informe o CEP no formato:  12345-123.";
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

export default Address;
