import  express  from "express";
import { geoController } from "./geoData.controller.js";

const router = express.Router()

router.get('/', geoController.getAllGeoData)

router.get('/division', geoController.getAllDivisionData)

router.get('/district', geoController.getAllDistrictData)

router.get('/upozilla', geoController.getAllUpozillaData)

router.get('/union', geoController.getAllUnionData)


export  const geoRoutes = router;