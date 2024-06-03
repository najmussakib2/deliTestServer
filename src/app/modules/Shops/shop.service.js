import {Shop} from "./shop.model.js"

const createShopInDB = async(shopData)=>{
    console.log(shopData);
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