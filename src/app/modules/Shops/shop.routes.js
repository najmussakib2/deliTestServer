import  express  from "express";
import { shopController } from "./shop.controller.js";
import auth from "../../middlewares/auth.js";
import { USER_ROLE } from "../User/user.constant.js";
import ShopZodSchema from "./shop.zodValidation.js";
import validateRequest from "../../middlewares/validateRequest.js";


const router = express.Router()

router.post("/create-shop",auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.merchant,
  ),validateRequest(ShopZodSchema), shopController.createShop);

router.get("/",auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
  ), shopController.getAllShops);

router.get("/:email", shopController.getSpecificShopForMarchant);

router.delete("/delete-shop/:id", shopController.deleteShop) 


export  const shopRoutes = router;