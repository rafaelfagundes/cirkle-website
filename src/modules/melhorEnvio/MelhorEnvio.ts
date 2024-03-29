import _cloneDeep from "lodash/cloneDeep";
import _orderBy from "lodash/orderBy";
type MelhorEnvioProduct = {
  id: string;
  quantity: number;
};

type MelhorEnvioPackage = {
  price: string;
  discount: string;
  format: string;
  dimensions: { height: number; width: number; length: number };
  weight: string;
  insurance_value: string;
  products: Array<MelhorEnvioProduct>;
};

type MelhorEnvioShipping = {
  id: number;
  name: string;
  price: string;
  custom_price: string;
  discount: string;
  currency: string;
  delivery_time: number;
  delivery_range: { min: number; max: number };
  custom_delivery_time: number;
  custom_delivery_range: { min: number; max: number };
  packages: Array<MelhorEnvioPackage>;
  additional_services: {
    receipt: boolean;
    own_hand: boolean;
    collect: boolean;
  };
  company: {
    id: number;
    name: string;
    picture: string;
  };
  error?: any;
};

export const getLowestShippingPrice = (
  list: Array<MelhorEnvioShipping>
): Array<MelhorEnvioShipping> => {
  let newList = _cloneDeep(list);

  // Filter results with price only
  newList = newList.filter((o) => o.custom_price);

  newList.forEach((item: any) => {
    item["custom_price"] = Number(item.custom_price);
  });

  const orderedList = _orderBy(newList, ["custom_price"], ["asc"]);

  orderedList.forEach((item: any) => {
    item["custom_price"] = String(item.custom_price);
  });

  return orderedList;
};

export default MelhorEnvioShipping;
