
import mongoose from "mongoose";
import { parcelSearchableFields } from "./parcel.const.js";
import { Parcel } from "./parcel.model.js";
import QueryBuilder from "../../builder/QueryBuilder.js";


const createParcelInDB = async (data) => {
  const result = await Parcel.create(data);
  return result;
};

const updateParcelIntoDB = async (id, payload) => {
  const {...parcelRemainingData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const updatedBasicParcelInfo = await Parcel.findByIdAndUpdate(
      id,
      parcelRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!updatedBasicParcelInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update parcel');
    }


    await session.commitTransaction();
    await session.endSession();

    const result = await Parcel.findById(id).populate(
      'parcelRemainingData',
    );

    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update parcel');
  }
};


const updateParcelStatusInDB = async (_id, status) => {
  const result = await Parcel.updateOne({ _id }, { $set: { status } }, { runValidators: true });
  return result;
};
const updateParcelPaymentInDB = async (_id, payment_status) => {
  console.log(_id, payment_status)
  const result = await Parcel.updateOne({ _id }, { $set: { payment_status } }, { runValidators: true });
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
    .sort({ createdAt: -1 })                          
    .fields()                        
    .paginate()                  
    .limit();                        
  const result = await resultQuery.modelQuery;
  console.log(result)
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
  const result = await Parcel.findOne({ _id: Id });
  return result;
};

const getSpacificParcelForMerchantFromDB = async (email) => {
  const result = await Parcel.find({ email: email });
  return result;
};
const getAllParcelsByShopFromDB = async (name) => {
  const result = await Parcel.find({ shop_name: name });
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
  updateParcelIntoDB,
  updateParcelStatusInDB,
  updateParcelPaymentInDB,
  deleteSingleParcelFromDB,
  getSpacificParcelForMerchantFromDB,
  getAllParcelsByShopFromDB,
  getUnpaidParcelByEmailFromDB,
  getPaidParcelByEmailFromDB
}