type Shipping = {
  _id?: string;
  freeShipping: FreeShipping;
};

type FreeShipping = {
  enabled: boolean;
  value: number;
};

export default Shipping;
