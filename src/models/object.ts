import { Schema, model } from "mongoose";
import { ObjectId } from "mongodb";
import { ObjectIdentity } from "../interfaces";

const objectSchema = new Schema<ObjectIdentity>({
  itemId: { type: ObjectId, ref: "Item" },
  createdUser: { type: ObjectId, ref: "User" },
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: Array, required: true },
});

const objectModel = model<ObjectIdentity>("Objects", objectSchema);
export { objectModel, objectSchema };
