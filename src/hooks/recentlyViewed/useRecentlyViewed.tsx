import _ from "lodash";
import React, { createContext, useContext, useEffect, useState } from "react";
import Product from "../../modules/product/Product";
import RecentlyViewed from "../../modules/recentlyViewed/RecentlyViewed";

export interface IRecentlyViewedContextProps {
  recentlyViewed: RecentlyViewed;
  addToList: (item: Product) => void;
  removeAll: () => void;
}

const RecentlyViewedContext = createContext({} as IRecentlyViewedContextProps);

export function RecentlyViewedProvider({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const recentlyViewed = useRecentlyViewedProvider();
  return (
    <RecentlyViewedContext.Provider value={recentlyViewed}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export const useRecentlyViewed = (): IRecentlyViewedContextProps => {
  return useContext(RecentlyViewedContext);
};

function useRecentlyViewedProvider() {
  let savedRecentlyViewed: RecentlyViewed;

  if (process.browser) {
    savedRecentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed"));
  }

  const emptyRecentlyViewed: RecentlyViewed = {
    items: [],
  };

  const [recentlyViewed, setRecentlyViewed] = useState(
    savedRecentlyViewed ? savedRecentlyViewed : emptyRecentlyViewed
  );

  const addToList = (item: Product) => {
    const _list = _.cloneDeep(recentlyViewed);

    const hasProductInList = _.find(
      _list.items,
      (o: Product) => o.uid === item.uid
    );
    if (!hasProductInList) {
      setRecentlyViewed({
        items: [item, ..._list.items],
      });
    }
  };

  const removeAll = () => {
    localStorage.removeItem("recentlyViewed");
    setRecentlyViewed({ items: [] });
  };

  useEffect(() => {
    localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  return {
    recentlyViewed,
    addToList,
    removeAll,
  };
}

export default RecentlyViewedProvider;
