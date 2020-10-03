import Address from "../address/Address";

export enum LoginType {
  GOOGLE = "GOOGLE",
  FACEBOOK = "FACEBOOK",
  EMAIL_PASSWORD = "EMAIL_PASSWORD",
}

export enum Gender {
  FEMALE = "F",
  MALE = "M",
  NON_BINARY = "NB",
  NOT_DEFININED = "ND",
}

type User = {
  id?: string;
  name: string;
  email?: string;
  isEmailVerified?: boolean;
  phoneNumber?: string;
  picture?: string;
  uid: string;
  loginType: LoginType;
  gender?: Gender;
  dateOfBirth?: Date;
  addresses?: Array<Address>;
};

export default User;
