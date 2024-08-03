import httpStatus from "http-status";
import AppError from "../../errors/AppError.js";
import { User } from "../User/user.model.js";
import {Shop} from "./shop.model.js"
import { USER_ROLE } from "../User/user.constant.js";

const createShopInDB = async(shopData)=>{
    console.log(shopData);
    const user = User.findOne({Phone: shopData.Phone});
    if(!user){
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    if(user.role === USER_ROLE.admin || USER_ROLE.superAdmin){
      throw new AppError(httpStatus.FORBIDDEN, 'cant create shop with superAdmin or admin Mobile No. !');
    }
    const result = await Shop.create(shopData);
    return result
}

const getAllShopsFromDB = async () => {
    const result = await Shop.find();
    return result;
  };

  const getMerchantSpecificShopFromDB = async (email) => {
    console.log('Email:', email);
    const result = await Shop.find({ Merchant_Email: email });
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