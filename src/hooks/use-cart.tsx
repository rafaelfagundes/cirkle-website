import _ from "lodash";
import React, { createContext, useContext, useEffect, useState } from "react";
import Address from "../modules/address/Address";
import Cart from "../modules/cart/Cart";
import Shipping from "../modules/cart/CartShipping";
import Product from "../modules/product/Product";

export interface ICartContextProps {
  cart: Cart;
  addToCart: (item: Product) => void;
  removeFromCart: (id: string) => void;
  isItemInCart: (id: string) => boolean;
  updateItem: (item: Product) => void;
  setShipping: (shipping: Shipping) => void;
  setAddress: (address: Address) => void;
  updateQuantity: (id: string, qty: number) => void;
  updateColor: (id: string, color: string) => void;
  updateSize: (id: string, size: string) => void;
  updateFreeShipping: (active: boolean, value: number) => void;
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
    freeShipping: false,
    freeShippingValue: 600,
  };

  let savedCart: Cart;
  if (process.browser) {
    savedCart = JSON.parse(localStorage.getItem("cart"));
  }
  const [cart, setCart] = useState(savedCart ? savedCart : emptyCart);

  function calculateValues(newCart: Cart): { subtotal: number; total: number } {
    const subtotal = newCart.items.reduce((sum, item) => {
      return sum + item.price * item.cartQty;
    }, 0);
    const shippingValue = newCart?.shipping ? newCart?.shipping.value : 0;

    let total = 0;
    if (newCart.freeShipping) {
      if (subtotal >= newCart.freeShippingValue) {
        total = subtotal;
      } else {
        total = subtotal + shippingValue;
      }
    } else {
      total = subtotal + shippingValue;
    }

    return { subtotal, total };
  }

  const addToCart = (item: Product) => {
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

  const isItemInCart = (id: string): boolean => {
    const item = _.find(cart.items, (o) => o.id === id);

    if (item) return true;
    else return false;
  };

  const updateItem = (item: Product) => {
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

  const updateFreeShipping = (active: boolean, value: number) => {
    const _cart = _.cloneDeep(cart);
    _cart.freeShipping = active;
    _cart.freeShippingValue = value;

    const { subtotal, total } = calculateValues(_cart);
    _cart.total = total;
    _cart.subtotal = subtotal;

    setCart(_cart);
  };

  const updateQuantity = (id: string, qty: number) => {
    const _item = _.find(cart.items, (o) => o.id === id);
    if (_item) {
      _item.cartQty = qty;
      updateItem(_item);
    }
  };

  const updateColor = (id: string, color: string) => {
    const _item = _.find(cart.items, (o) => o.id === id);
    if (_item) {
      _item.cartColor = color;
      updateItem(_item);
    }
  };

  const updateSize = (id: string, size: string) => {
    const _item = _.find(cart.items, (o) => o.id === id);
    if (_item) {
      _item.cartSize = size;
      updateItem(_item);
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return {
    cart,
    addToCart,
    removeFromCart,
    isItemInCart,
    updateItem,
    setShipping,
    setAddress,
    updateQuantity,
    updateColor,
    updateSize,
    updateFreeShipping,
  };
}

export default CartProvider;
