import { Router } from 'express';
import { UserRoutes } from '../modules/User/user.route.js';
import { merchantRoutes } from '../modules/merchant/merchant.route.js';
import { AdminRoutes } from '../modules/Admin/admin.route.js';
import { AuthRoutes } from '../modules/Auth/auth.route.js';
import { shopRoutes } from '../modules/Shops/shop.routes.js';
import { parcelRoutes } from '../modules/Parcels/parcel.routes.js';
import { massageRoutes } from '../modules/Massages/massage.routes.js';
import { geoRoutes } from '../modules/GeoData/geoData.servData.js';



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
  {
    path: '/shops',
    route: shopRoutes,
  },
  {
    path: '/parcels',
    route: parcelRoutes,
  },
  {
    path: '/massages',
    route: massageRoutes,
  },
  {
    path: '/geoData',
    route: geoRoutes,
  },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
