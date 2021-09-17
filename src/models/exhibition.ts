import { Schema, model } from "mongoose";
import { ObjectId } from "mongodb";
import { exhibitionGeoTypeValues } from "../types";
import { ExhibitionIdentity } from "../interfaces";

const exhibitionSchema = new Schema<ExhibitionIdentity>({
  createdUser: { type: ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: Array, required: true },
  location: {
    type: {
      type: String,
      enum: exhibitionGeoTypeValues,
    },
    coordinates: {
      type: [Number],
      required: true,
      index: "2dsphere",
    },
  },
  maxDistance: { type: Number, required: true },
});

const exhibitionModel = model<ExhibitionIdentity>(
  "Exhibitions",
  exhibitionSchema
);

export { exhibitionSchema, exhibitionModel };
