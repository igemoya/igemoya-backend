import { ObjectId } from "mongodb";
import { UserType } from "../types";

export interface UserBase {
  idx: string;
  username: string;
  profile_image: string;
  userType: UserType;
}

export interface User extends UserBase {
  _id: ObjectId;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Account {
  idx: string;
  password: string;
}
