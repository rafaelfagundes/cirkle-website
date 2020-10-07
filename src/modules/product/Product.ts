import Brand from "../brand/Brand";
import Color from "../color/Color";
import Size from "../size/Size";

type Product = {
  id: string;
  sku: string;
  image: string;
  price: number;
  priceWhenNew: number;
  brand: Brand;
  title: string;
  description: string;
  qty: number;
  cartQty?: number;
  colors: Array<Color>;
  cartColor?: string;
  sizes: Array<Size>;
  cartSize?: string;
  viewCount: number;
  enabled: true;
};

export default Product;
