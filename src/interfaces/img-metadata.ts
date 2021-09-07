import { ObjectId } from "mongodb";
import { coordinate, exhibitionGeoType } from "../types";

export interface imgMeta {
  //API server로 들어오는 데이터
  imgToken: string;
  location: {
    type: exhibitionGeoType;
    coordinate: coordinate;
  };
}

export interface imgserverMeta {
  //imgToken의 데이터
  imgId: ObjectId;
  filename: string;
}

export interface imgIdentity {
  //DB Schema
  uploader: ObjectId;
  filename: string;
  location?: {
    type: exhibitionGeoType;
    coordinate: coordinate;
  };
}
