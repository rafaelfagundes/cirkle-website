export enum LoginType {
  GOOGLE = "GOOGLE",
  FACEBOOK = "FACEBOOK",
  EMAIL_PASSWORD = "EMAIL_PASSWORD",
}

type User = {
  _id: string;
  name: string;
  email?: string;
  email_verified?: boolean;
  phone_number?: string;
  picture?: string;
  uid: string;
  created_at: Date;
  login_type: LoginType;
};

export default User;
