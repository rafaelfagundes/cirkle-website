import Address from "./Address";
import Payment from "./Payment";
import Product from "./Product";
import Shipping from "./Shipping";

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
