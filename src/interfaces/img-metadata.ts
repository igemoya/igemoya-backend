import { ObjectId } from "mongodb";
import { coordinates, exhibitionGeoType } from "../types";

export interface imgMeta {
  //API server로 들어오는 데이터
  imgToken: string;
  location: {
    type: exhibitionGeoType;
    coordinates: coordinates;
  };
}

export interface imgserverMeta {
  //imgToken Payload
  imgId: ObjectId;
  filename: string;
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
