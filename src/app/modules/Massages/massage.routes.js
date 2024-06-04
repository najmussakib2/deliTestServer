import  express  from "express";
import { massageController } from "./massage.controller.js";
import auth from "../../middlewares/auth.js";
import { USER_ROLE } from "../User/user.constant.js";


const router = express.Router()

router.post('/create-massage',auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.merchant),
 massageController.createMassage)

router.get('/',auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin), massageController.getAllMassages)

router.delete('/delete-massage/:id',auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin), massageController.deleteMassage)

export  const massageRoutes = router;