import moment from "moment";
import validator from "validator";

export function isCPF(str: string): boolean {
  let sumCalc: number;
  let restCalc: number;
  let interation: number;

  const strCPF = str.replace(/[^\d]+/g, "");

  if (
    strCPF === "" ||
    strCPF.length !== 11 ||
    strCPF === "00000000000" ||
    strCPF === "11111111111" ||
    strCPF === "22222222222" ||
    strCPF === "33333333333" ||
    strCPF === "44444444444" ||
    strCPF === "55555555555" ||
    strCPF === "66666666666" ||
    strCPF === "77777777777" ||
    strCPF === "88888888888" ||
    strCPF === "99999999999"
  ) {
    return false;
  }

  //  Check the first validation digit
  sumCalc = 0;
  for (interation = 0; interation < 9; interation++) {
    sumCalc =
      sumCalc + parseInt(strCPF.charAt(interation), 10) * (10 - interation);
  }

  restCalc = (sumCalc * 10) % 11;
  if (restCalc === 10 || restCalc === 11) {
    restCalc = 0;
  }

  if (restCalc !== parseInt(strCPF.charAt(9), 10)) {
    return false;
  }

  // Check the second validation digit
  sumCalc = 0;
  for (interation = 0; interation < 10; interation++) {
    sumCalc += parseInt(strCPF.charAt(interation), 10) * (11 - interation);
  }

  restCalc = (sumCalc * 10) % 11;
  if (restCalc === 10 || restCalc === 11) {
    restCalc = 0;
  }

  if (restCalc !== parseInt(strCPF.charAt(10), 10)) {
    return false;
  }

  return true;
}

export function isEmail(email: string): boolean {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export function isCNPJ(value: number | string): boolean {
  if (!value) return false;

  // Aceita receber o valor como string, número ou array com todos os dígitos
  const validTypes =
    typeof value === "string" ||
    Number.isInteger(value) ||
    Array.isArray(value);

  // Elimina valor em formato inválido
  if (!validTypes) return false;

  // Guarda um array com todos os dígitos do valor
  const match = value.toString().match(/\d/g);
  const numbers = Array.isArray(match) ? match.map(Number) : [];

  // Valida a quantidade de dígitos
  if (numbers.length !== 14) return false;

  // Elimina inválidos com todos os dígitos iguais
  const items = [...numbers];
  if (items.length === 1) return false;

  // Cálculo validador
  const calc = (x: number) => {
    const slice = numbers.slice(0, x);
    let factor = x - 7;
    let sum = 0;

    for (let i = x; i >= 1; i--) {
      const n = slice[x - i];
      sum += n * factor--;
      if (factor < 2) factor = 9;
    }

    const result = 11 - (sum % 11);

    return result > 9 ? 0 : result;
  };

  // Separa os 2 últimos dígitos de verificadores
  const digits = numbers.slice(12);

  // Valida 1o. dígito verificador
  const digit0 = calc(12);
  if (digit0 !== digits[0]) return false;

  // Valida 2o. dígito verificador
  const digit1 = calc(13);
  return digit1 === digits[1];
}

export function isMMYY(date: string): boolean {
  if (date.length !== 5) {
    return false;
  }

  if (date.indexOf("/") < 0) {
    return false;
  }

  if (
    !validator.isNumeric(date[0]) ||
    !validator.isNumeric(date[1]) ||
    date[2] !== "/" ||
    !validator.isNumeric(date[3]) ||
    !validator.isNumeric(date[4])
  ) {
    return false;
  }

  return true;
}

export function isCVCExpired(date: string): boolean {
  const completeYear = moment().year();
  const todayYear = String(completeYear).substr(2);
  const todayMonth = moment().month() + 1;

  const month = date.split("/")[0];
  const year = date.split("/")[1];

  if (Number(month) < 1 || Number(month) > 12) {
    return true;
  }
  if (year === todayYear && +month <= todayMonth) {
    return true;
  }
  if (year < todayYear) {
    return true;
  }

  return false;
}
