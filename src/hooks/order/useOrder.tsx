import _cloneDeep from "lodash/cloneDeep";
import React, { createContext, useContext, useState } from "react";
import Address from "../../modules/address/Address";
import Coupon from "../../modules/coupon";
import MelhorEnvioShipping from "../../modules/melhorEnvio/MelhorEnvio";
import {
  MercadoPagoCreditCard,
  MercadoPagoOtherPaymentMethod,
} from "../../modules/mercadoPago/MercadoPago";
import Product from "../../modules/product/Product";

type Order = {
  isValid: boolean;
  user: {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
  payment: MercadoPagoCreditCard | MercadoPagoOtherPaymentMethod;
  products: Array<Product>;
  address: Address;
  coupon: Coupon;
  shipping: MelhorEnvioShipping;
};

export interface IOrderContextProps {
  order: Order;
  setAddress: (address: Address) => void;
  setShipping: (shipping: MelhorEnvioShipping) => void;
  setPayment: (
    payment: MercadoPagoCreditCard | MercadoPagoOtherPaymentMethod
  ) => void;
}

const OrderContext = createContext({} as IOrderContextProps);

export function OrderProvider({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const order = useOrderProvider();
  return (
    <OrderContext.Provider value={order}>{children}</OrderContext.Provider>
  );
}

export const useOrder = (): IOrderContextProps => {
  return useContext(OrderContext);
};

function useOrderProvider() {
  const initialState = {
    isValid: false,
    user: {
      id: null,
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
    },
    payment: null,
    products: [],
    address: null,
    coupon: null,
    shipping: null,
  };

  const [order, setOrder] = useState(initialState);

  const setAddress = (address: Address) => {
    const _order = _cloneDeep(order);
    _order.address = address;
    setOrder(_order);
  };

  const setShipping = (shipping: MelhorEnvioShipping) => {
    const _order = _cloneDeep(order);
    _order.shipping = shipping;
    setOrder(_order);
  };

  const setPayment = (
    payment: MercadoPagoCreditCard | MercadoPagoOtherPaymentMethod
  ) => {
    const _order = _cloneDeep(order);
    _order.payment = payment;
    setOrder(_order);
  };

  return {
    order,
    setAddress,
    setShipping,
    setPayment,
  };
}

export default OrderProvider;
