import { Schema, model } from "mongoose";

const unionSchema = new Schema({
  id: String,
  upazilla_id: String,
  name: String,
  bn_name: String,
  url: String
});

// Define the Upazilla Schema
const upazillaSchema = new Schema({
  id: String,
  district_id: String,
  name: String,
  bn_name: String,
  url: String,
  unions: [unionSchema]
});

// Define the District Schema
const districtSchema = new Schema({
  id: String,
  division_id: String,
  name: String,
  bn_name: String,
  lat: String,
  lon: String,
  url: String,
  upazillas: [upazillaSchema]
});

// Define the Division Schema
const divisionSchema = new Schema({
  id: String,
  name: String,
  bn_name: String,
  url: String,
  districts: [districtSchema]
});



export const geoData = model('geoData', divisionSchema);