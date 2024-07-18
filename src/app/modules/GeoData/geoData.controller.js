import { geoServices } from "./geoData.service.js";

const getAllGeoData= async ()=>{

    try {
        const result = await geoServices.getAllGeoDataFromDB();
    
        res.status(200).json({
          success: true,
          message: "massages are retrieved succesfully",
          data: result,
        });
      } catch (err) {
        console.log(err);
      }
    
}
const getAllDivisionData = async()=>{
    try {
        const result = await geoServices.getAllDivisionDataFromDB();
    
        res.status(200).json({
          success: true,
          message: "massages are retrieved succesfully",
          data: result,
        });
      } catch (err) {
        console.log(err);
      }

}
const getAllDistrictData = async()=>{
    try {
        const result = await geoServices.getAllDistrictDataFromDB();
    
        res.status(200).json({
          success: true,
          message: "massages are retrieved succesfully",
          data: result,
        });
      } catch (err) {
        console.log(err);
      }

}
const getAllUpozillaData = async()=>{
    try {
        const result = await geoServices.getAllUpozillaDataFromDB();
    
        res.status(200).json({
          success: true,
          message: "massages are retrieved succesfully",
          data: result,
        });
      } catch (err) {
        console.log(err);
      }

}
const getAllUnionData = async()=>{
    try {
        const result = await geoServices.getAllUnionDataFromDB();
    
        res.status(200).json({
          success: true,
          message: "massages are retrieved succesfully",
          data: result,
        });
      } catch (err) {
        console.log(err);
      }

}

export const geoController = {
    getAllGeoData,
    getAllDivisionData,
    getAllDistrictData,
    getAllUpozillaData,
    getAllUnionData
  };