/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import auth from '../../middlewares/auth.js';
import validateRequest from '../../middlewares/validateRequest.js';
import { upload } from '../../utils/sendImageToCloudinary.js';
import { createAdminValidationSchema } from '../Admin/admin.validation.js';
import { createmerchantValidationSchema } from '../merchant/merchant.validation.js';
import { USER_ROLE } from './user.constant.js';
import { UserControllers } from './user.controller.js';
import { UserValidation } from './user.validation.js';

const router = express.Router();

router.post(
  '/create-merchant',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  upload.single('file'),
  (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(createmerchantValidationSchema),
  UserControllers.createmerchant,
);


router.post(
  '/create-admin',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  upload.single('file'),
  (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin,
);

router.post(
  '/change-status/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(UserValidation.changeStatusValidationSchema),
  UserControllers.changeStatus,
);

router.get(
  '/me',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.merchant,
  ),
  UserControllers.getMe,
);

export const UserRoutes = router;
