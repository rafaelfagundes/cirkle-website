import _ from "lodash";
import React, { createContext, useContext, useState } from "react";

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
  setShippingType: (shipping: Shipping) => void;
  setAddress: (address: Address) => void;
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
  const _cart: Cart = {
    items: [
      {
        id: "d5b321a3-6ed3-41f3-aa2a-f970435f63d6",
        sku: "10bfbaeb-daad-4f8a-ab4b-7d76f208283c",
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        price: 499.99,
        title: "Nike Free",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        qty: 1,
        color: "Laranja",
        size: "38",
      },
      {
        id: "8e896ae1-7b24-4bb2-b7dd-af1d7f29d112",
        sku: "9b5e7ae7-9c20-4d05-9afd-bb652ddf55d0",
        image:
          "https://images.unsplash.com/photo-1545289414-1c3cb1c06238?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        price: 399.99,
        title: "Puma One",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        qty: 1,
        color: "Azul Escuro",
        size: "38",
      },
      {
        id: "87eb4a73-1522-48ca-8204-cba367769038",
        sku: "ecbfbcf7-c426-487d-a508-ce83332dcad5",
        image:
          "https://images.unsplash.com/photo-1581067675198-463d66478d0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1239&q=80",
        price: 359.99,
        title: "Nike Air Force 1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        qty: 1,
        color: "Bege",
        size: "38",
      },
    ],
    shipping: {
      type: "SEDEX",
      value: 50,
      postalCode: 36309012,
    },
    address: null,
    payment: null,
    subtotal: 1259.97,
    total: 1309.97,
  };

  const [cart, setCart] = useState(_cart);

  function calculateValues(
    items: Array<CartItem>
  ): { subtotal: number; total: number } {
    const subtotal = items.reduce((sum, item) => {
      return sum + item.price * item.qty;
    }, 0);
    const shippingValue = _cart?.shipping ? _cart?.shipping.value : 0;
    const total = subtotal + shippingValue;

    return { subtotal, total };
  }

  const addToCart = (item: CartItem) => {
    console.log("addToCart", item);

    const _cart = _.cloneDeep(cart);
    _cart.items.push(item);

    const { subtotal, total } = calculateValues(_cart.items);
    _cart.total = total;
    _cart.subtotal = subtotal;

    setCart(_cart);
  };

  const removeFromCart = (id: string) => {
    const _cart = _.cloneDeep(cart);
    const _newItems = _cart.items.filter((o) => o.id !== id);
    _cart.items = _newItems;

    const { subtotal, total } = calculateValues(_newItems);
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

    _cart.items[_index] = item;

    const { subtotal, total } = calculateValues(_cart.items);
    _cart.total = total;
    _cart.subtotal = subtotal;

    setCart(_cart);
  };

  const setShipping = (shipping: Shipping) => {
    console.log("setShippingType");
  };

  const setAddress = (address: Address) => {
    console.log("setAddress");
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateItem,
    setShippingType: setShipping,
    setAddress,
  };
}

export default CartProvider;
