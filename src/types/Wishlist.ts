import Product from "./Product";

type Wishlist = {
  _id?: string;
  userId?: string;
  items: Array<Product>;
};

export default Wishlist;
