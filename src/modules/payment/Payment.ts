import PaymentType from "../../enums/PaymentType";

type Payment = {
  _id?: string;
  type: PaymentType;
  creditCardNumber?: string;
  cardHolderName?: string;
  validUntil?: string;
  cvv?: number;
};

export default Payment;
