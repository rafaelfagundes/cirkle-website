import PaymentType from "../../enums/PaymentType";

type Payment = {
  type: PaymentType;
  creditCardNumber?: string;
  cardHolderName?: string;
  validUntil?: string;
  cvv?: number;
};

export default Payment;
