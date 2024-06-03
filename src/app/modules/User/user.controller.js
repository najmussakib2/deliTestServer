import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import { UserServices } from './user.service.js';

const createmerchant = catchAsync(async (req, res) => {
  const { password, merchant: merchantData } = req.body;

  const result = await UserServices.createmerchantIntoDB(
    req.file,
    password,
    merchantData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'merchant is created successfully',
    data: result,
  });
});



const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await UserServices.createAdminIntoDB(
    req.file,
    password,
    adminData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created successfully',
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const { userId, role } = req.user;
  const result = await UserServices.getMe(userId, role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved successfully',
    data: result,
  });
});

const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await UserServices.changeStatus(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Status is updated successfully',
    data: result,
  });
});
export const UserControllers = {
  createmerchant,
  createAdmin,
  getMe,
  changeStatus,
};
