/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../config/index.js';
import AppError from '../../errors/AppError.js';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary.js';
import { Admin } from '../Admin/admin.model.js';
import { merchant } from '../merchant/merchant.model.js';
import { User } from './user.model.js';
import {
  generateAdminId,
  generateMerchantId,
} from './user.utils.js';
import {RegisteredUser} from '../Auth/register.model.js'
import QueryBuilder from '../../builder/QueryBuilder.js';

const createmerchantIntoDB = async (
  file,
  password,
  payload,
) => {
  // create a user object
  const userData = {};

  //if password is not given , use default password
  userData.password = password || (config.default_password);

  //set merchant role
  userData.role = 'merchant';
  // set merchant email
  userData.email = payload.email;
  userData.Mobile = payload.Mobile;


  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateMerchantId();

    if (file) {
      const imageName = `${userData.id}${payload?.name?.firstName}`;
      const path = file?.path;

      //send image to cloudinary
      const { secure_url } = await sendImageToCloudinary(imageName, path);
      payload.profileImg = secure_url;
    }

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a merchant
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id
    console.log(payload);
    // create a merchant (transaction-2)
    const newMerchant = await merchant.create([payload], { session });

    if (!newMerchant.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create merchant');
    }

    await session.commitTransaction();
    await session.endSession();

    return newMerchant;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};


const createAdminIntoDB = async (file,password,payload) => {
  // create a user object
  const userData = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password);

  //set merchant role
  userData.role = 'admin';
  //set admin email
  userData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();
    userData.Mobile = payload.Mobile;

    if (file) {
      const imageName = `${userData.id}${payload?.name?.firstName}`;
      const path = file?.path;
      //send image to cloudinary
      const { secure_url } = await sendImageToCloudinary(imageName, path);
      payload.profileImg = secure_url;
    }

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err) {
    console.log(err)
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getMe = async (userId, role) => {
  let result = null;
  if (role === 'merchant') {
    result = await merchant.findOne({ id: userId }).populate('user');
  }
  if (role === 'admin') {
    result = await Admin.findOne({ id: userId }).populate('user');
  }

  return result;
};

const getAllRegisteredUser =async (query)=>{
  const resultQuery = new QueryBuilder(RegisteredUser.find(), query)
  .search(["Mobile","Email","Name","Company","createdAt"])  
  .filter()                        
  .sort({ createdAt: -1 })                          
  .fields()                        
  .paginate()                  
  .limit();                        
const result = await resultQuery.modelQuery;
const meta = await resultQuery.countTotal();
return { data: result, meta };
  
}

const changeStatus = async (id, payload) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const UserServices = {
  createmerchantIntoDB,
  createAdminIntoDB,
  getMe,
  getAllRegisteredUser,
  changeStatus,
};
