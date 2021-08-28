import { Schema, model } from "mongoose";
import { ObjectId } from "mongodb";
import { exhibitionGeoTypeValues } from "../types";
import {
  ObjectIdentity,
  ItemIdentity,
  ExhibitionIdentity,
} from "../interfaces";

const objectSchema = new Schema<ObjectIdentity>(
  {
    itemId: { type: ObjectId, ref: "Item" },
    name: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: Array, required: true },
  },
  { timestamps: true }
);

const objectModel = model<ObjectIdentity>("Objects", objectSchema);
export { objectModel, objectSchema };
