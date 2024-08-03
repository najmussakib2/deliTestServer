import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { shopServices } from "./shop.service.js";
import ShopZodSchema from "./shop.zodValidation.js";


const createShop = catchAsync(async (req, res) => {
    const shop = req.body;
    const zodParsedData = ShopZodSchema.parse(shop);
    const result = await shopServices.createShopInDB(zodParsedData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'merchant is created successfully',
      data: result,
    });
    console.log(result)


});

const getAllShops = async (req, res) => {
  try {
    const result = await shopServices.getAllShopsFromDB();

    res.status(200).json({
      success: true,
      message: 'shops are retrieved succesfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSpecificShopForMarchant = async (req, res) => {
  try {
    const { email } = req.params;

    const result = await shopServices.getMerchantSpecificShopFromDB(email);
    console.log(result);
    res.status(200).json({
      success: true,
      message: 'shop is retrieved succesfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteShop = async (req, res) => {
  try {

    const Id = req.params.id;
    const result = await shopServices.deleteShopFromDB(Id);

    if (result.deletedCount === 1) {
      console.log("Successfully deleted one document.");
      res.status(200).json({
        success: true,
        message: "shop is succesfully deleted",
        data: result,
      });
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    }


  } catch (err) {
    console.log(err);
  }
};

export const shopController = {
  createShop,
  getAllShops,
  getSpecificShopForMarchant,
  deleteShop

}