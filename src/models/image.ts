import { Schema, model } from "mongoose";
import { ObjectId } from "mongodb";
import { ImgIdentity } from "../interfaces";
import { exhibitionGeoTypeValues } from "../types";
import config from "../config";

const imageMetaSchema = new Schema<ImgIdentity>({
  uploader: { type: ObjectId, required: true, ref: "User" },
  model: { type: String, required: true },
  location: {
    coordinates: {
      type: [Number],
      required: true,
      index: "2dsphere",
    },
    type: { type: String, enum: exhibitionGeoTypeValues },
  },
  createdAt: {
    type: Date,
    expires: parseInt(config.logExpires),
    default: Date.now,
  },
});

const imageMetaModel = model<ImgIdentity>("ImageMeta", imageMetaSchema);

export { imageMetaModel, imageMetaSchema };
