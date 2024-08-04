import  express  from "express";
import { geoController } from "./geoData.controller.js";
import { USER_ROLE } from "../User/user.constant.js";
import auth from "../../middlewares/auth.js";

const router = express.Router()

router.get('/',
    // auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.merchant),
     geoController.getAllGeoData)

router.get('/division', geoController.getAllDivisionData)

router.get('/district', geoController.getAllDistrictData)

router.get('/upozilla', geoController.getAllUpozillaData)

router.get('/union', geoController.getAllUnionData)


export  const geoRoutes = router;