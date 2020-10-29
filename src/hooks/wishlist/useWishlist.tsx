import Axios from "axios";
import _cloneDeep from "lodash/cloneDeep";
import _find from "lodash/find";
import React, { createContext, useContext, useState } from "react";
import firebase from "../../config/firebase";
import Product from "../../modules/product/Product";
import Wishlist from "../../modules/wishlist/Wishlist";

firebase.auth().languageCode = "pt";

export interface IWishlistContextProps {
  wishlist: Wishlist;
  addToWishlist: (item: Product) => void;
  removeFromWishlist: (id: string) => void;
  isItemInWishlist: (id: string) => boolean;
  setWishlist: (wishlist: Wishlist) => void;
}

const WishlistContext = createContext({} as IWishlistContextProps);

export function WishlistProvider({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const wishlist = useWishlistProvider();
  return (
    <WishlistContext.Provider value={wishlist}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = (): IWishlistContextProps => {
  return useContext(WishlistContext);
};

function useWishlistProvider() {
  const [wishlist, setWishlist] = useState(null);

  const addToWishlist = (item: Product) => {
    console.log("add to wishlist");
    let _wishlist = _cloneDeep(wishlist);
    if (_wishlist?.products) {
      _wishlist.products.push(item);
    } else {
      _wishlist = { products: [item] };
    }

    setWishlist(_wishlist);
    updateWishlist(_wishlist);
  };

  const removeFromWishlist = (id: string) => {
    console.log("remove from wishlist");
    const _wishlist = _cloneDeep(wishlist);
    const _newItems = _wishlist.products.filter((o: Product) => o.id !== id);
    _wishlist.products = _newItems;

    setWishlist(_wishlist);
    updateWishlist(_wishlist);
  };

  const isItemInWishlist = (id: string): boolean => {
    if (!wishlist?.products) return false;
    const item = _find(wishlist.products, (o) => o.id === id);

    if (item) return true;
    else return false;
  };

  const updateWishlist = async (wishlist: Wishlist) => {
    try {
      await Axios.post("/wishlists", wishlist);
    } catch (error) {
      console.log("updateWishlist -> error", error);
    }
  };

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isItemInWishlist,
    setWishlist,
  };
}

export default WishlistProvider;
