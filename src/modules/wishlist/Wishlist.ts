import Product from "../product/Product";

type Wishlist = {
  id?: string;
  products: Array<Product>;
  updated_at?: Date;
};

export default Wishlist;
