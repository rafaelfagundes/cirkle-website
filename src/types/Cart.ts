import Address from "./Address";
import Shipping from "./CartShipping";
import Payment from "./Payment";
import Product from "./Product";

type Cart = {
  _id?: string;
  items: Array<Product>;
  shipping: Shipping;
  address: Address;
  payment: Payment;
  subtotal: number;
  total: number;
  freeShipping: boolean;
  freeShippingValue: number;
};

export default Cart;
