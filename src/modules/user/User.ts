export enum LoginType {
  GOOGLE = "GOOGLE",
  FACEBOOK = "FACEBOOK",
  EMAIL_PASSWORD = "EMAIL_PASSWORD",
}

type User = {
  _id?: string;
  name: string;
  email?: string;
  isEmailVerified?: boolean;
  phoneNumber?: string;
  picture?: string;
  uid: string;
  createdAt?: Date;
  loginType: LoginType;
};

export default User;
