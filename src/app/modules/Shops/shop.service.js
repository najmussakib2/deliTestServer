import httpStatus from "http-status";
import AppError from "../../errors/AppError.js";
import { User } from "../User/user.model.js";
import {Shop} from "./shop.model.js"
import { USER_ROLE } from "../User/user.constant.js";
import QueryBuilder from "../../builder/QueryBuilder.js";

const createShopInDB = async(shopData)=>{
    console.log(shopData);
    const user = User.findOne({Mobile: shopData.Mobile});
    if(!user){
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    if(user.role === USER_ROLE.admin){
      throw new AppError(httpStatus.FORBIDDEN, 'cant create shop admin Mobile No. !');
    }
    if(user.role === USER_ROLE.superAdmin){
      throw new AppError(httpStatus.FORBIDDEN, 'cant create shop with superAdmin Mobile No. !');
    }
    const result = await Shop.create(shopData);
    return result
}

const getAllShopsFromDB = async (query) => {
  const resultQuery = new QueryBuilder(Shop.find(), query)
  .search(["Mobile","Parcel_Category","Shop_Name","Shop_Type"])  
  .filter()                        
  .sort({ createdAt: -1 })                          
  .fields()                        
  .paginate()                  
  .limit();                        
const result = await resultQuery.modelQuery;
const meta = await resultQuery.countTotal();
return { data: result, meta };
  };

  const getMerchantSpecificShopFromDB = async (Mobile) => {
    console.log('Email:', email);
    const result = await Shop.find({ Mobile: Mobile });
    console.log(result);
    return result;
  };

  const deleteShopFromDB = async (_id) => {
    const result = await Shop.deleteOne({ _id });
    return result;
  };

export const shopServices = {
    createShopInDB,
    getAllShopsFromDB,
    getMerchantSpecificShopFromDB,
    deleteShopFromDB
}