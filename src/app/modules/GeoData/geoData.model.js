import { Schema, model } from "mongoose";

const geoDataSchema = new Schema({
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    }
  });

export const geoData = model('geoData', geoDataSchema);