
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import { merchantServices } from './merchant.service.js';

const getSinglemerchant = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await merchantServices.getSinglemerchantFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'merchant is retrieved successfully',
    data: result,
  });
});

const getAllmerchants = catchAsync(async (req, res) => {
  const result = await merchantServices.getAllmerchantsFromDB(req.query);
  console.log({ result });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'merchant are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const updatemerchant = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { merchant } = req.body;
  const result = await merchantServices.updatemerchantIntoDB(id, merchant);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'merchant is updated successfully',
    data: result,
  });
});

const deletemerchant = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await merchantServices.deletemerchantFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'merchant is deleted successfully',
    data: result,
  });
});

export const merchantControllers = {
  getAllmerchants,
  getSinglemerchant,
  deletemerchant,
  updatemerchant,
};
