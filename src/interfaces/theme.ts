import { ObjectId } from "bson";
import { geoJSON } from "./location";

export interface Theme extends geoJSON {
  title: string;
  image: string;
  createdUser: ObjectId;
}
