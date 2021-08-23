import { Schema, model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { exhibitionGeoTypeValues } from '../types';

const objectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: Array, required: true },
}, { timestamps: true });

const itemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: Array, required: true },
  location: {
    coordinate: { type: Array, required: true },
    type: { type: String, enum: exhibitionGeoTypeValues }
  },
  objects: [objectSchema]
}, { timestamps: true });

const exhibitionSchema = new Schema({
  createdUser: { type: ObjectId, ref: 'User' },
  name: { type: String, required: true },
  images: { type: Array, required: true },
  location: {
    coordinate: { type: Array, required: true },
    type: { type: String, enum: exhibitionGeoTypeValues }
  },
  items: [itemSchema]
});

const exhibitionModel = model('Exhibition', exhibitionSchema);

export { exhibitionSchema, exhibitionModel };