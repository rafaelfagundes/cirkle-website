import Product from "../product/Product";

export enum PaymentType {
  CREDIT_CARD = "CREDIT_CARD",
  PIX = "PIX",
  BOLETO = "BOLETO",
  BANK_TRANSFER = "BANK_TRANSFER",
}

export enum PaymentStatus {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  PENDING = "PENDING",
}

export enum OrderStatus {
  RECEIVED = "RECEIVED",
  PAYMENT_ERROR = "PAYMENT_ERROR",
  PAYMENT_PENDING = "PAYMENT_PENDING",
  PAYMENT_CONFIRMED = "PAYMENT_CONFIRMED",
  PRE_SHIPPING = "PRE_SHIPPING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELED = "CANCELED",
}

export type OrderPayment = {
  type: PaymentType;
  paymentLink?: string;
  status: PaymentStatus;
};

type Order = {
  id: string;
  date: Date;
  status: OrderStatus;
  items: Array<Product>;
  payment: OrderPayment;
};

export default Order;
