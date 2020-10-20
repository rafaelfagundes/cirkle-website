import Brand from "../brand/Brand";
import Color from "../color/Color";
import Image from "../image/Image";
import Size from "../size/Size";

export type RootCategory = {
  title: string;
  slug: string;
  image: string;
  description: string;
  hits: number;
};

export type Category = {
  title: string;
  slug: string;
  image: string;
  description: string;
  hits: number;
  rootCategory: RootCategory;
};

export type SubCategory = {
  title: string;
  slug: string;
  image: string;
  description: string;
  hits: number;
  category: Category;
};

type Product = {
  id: string;
  uid: string;
  image: string;
  price: number;
  priceWhenNew: number;
  brand: Brand;
  title: string;
  description: string;
  infoColumn1?: string;
  infoColumn2?: string;
  infoColumn3?: string;
  qty: number;
  cartQty?: number;
  colors: Array<Color>;
  cartColor?: string;
  sizes: Array<Size>;
  cartSize?: string;
  viewCount: number;
  enabled: true;
  relatedItems?: Array<Product>;
  subCategory?: SubCategory;
  moreImages?: Array<Image>;
};

export default Product;
