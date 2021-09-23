import { Schema, model } from "mongoose";
import { ObjectId } from "mongodb";
import { exhibitionGeoTypeValues } from "../types";
import { Theme } from "../interfaces";

const themeSchema = new Schema<Theme>({
  createdUser: { type: ObjectId, ref: "User" },
  title: { type: String, required: true },
  image: { type: String, required: true },
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

const themeModel = model<Theme>("Themes", themeSchema);
export { themeSchema, themeModel };
