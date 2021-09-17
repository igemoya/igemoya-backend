import { ObjectId } from "mongodb";
import { coordinates, exhibitionGeoType } from "../types";

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
    coordinates: coordinates;
  };
  maxDistance: number;
}
export interface ExhibitionIdentity {
  createdUser?: ObjectId;
  name: string;
  description: string;
  images: string[];
  location: {
    type: exhibitionGeoType;
    coordinates: coordinates;
  };
  maxDistance: number;
}
