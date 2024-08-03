import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { shopServices } from "./shop.service.js";
import ShopZodSchema from "./shop.zodValidation.js";


const createShop = catchAsync(async (req, res) => {
    const shop = req.body;
    console.log(shop)
    // const zodParsedData = ShopZodSchema.parse(shop);
    const result = await shopServices.createShopInDB(shop);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Shop is created successfully',
      data: result,
    });
});

const getAllShops =  catchAsync(async (req, res) => {
 
    const result = await shopServices.getAllShopsFromDB(req.query);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'parcels are retrieved successfully',
      meta: result.meta,
      data: result.data,
    });

});

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