import PaymentType from "../enums/PaymentType";

type Payment = {
  type: PaymentType;
  creditCardNumber?: number;
  cardHolderName?: string;
  validUntil?: Date;
  cvv?: number;
};

export default Payment;
