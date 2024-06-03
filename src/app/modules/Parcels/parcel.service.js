import QueryBuilder from "../Builder/QueryBuilder.js";
import { parcelSearchableFields } from "./parcel.const.js";
import { Parcel } from "./parcel.model.js";


const createParcelInDB = async (data) => {
    const result = await Parcel.create(data);
    return result;
  };
const updateParcelStatusInDB = async (_id,status) => {
    const result = await Parcel.updateOne({_id},{$set:{status}},{runValidators: true});
    return result;
  };
const updateParcelPaymentInDB = async (_id,payment_status) => {
  console.log(_id,payment_status)
    const result = await Parcel.updateOne({_id},{$set:{payment_status}},{runValidators: true});
    return result;
  };
const deleteSingleParcelFromDB = async (_id) => {
    const result = await Parcel.deleteOne({ _id });
    return result;
  };
const getAllParcelsFromDB = async (query) => {
    const resultQuery = new QueryBuilder(Parcel.find(), query)
    .search(parcelSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate()
    .limit();
  const result = await resultQuery.modelQuery;
  const meta = await resultQuery.countTotal();
  return { data: result, meta };
  };
const getAllApprovedParcelsFromDB = async () => {
    const result = await Parcel.find({ status: "approved" });
    return result;
  };
const getAllUnpaidParcelsFromDB = async () => {
    const result = await Parcel.find({ payment_status: "unpaid" });
    return result;
  };
const getAllPaidParcelsFromDB = async () => {
    const result = await Parcel.find({ payment_status: "paid" });
    return result;
  };
const getSpacificParcelFromDB = async (Id) => {
    const result = await Parcel.findOne({_id: Id});
    return result;
  };

const getSpacificParcelForMerchantFromDB = async (email) => {
    const result = await Parcel.find({email: email});
    return result;
  };
const getAllParcelsByShopFromDB = async (name) => {
    const result = await Parcel.find({ shop_name: name});
    return result;
  };
const getUnpaidParcelByEmailFromDB = async (email) => {
    const result = await Parcel.find({ email: email });
    return result;
  };
const getPaidParcelByEmailFromDB = async (email) => {
    const result = await Parcel.find({ email: email });
    return result;
  };


  export const parcelServices = {
    getAllParcelsFromDB,
    getAllApprovedParcelsFromDB,
    getAllUnpaidParcelsFromDB,
    getAllPaidParcelsFromDB,
    getSpacificParcelFromDB,
    createParcelInDB,
    updateParcelStatusInDB,
    updateParcelPaymentInDB,
    deleteSingleParcelFromDB,
    getSpacificParcelForMerchantFromDB,
    getAllParcelsByShopFromDB,
    getUnpaidParcelByEmailFromDB,
    getPaidParcelByEmailFromDB
  }