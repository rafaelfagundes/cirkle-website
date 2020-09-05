import _ from "lodash";
import React, { createContext, useContext, useEffect, useState } from "react";
import Product from "../types/Product";
import Wishlist from "../types/Wishlist";

export interface IWishlistContextProps {
  wishlist: Wishlist;
  addToWishlist: (item: Product) => void;
  removeFromWishlist: (id: string) => void;
  isItemInWishlist: (id: string) => boolean;
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
  const emptyWishlist: Wishlist = {
    items: [],
  };

  let savedWishlist: Wishlist;

  if (process.browser) {
    savedWishlist = JSON.parse(localStorage.getItem("wishlist"));
  }

  const [wishlist, setWishlist] = useState(
    savedWishlist ? savedWishlist : emptyWishlist
  );

  const addToWishlist = (item: Product) => {
    const _wishlist = _.cloneDeep(wishlist);
    _wishlist.items.push(item);

    setWishlist(_wishlist);
  };

  const removeFromWishlist = (id: string) => {
    const _wishlist = _.cloneDeep(wishlist);
    const _newItems = _wishlist.items.filter((o) => o.id !== id);
    _wishlist.items = _newItems;

    setWishlist(_wishlist);
  };

  const isItemInWishlist = (id: string): boolean => {
    const item = _.find(wishlist.items, (o) => o.id === id);

    if (item) return true;
    else return false;
  };

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isItemInWishlist,
  };
}

export default WishlistProvider;
