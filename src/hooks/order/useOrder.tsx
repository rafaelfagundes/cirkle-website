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

export type OrderProductItem = {
  id: number;
  brand: {
    id: number;
    brand: string;
  };
  color: string;
  image: string;
  price: number;
  priceWhenNew: number;
  qty: number;
  size: string;
  title: string;
  uid: string;
};

export type OrderUser = {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

type Order = {
  user: OrderUser;
  payment: MercadoPagoCreditCard | MercadoPagoOtherPaymentMethod;
  products: Array<OrderProductItem>;
  address: Address;
  coupon: Coupon;
  shipping: MelhorEnvioShipping;
  orderResultData: any;
};

export interface IOrderContextProps {
  order: Order;
  setUser: (orderUser: OrderUser) => void;
  setAddress: (address: Address) => void;
  setAddressAndUser: (address: Address, orderUser: OrderUser) => void;
  setShipping: (shipping: MelhorEnvioShipping) => void;
  setPayment: (
    payment: MercadoPagoCreditCard | MercadoPagoOtherPaymentMethod
  ) => void;
  setProducts: (products: Array<Product>) => void;
  getSubtotal: () => number;
  getTotal: (freeShipping: boolean) => number;
  getShippingValue: () => number;
  setOrderResult: (orderResultData: any) => void;
  emptyOrder: () => void;
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
    user: null,
    payment: null,
    products: [],
    address: null,
    coupon: null,
    shipping: null,
    orderResultData: null,
  };

  const [order, setOrder] = useState(initialState);

  const setUser = (orderUser: OrderUser) => {
    const _order = _cloneDeep(order);
    _order.user = orderUser;
    setOrder(_order);
  };

  const setAddress = (address: Address) => {
    const _order = _cloneDeep(order);
    _order.address = address;
    setOrder(_order);
  };

  const setAddressAndUser = (address: Address, orderUser: OrderUser) => {
    const _order = _cloneDeep(order);
    _order.user = orderUser;
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

  const setProducts = (products: Array<Product>): void => {
    const simplifiedProducts = products.map((product: Product) => ({
      id: product.id,
      brand: {
        id: product.brand.id,
        name: product.brand.name,
      },
      cartColor: product.cartColor || product.colors[0].name,
      cartSize: product.cartSize || product.sizes[0].value,
      cartQty: product.cartQty,
      title: product.title,
      price: product.price,
      priceWhenNew: product.priceWhenNew,
      uid: product.uid,
      image: product.image,
    }));

    const _order = _cloneDeep(order);
    _order.products = simplifiedProducts;
    setOrder(_order);
  };

  const getSubtotal = (): number => {
    const subtotal = order.products.reduce((sum, item) => {
      return sum + item.price * item.cartQty;
    }, 0);

    return subtotal;
  };

  const getTotal = (freeShipping = false): number => {
    if (freeShipping) {
      return getSubtotal();
    }
    return getSubtotal() + Number(order?.shipping?.custom_price || 0);
  };

  const getShippingValue = (): number => {
    return order?.shipping?.custom_price || 0;
  };

  const setOrderResult = (orderResultData: any) => {
    const _order = _cloneDeep(order);
    _order.orderResultData = orderResultData;
    setOrder(_order);
  };

  const emptyOrder = () => {
    setOrder({
      user: null,
      payment: null,
      products: [],
      address: null,
      coupon: null,
      shipping: null,
      orderResultData: order.orderResultData,
    });
  };

  return {
    order,
    setAddress,
    setShipping,
    setPayment,
    setUser,
    setAddressAndUser,
    setProducts,
    getSubtotal,
    getTotal,
    getShippingValue,
    setOrderResult,
    emptyOrder,
  };
}

export default OrderProvider;
