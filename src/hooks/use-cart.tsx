import _ from "lodash";
import React, { createContext, useContext, useEffect, useState } from "react";

export type Cart = {
  items: Array<CartItem>;
  shipping: Shipping;
  address: Address;
  payment: Payment;
  subtotal: number;
  total: number;
};

export type CartItem = {
  id: string;
  sku: string;
  image: string;
  price: number;
  title: string;
  description: string;
  qty: number;
  color: string;
  size: string;
};

export type Shipping = {
  type: string;
  value: number;
  postalCode: number;
};

export type Address = {
  street: string;
  number: number;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  postalCode: number;
};

export enum PaymentType {
  CASH = "cash",
  CREDIT_CARD = "credit_card",
  BOLETO = "boleto",
}

export type Payment = {
  type: PaymentType;
  creditCardNumber?: number;
  cardHolderName?: string;
  validUntil?: Date;
  cvv?: number;
};

export interface ICartContextProps {
  cart: Cart;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateItem: (item: CartItem) => void;
  setShipping: (shipping: Shipping) => void;
  setAddress: (address: Address) => void;
  updateQuantity: (id: string, qty: number) => void;
  updateColor: (id: string, color: string) => void;
  updateSize: (id: string, size: string) => void;
}

const CartContext = createContext({} as ICartContextProps);

export function CartProvider({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const cart = useCartProvider();
  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

export const useCart = (): ICartContextProps => {
  return useContext(CartContext);
};

function useCartProvider() {
  const emptyCart: Cart = {
    items: [],
    shipping: {
      type: "express",
      value: 0,
      postalCode: 36309012,
    },
    address: null,
    payment: null,
    subtotal: 0,
    total: 0,
  };

  let savedCart: Cart;
  if (process.browser) {
    savedCart = JSON.parse(localStorage.getItem("cart"));
  }
  const [cart, setCart] = useState(savedCart ? savedCart : emptyCart);

  function calculateValues(newCart: Cart): { subtotal: number; total: number } {
    const subtotal = newCart.items.reduce((sum, item) => {
      return sum + item.price * item.qty;
    }, 0);
    const shippingValue = newCart?.shipping ? newCart?.shipping.value : 0;
    const total = subtotal + shippingValue;

    return { subtotal, total };
  }

  const addToCart = (item: CartItem) => {
    const _cart = _.cloneDeep(cart);
    _cart.items.push(item);

    const { subtotal, total } = calculateValues(_cart);
    _cart.total = total;
    _cart.subtotal = subtotal;

    setCart(_cart);
  };

  const removeFromCart = (id: string) => {
    const _cart = _.cloneDeep(cart);
    const _newItems = _cart.items.filter((o) => o.id !== id);
    _cart.items = _newItems;

    const { subtotal, total } = calculateValues(_cart);
    _cart.total = total;
    _cart.subtotal = subtotal;

    setCart(_cart);
  };

  const updateItem = (item: CartItem) => {
    const _cart = _.cloneDeep(cart);
    const _index = _.findIndex(_cart.items, (o) => o.id === item.id);
    if (_index < 0) {
      console.log("Não encontrado");
      return;
    }

    _cart.items[_index] = _.cloneDeep(item);

    const { subtotal, total } = calculateValues(_cart);
    _cart.total = total;
    _cart.subtotal = subtotal;

    setCart(_cart);
  };

  const setShipping = (shipping: Shipping) => {
    const _cart = _.cloneDeep(cart);
    _cart.shipping = shipping;

    const { subtotal, total } = calculateValues(_cart);
    _cart.total = total;
    _cart.subtotal = subtotal;

    setCart(_cart);
  };

  const setAddress = (address: Address) => {
    console.log("setAddress");
  };

  const updateQuantity = (id: string, qty: number) => {
    const _item = _.find(cart.items, (o) => o.id === id);
    if (_item) {
      _item.qty = qty;
      updateItem(_item);
    }
  };

  const updateColor = (id: string, color: string) => {
    const _item = _.find(cart.items, (o) => o.id === id);
    if (_item) {
      _item.color = color;
      updateItem(_item);
    }
  };

  const updateSize = (id: string, size: string) => {
    const _item = _.find(cart.items, (o) => o.id === id);
    if (_item) {
      _item.size = size;
      updateItem(_item);
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("cart", cart);
  }, [cart]);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateItem,
    setShipping,
    setAddress,
    updateQuantity,
    updateColor,
    updateSize,
  };
}

export default CartProvider;
