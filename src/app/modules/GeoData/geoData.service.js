

import QueryBuilder from "../../builder/QueryBuilder.js";
import { geoData } from "./geoData.model.js";

const getAllGeoDataFromDB = async (query) => {
  const resultQuery = new QueryBuilder(geoData.find(), query)
  .search(["id","_id","name","division_id","district_id","upazilla_id"])  
  .filter()                        
  .sort()                          
  .fields()
  .paginate()                  
  .limit();                                               
const result = await resultQuery.modelQuery;
const meta = await resultQuery.countTotal();
return { data: result, meta };
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