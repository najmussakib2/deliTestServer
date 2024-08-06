import { Schema, model } from "mongoose";

const divisionSchema = new Schema({
  id: {
      type: String,
      required: true,
      unique: true
  },
  name: {
      type: String,
      required: true
  },
  bn_name: {
      type: String,
      required: true
  },
  url: {
      type: String,
      required: true
  }
});

const districtSchema = new Schema({
  id: {
      type: String,
      required: true,
      unique: true
  },
  division_id: {
      type: String,
      required: true
  },
  name: {
      type: String,
      required: true
  },
  bn_name: {
      type: String,
      required: true
  },
  lat: {
      type: String,
      required: true
  },
  lon: {
      type: String,
      required: true
  },
  url: {
      type: String,
      required: true
  }
});

const upazillaSchema = new Schema({
  id: {
      type: String,
      required: true,
      unique: true
  },
  district_id: {
      type: String,
      required: true
  },
  name: {
      type: String,
      required: true
  },
  bn_name: {
      type: String,
      required: true
  },
  url: {
      type: String,
      required: true
  }
});

const unionSchema = new Schema({
  id: {
      type: String,
      required: true,
      unique: true
  },
  upazilla_id: {
      type: String,
      required: true
  },
  name: {
      type: String,
      required: true
  },
  bn_name: {
      type: String,
      required: true
  },
  url: {
      type: String,
      required: true
  }
});

export const Union = model('Union', unionSchema);
export const Upazilla = model('Upazilla', upazillaSchema);
export const District = model('District', districtSchema);
export const Division = model('Division', divisionSchema);