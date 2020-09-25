type Address = {
  _id?: string;
  street: string;
  number: number;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  postalCode: string;
  mainAddress?: boolean;
};

export default Address;
