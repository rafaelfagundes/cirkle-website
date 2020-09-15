type User = {
  _id: string;
  name: string;
  email?: string;
  email_verified?: boolean;
  phone_number?: string;
  picture?: string;
  uid: string;
  created_at: Date;
};

export default User;
