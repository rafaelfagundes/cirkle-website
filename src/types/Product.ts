type Product = {
  _id?: string;
  id: string;
  sku: string;
  image: string;
  price: number;
  priceWhenNew: number;
  brand: string;
  title: string;
  description: string;
  qty: number;
  cartQty?: number;
  colors: Array<string>;
  cartColor?: string;
  sizes: Array<string>;
  cartSize?: string;
  viewCount: number;
  enabled: true;
};

export default Product;
