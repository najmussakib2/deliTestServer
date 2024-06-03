import { Router } from 'express';
import { userRoutes } from '../Users/user.routes.js';
import { shopRoutes } from '../Shops/shop.routes.js';
import { parcelRoutes } from '../Parcels/parcel.routes.js';
import { massageRoutes } from '../Massages/massage.routes.js';
import { jwtRoute } from '../jwt/jwt.js';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
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
    path: '/jwt',
    route: jwtRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;