import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { geoServices } from "./geoData.service.js";

const getAllGeoData= catchAsync(async (req,res)=>{
        const result = await geoServices.getAllGeoDataFromDB(req.query);    
        sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: 'geo data are retrieved successfully',
          meta: result.meta,
          data: result.data,
        });
    
});
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