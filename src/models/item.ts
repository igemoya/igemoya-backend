import { Schema, model } from "mongoose";
import { ObjectId } from "mongodb";
import { exhibitionGeoTypeValues } from "../types";
import { ItemIdentity } from "../interfaces";

const itemSchema = new Schema<ItemIdentity>({
  exhibitionId: { type: ObjectId, ref: "Exhibition" },
  createdUser: { type: ObjectId, ref: "User" },
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: Array, required: true },
  location: {
    coordinates: {
      type: [Number],
      required: true,
      index: "2dsphere",
    },
    type: { type: String, enum: exhibitionGeoTypeValues },
  },
  maxDistance: { type: Number, required: true },
});

const itemModel = model<ItemIdentity>("Item", itemSchema);
export { itemSchema, itemModel };
