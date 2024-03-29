import Axios from "axios";
import _cloneDeep from "lodash/cloneDeep";
import _find from "lodash/find";
import _findIndex from "lodash/findIndex";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AssetType, SelectItem } from "../../components/Atoms/SelectMenu";
import Address from "../../modules/address/Address";
import Cart from "../../modules/cart/Cart";
import Shipping from "../../modules/cart/CartShipping";
import { getLowestShippingPrice } from "../../modules/melhorEnvio/MelhorEnvio";
import Payment from "../../modules/payment/Payment";
import Product from "../../modules/product/Product";
import ShippingData from "../../modules/shippingData/ShippingData";
import { logEventWithParams } from "../../utils/logs";

export interface ICartContextProps {
  cart: Cart;
  addToCart: (item: Product) => void;
  removeFromCart: (id: string) => void;
  isItemInCart: (id: string) => boolean;
  updateItem: (item: Product) => void;
  setShipping: (shipping: Shipping) => void;
  setShippingList: (shippingList: Array<SelectItem>) => void;
  setAddress: (address: Address) => void;
  updateQuantity: (id: string, qty: number) => void;
  updateColor: (id: string, color: string) => void;
  updateSize: (id: string, size: string) => void;
  updateFreeShipping: (active: boolean, value: number) => void;
  isShippingFree: () => boolean;
  emptyCart: () => void;
  calculateShipping: (postalCode: string) => Promise<void>;
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
  const initialState: Cart = {
    items: [],
    shipping: null,
    address: null,
    payment: null,
    subtotal: 0,
    total: 0,
    freeShipping: false,
    freeShippingValue: 0,
    shippingList: [],
    loadingShipping: false,
  };

  let savedCart: Cart;
  if (process.browser) {
    savedCart = JSON.parse(localStorage.getItem("cart"));
  }
  const [cart, setCart] = useState(savedCart ? savedCart : initialState);

  function calculateValues(newCart: Cart): { subtotal: number; total: number } {
    const subtotal = newCart.items.reduce((sum, item) => {
      return sum + item.price * item.cartQty;
    }, 0);

    const shippingValue =
      newCart?.shippingList?.filter((o) => o.selected)[0]?.secondaryValue || 0;

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
    const _cart = _cloneDeep(cart);
    _cart.items.push(item);

    const { subtotal, total } = calculateValues(_cart);
    _cart.total = total;
    _cart.subtotal = subtotal;

    logEventWithParams("add_to_cart", {
      currency: "BRL",
      items: [
        {
          item_id: item.uid,
          item_name: item.title,
          item_brand: item.brand.name,
          item_category: item.subCategory.slug,
          item_variant: item.cartColor,
          price: item.price,
          currency: "BRL",
          quantity: 1,
        },
      ],
      value: item.price,
    });
    setCart(_cart);
  };

  const removeFromCart = (id: string) => {
    const _cart = _cloneDeep(cart);
    const item = _cart.items.filter((o) => o.id === id)[0];
    const _newItems = _cart.items.filter((o) => o.id !== id);
    _cart.items = _newItems;

    const { subtotal, total } = calculateValues(_cart);
    _cart.total = total;
    _cart.subtotal = subtotal;

    logEventWithParams("remove_from_cart", {
      currency: "BRL",
      items: [
        {
          item_id: item.uid,
          item_name: item.title,
          item_brand: item.brand.name,
          item_category: item.subCategory.slug,
          item_variant: item.cartColor,
          price: item.price,
          currency: "BRL",
          quantity: 1,
        },
      ],
      value: item.price,
    });

    setCart(_cart);
  };

  const isItemInCart = (id: string): boolean => {
    const item = _find(cart.items, (o) => o.id === id);

    if (item) return true;
    else return false;
  };

  const updateItem = (item: Product) => {
    const _cart = _cloneDeep(cart);
    const _index = _findIndex(_cart.items, (o) => o.id === item.id);
    if (_index < 0) {
      console.log("Não encontrado");
      return;
    }

    _cart.items[_index] = _cloneDeep(item);

    const { subtotal, total } = calculateValues(_cart);
    _cart.total = total;
    _cart.subtotal = subtotal;

    setCart(_cart);
  };

  const setShipping = (shipping: Shipping) => {
    const _cart = _cloneDeep(cart);

    _cart.shipping = shipping;

    const { subtotal, total } = calculateValues(_cart);
    _cart.total = total;
    _cart.subtotal = subtotal;

    setCart(_cart);
  };

  const setShippingList = (list: Array<SelectItem>) => {
    const _cart = _cloneDeep(cart);
    _cart.shippingList = list;

    const { subtotal, total } = calculateValues(_cart);
    _cart.total = total;
    _cart.subtotal = subtotal;
    _cart.loadingShipping = false;

    setCart(_cart);
  };

  const setAddress = (address: Address) => {
    const _cart = _cloneDeep(cart);
    _cart.address = address;

    setCart(_cart);
  };

  const setPayment = (payment: Payment) => {
    const _cart = _cloneDeep(cart);
    _cart.payment = payment;

    setCart(_cart);
  };

  const updateFreeShipping = (active: boolean, value: number) => {
    const _cart = _cloneDeep(cart);
    _cart.freeShipping = active;
    _cart.freeShippingValue = value;

    const { subtotal, total } = calculateValues(_cart);
    _cart.total = total;
    _cart.subtotal = subtotal;

    setCart(_cart);
  };

  const updateQuantity = (id: string, qty: number) => {
    const _cart = _cloneDeep(cart);
    const _item = _find(_cart.items, (o) => o.id === id);
    if (_item) {
      _item.cartQty = qty;
      updateItem(_item);
    }
  };

  const updateColor = (id: string, color: string) => {
    const _cart = _cloneDeep(cart);
    const _item = _find(_cart.items, (o) => o.id === id);
    if (_item) {
      _item.cartColor = color;
      updateItem(_item);
    }
  };

  const updateSize = (id: string, size: string) => {
    const _cart = _cloneDeep(cart);
    const _item = _find(_cart.items, (o) => o.id === id);
    if (_item) {
      _item.cartSize = size;
      updateItem(_item);
    }
  };

  const calculateShipping = async (_postalCode: string) => {
    console.log("_postalCode", _postalCode);
    if (!_postalCode) return;

    const _cart = _cloneDeep(cart);

    const postalCode = _postalCode.replace("-", "");

    const shippingData: ShippingData = {
      to: {
        postal_code: postalCode,
      },
      products: [],
    };

    cart.items.forEach((item) => {
      shippingData.products.push({
        height: item.pHeight,
        id: item.uid,
        insurance_value: item.price,
        length: item.pLength,
        quantity: item.cartQty,
        weight: item.pWeight,
        width: item.pWidth,
      });
    });

    try {
      const response = await Axios.post("/shippingcalc", shippingData);

      const _shippingList: Array<SelectItem> = [];

      const _sortedResponse = getLowestShippingPrice(response.data);

      _sortedResponse.forEach((item: any) => {
        const selected = item.id === cart?.shipping?.id;

        if (!item?.error) {
          _shippingList.push({
            assetType: AssetType.IMAGE,
            selected,
            text: `${item?.company?.name} ${item.name}`,
            value: item.id,
            assetValue: item?.company?.picture,
            secondaryText: `${item.currency} ${item.price} (${item.delivery_range.min} à ${item.delivery_range.max} dias úteis)`,
            secondaryValue: Number(item.price),
          });
        }
      });

      _cart.shipping = {
        id: null,
        postalCode: _postalCode,
        type: null,
        value: null,
      };
      _cart.shippingList = _shippingList;
      setCart(_cart);
    } catch (error) {
      console.dir(error);
    }
  };

  const isShippingFree = (): boolean => {
    return cart.freeShipping && cart.subtotal >= cart.freeShippingValue;
  };

  const emptyCart = () => {
    setCart(initialState);
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
    setPayment,
    updateQuantity,
    updateColor,
    updateSize,
    updateFreeShipping,
    setShippingList,
    isShippingFree,
    emptyCart,
    calculateShipping,
  };
}

export default CartProvider;
