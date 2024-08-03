import { geoData } from "./geoData.model.js";

const getAllGeoDataFromDB = async () => {
    const result = await geoData.find();
    return result;
  };
const getAllDivisionDataFromDB = async () => {
    const result = await massage.find();
    return result;
  };
const getAllDistrictDataFromDB = async () => {
    const result = await massage.find();
    return result;
  };
const getAllUpozillaDataFromDB = async () => {
    const result = await massage.find();
    return result;
  };
const getAllUnionDataFromDB = async () => {
    const result = await massage.find();
    return result;
  };


export const geoServices = {
    getAllGeoDataFromDB,
    getAllDivisionDataFromDB,
    getAllDistrictDataFromDB,
    getAllUpozillaDataFromDB,
    getAllUnionDataFromDB
}