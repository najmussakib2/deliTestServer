import express from 'express';
import auth from '../../middlewares/auth.js';
import validateRequest from '../../middlewares/validateRequest.js';
import { USER_ROLE } from '../User/user.constant.js';
import { merchantControllers } from './merchant.controller.js';
import { updatemerchantValidationSchema } from './merchant.validation.js';

const router = express.Router();

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  merchantControllers.getAllmerchants,
);

router.get(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  merchantControllers.getSinglemerchant,
);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(updatemerchantValidationSchema),
  merchantControllers.updatemerchant,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  merchantControllers.deletemerchant,
);

export const merchantRoutes = router;
