import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { parcelServices } from "./parcel.service.js";

const createParcel = catchAsync(async (req, res) => {
  const result = await parcelServices.createParcelInDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'parcel is created successfully',
    data: result,
  });
});

const updateParcel = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await parcelServices.updateParcelIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'course is updated successfully',
    data: result,
  });
});


const updateParcelStatus = async (req, res) => {
  try {

    const  Id  = req.params.id;
    const {status}  = req.body;
    const result = await parcelServices.updateParcelStatusInDB(Id, status);

    res.status(200).json({
      success: true,
      message: "parcels are retrieved succesfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const updateParcelPayment = async (req, res) => {
  try {

    const  Id  = req.params.id;
    const {payment_status: payment}  = req.body;
    const result = await parcelServices.updateParcelPaymentInDB(Id, payment);

    res.status(200).json({
      success: true,
      message: "parcels are retrieved succesfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteSingleParcel = catchAsync(async (req, res) => {
  const  Id  = req.params.id;
  const result = await parcelServices.deleteSingleParcelFromDB(Id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'parcel is deleted successfully',
    data: result,
  });
});

const getAllParcels = catchAsync(async (req, res) => {
  const result = await parcelServices.getAllParcelsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'parcels are retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});


const getSpacificParcel = async (req, res) => {
  try {

    const id = req.params.id;
    console.log(id)
    const result = await parcelServices.getSpacificParcelFromDB(id);

    res.status(200).json({
      success: true,
      message: "parcels are retrieved succesfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSpacificParcelForMerchant = async (req, res) => {
  try {

    const email = req.params.email;
    const result = await parcelServices.getSpacificParcelForMerchantFromDB(email);

    res.status(200).json({
      success: true,
      message: "parcels are retrieved succesfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const getAllParcelsByShop = async (req, res) => {
  try {

    const name = req.params.name;
    const result = await parcelServices.getAllParcelsByShopFromDB(name);

    res.status(200).json({
      success: true,
      message: "parcels are retrieved succesfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const getUnpaidParcelByEmail = async (req, res) => {
  try {

    const email = req.params.email;
    const result = await parcelServices.getUnpaidParcelByEmailFromDB(email);

    res.status(200).json({
      success: true,
      message: "parcels are retrieved succesfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const getPaidParcelByEmail = async (req, res) => {
  try {

    const email = req.params.email;
    const result = await parcelServices.getPaidParcelByEmailFromDB(email);

    res.status(200).json({
      success: true,
      message: "parcels are retrieved succesfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const parcelController = {
  getAllParcels,
  getSpacificParcel,
  createParcel,
  updateParcel,
  updateParcelStatus,
  updateParcelPayment,
  deleteSingleParcel,
  getSpacificParcelForMerchant,
  getAllParcelsByShop,
  getUnpaidParcelByEmail,
  getPaidParcelByEmail,
};
