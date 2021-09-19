import { ObjectId } from "mongodb";
import { coordinates, exhibitionGeoType } from "../types";

export interface imgMeta {
  //Client에서 들어오는 데이터
  imgId: ObjectId;
  imgLocation: string;
  location: {
    type: exhibitionGeoType;
    coordinates: coordinates;
  };
}

export interface ImgIdentity {
  //DB Schema
  uploader: ObjectId;
  filename: string;
  location?: {
    type: exhibitionGeoType;
    coordinates: coordinates;
  };
  createdAt?: Date;
}
