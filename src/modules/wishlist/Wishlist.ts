import Product from "../product/Product";

type Wishlist = {
  userId?: string;
  items: Array<Product>;
};

export default Wishlist;
