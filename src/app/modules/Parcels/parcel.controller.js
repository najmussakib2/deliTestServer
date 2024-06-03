import { parcelServices } from "./parcel.service.js";
import { parcelZodSchema } from "./parcel.zodValidation.js";

const createParcel = async (req, res) => {
  try {
    const { parcel } = req.body;
    console.log(parcel)
    console.log(req.body)
    const zodParsedData = parcelZodSchema.parse(parcel);
    const result = await parcelServices.createParcelInDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: "parcels are retrieved succesfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
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
const deleteSingleParcel = async (req, res) => {
  try {

    const  Id  = req.params.id;
    const result = await parcelServices.deleteSingleParcelFromDB(Id);

    res.status(200).json({
      success: true,
      message: "parcels are retrieved succesfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const getAllParcels = async (req, res) => {
  try {
    const result = await parcelServices.getAllParcelsFromDB(req.query);

    res.status(200).json({
      success: true,
      message: "parcels are retrieved succesfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getAllApprovedParcels = async (req, res) => {
  try {
    const result = await parcelServices.getAllApprovedParcelsFromDB();

    res.status(200).json({
      success: true,
      message: "parcels are retrieved succesfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const getAllUnpaidParcels = async (req, res) => {
  try {
    const result = await parcelServices.getAllUnpaidParcelsFromDB();

    res.status(200).json({
      success: true,
      message: "parcels are retrieved succesfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const getAllPaidParcels = async (req, res) => {
  try {
    const result = await parcelServices.getAllPaidParcelsFromDB();

    res.status(200).json({
      success: true,
      message: "parcels are retrieved succesfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
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
  getAllApprovedParcels,
  getAllUnpaidParcels,
  getAllPaidParcels,
  getSpacificParcel,
  createParcel,
  updateParcelStatus,
  updateParcelPayment,
  deleteSingleParcel,
  getSpacificParcelForMerchant,
  getAllParcelsByShop,
  getUnpaidParcelByEmail,
  getPaidParcelByEmail,
};
