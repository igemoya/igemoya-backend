import { ObjectId } from "mongodb";
import { coordinate, exhibitionGeoType } from "../types";

export interface ObjectIdentity {
  exhibitionId?: ObjectId;
  createdUser?: ObjectId;
  itemId?: ObjectId;
  name: string;
  description: string;
  images: string;
}
export interface ItemIdentity {
  exhibitionId?: ObjectId;
  createdUser?: ObjectId;
  name: string;
  description: string;
  images: string[];
  location: {
    type: exhibitionGeoType;
    coordinate: coordinate;
  };
}
export interface ExhibitionIdentity {
  createdUser?: ObjectId;
  name: string;
  description: string;
  images: string[];
  location: {
    type: exhibitionGeoType;
    coordinate: coordinate;
  };
}
