import Address from "../address/Address";
import Payment from "../payment/Payment";
import Product from "../product/Product";
import Shipping from "./CartShipping";

type Cart = {
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
