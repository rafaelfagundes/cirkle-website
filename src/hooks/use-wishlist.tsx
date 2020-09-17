import axios from "axios";
import _ from "lodash";
import React, { createContext, useContext, useEffect, useState } from "react";
import Product from "../types/Product";
import Wishlist from "../types/Wishlist";
import { useAuth } from "./use-auth";

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
  let savedWishlist: Wishlist;

  if (process.browser) {
    savedWishlist = JSON.parse(localStorage.getItem("wishlist"));
  }

  const authContext = useAuth();

  const emptyWishlist: Wishlist = {
    items: [],
  };
  const [wishlist, setWishlist] = useState(
    savedWishlist ? savedWishlist : emptyWishlist
  );

  const getWishlist = async (id: string) => {
    const result = await axios.get("/api/wishlist", { params: { userId: id } });
    setWishlist(result.data.wishlist);
  };

  useEffect(() => {
    if (authContext?.user?.uid) {
      getWishlist(authContext.user.uid);
    }
  }, [authContext?.user?.uid]);

  const addToWishlist = (item: Product) => {
    const _wishlist = _.cloneDeep(wishlist);
    _wishlist.items.push(item);

    setWishlist(_wishlist);
  };

  const removeFromWishlist = (id: string) => {
    const _wishlist = _.cloneDeep(wishlist);
    const _newItems = _wishlist.items.filter((o) => o._id !== id);
    _wishlist.items = _newItems;

    setWishlist(_wishlist);
  };

  const isItemInWishlist = (id: string): boolean => {
    const item = _.find(wishlist.items, (o) => o._id === id);

    if (item) return true;
    else return false;
  };

  const updateWishlist = async (wishlist: Wishlist) => {
    const result = await axios.post("/api/wishlist", { wishlist });
    localStorage.setItem("wishlist", JSON.stringify(result.data.wishlist));
  };

  useEffect(() => {
    if (authContext.user) {
      const _wishlist = _.cloneDeep(wishlist);
      _wishlist.userId = authContext.user.uid;
      updateWishlist(_wishlist);
    } else {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist]);

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isItemInWishlist,
  };
}

export default WishlistProvider;
