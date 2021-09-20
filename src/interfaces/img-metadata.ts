import { ObjectId } from "mongodb";
import { geoJSON } from "./location";
import { exhibitionGeoType } from "../types";

export interface imgMeta extends geoJSON {
  //Client에서 들어오는 데이터
  imgId: ObjectId;
  imgLocation: string;
}

export interface ImgIdentity {
  //DB Schema
  uploader: ObjectId;
  filename: string;
  location?: {
    type: exhibitionGeoType;
    coordinates: Array<number>;
  };
}
