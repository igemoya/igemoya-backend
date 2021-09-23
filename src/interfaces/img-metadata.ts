import { ObjectId } from "mongodb";
import { geoJSON } from "./location";
import { exhibitionGeoType } from "../types";

export interface ImgIdentity {
  //DB Schema
  uploader: ObjectId;
  model: string;
  location?: {
    type: exhibitionGeoType;
    coordinates: Array<number>;
  };
}
