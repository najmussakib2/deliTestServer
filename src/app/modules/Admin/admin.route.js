import express from 'express';
import auth from '../../middlewares/auth.js';
import validateRequest from '../../middlewares/validateRequest.js';
import { USER_ROLE } from '../User/user.constant.js';
import { AdminControllers } from './admin.controller.js';
import { updateAdminValidationSchema } from './admin.validation.js';

const router = express.Router();

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  AdminControllers.getAllAdmins,
);

router.get(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  AdminControllers.getSingleAdmin,
);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin),
  validateRequest(updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

router.delete(
  '/:adminId',
  auth(USER_ROLE.superAdmin),
  AdminControllers.deleteAdmin,
);

export const AdminRoutes = router;
