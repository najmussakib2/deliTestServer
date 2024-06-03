import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder.js';
import AppError from '../../errors/AppError.js';
import { User } from '../User/user.model.js';
import { merchantSearchableFields } from './merchant.constant.js';
import { merchant } from './merchant.model.js';

const getAllmerchantsFromDB = async (query) => {
  const merchantQuery = new QueryBuilder(
    merchant.find()
      .populate('user')
      .populate('admissionSemester')
      .populate('academicDepartment academicFaculty'),
    query,
  )
    .search(merchantSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await merchantQuery.countTotal();
  const result = await merchantQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSinglemerchantFromDB = async (id) => {
  const result = await merchant.findById(id)
    .populate('admissionSemester')
    .populate('academicDepartment academicFaculty');
  return result;
};

const updatemerchantIntoDB = async (id, payload) => {
  const { name, guardian, localGuardian, ...remainingmerchantData } = payload;

  const modifiedUpdatedData = {
    ...remainingmerchantData,
  };

  /*
    guardain: {
      fatherOccupation:"Teacher"
    }

    guardian.fatherOccupation = Teacher

    name.firstName = 'Mezba'
    name.lastName = 'Abedin'
  */

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await merchant.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deletemerchantFromDB = async (id) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedmerchant = await merchant.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedmerchant) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete merchant');
    }

    // get user _id from deletedmerchant
    const userId = deletedmerchant.user;

    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedmerchant;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete merchant');
  }
};

export const merchantServices = {
  getAllmerchantsFromDB,
  getSinglemerchantFromDB,
  updatemerchantIntoDB,
  deletemerchantFromDB,
};
