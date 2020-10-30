type Product = {
  id: string;
  width: number;
  height: number;
  length: number;
  weight: number;
  insurance_value: number;
  quantity: number;
};

type ShippingData = {
  to: { postal_code: string };
  products: Array<Product>;
};

export default ShippingData;
