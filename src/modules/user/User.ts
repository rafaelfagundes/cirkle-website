export enum LoginType {
  GOOGLE = "GOOGLE",
  FACEBOOK = "FACEBOOK",
  EMAIL_PASSWORD = "EMAIL_PASSWORD",
}

export enum Gender {
  F = "F",
  M = "M",
  NB = "NB",
  ND = "ND",
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
  gender?: Gender;
  dateOfBirth?: Date;
};

export default User;
