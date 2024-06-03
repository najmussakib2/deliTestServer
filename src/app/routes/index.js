import { Router } from 'express';
import { AdminRoutes } from '../modules/Admin/admin.route.js';
import { AuthRoutes } from '../modules/Auth/auth.route.js';
import { merchantRoutes } from '../modules/merchant/merchant.route.js';
import { UserRoutes } from '../modules/User/user.route.js';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/merchants',
    route: merchantRoutes,
  },

  {
    path: '/admins',
    route: AdminRoutes,
  },

  {
    path: '/auth',
    route: AuthRoutes,
  },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
