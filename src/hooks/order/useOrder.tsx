import React, { createContext, useContext, useState } from "react";
import Address from "../../modules/address/Address";
import Coupon from "../../modules/coupon";
import MelhorEnvioShipping from "../../modules/melhorEnvio/MelhorEnvio";
import Product from "../../modules/product/Product";
import {
  MercadoPagoCreditCard,
  MercadoPagoOtherPaymentMethod,
} from "../../utils/mercadoPago";

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
  const [order, setOrder] = useState();

  return {
    order,
  };
}

export default OrderProvider;
