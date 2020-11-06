import Address from "../address/Address";
import Payment from "../payment/Payment";
import Product from "../product/Product";
import { SelectItem } from "./../../components/SelectMenu";
import Shipping from "./CartShipping";

export type Company = {
  id: number;
  name: string;
  picture: string;
};

export type ShippingItem = {
  id: number;
  name: string;
  error?: string;
  company: Company;
};

type Cart = {
  items: Array<Product>;
  shipping: Shipping;
  address: Address;
  payment: Payment;
  subtotal: number;
  total: number;
  freeShipping: boolean;
  freeShippingValue: number;
  shippingList: Array<SelectItem>;
  loadingShipping: boolean;
};

export default Cart;
