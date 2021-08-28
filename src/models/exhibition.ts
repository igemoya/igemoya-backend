import { Schema, model } from "mongoose";
import { ObjectId } from "mongodb";
import { exhibitionGeoTypeValues } from "../types";
import {
  ObjectIdentity,
  ItemIdentity,
  ExhibitionIdentity,
} from "../interfaces";

const exhibitionSchema = new Schema<ExhibitionIdentity>({
  createdUser: { type: ObjectId, ref: "User" },
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: Array, required: true },
  location: {
    coordinate: { type: Array, required: true },
    type: { type: String, enum: exhibitionGeoTypeValues },
  },
});

const exhibitionModel = model<ExhibitionIdentity>(
  "Exhibitions",
  exhibitionSchema
);
export { exhibitionSchema, exhibitionModel };
