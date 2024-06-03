import  express  from "express";
import { shopController } from "./shop.controller.js";
import { Barrier } from "../app/accessBarrier.js";

const router = express.Router()

router.post("/create-shop",Barrier.verifyJWT, shopController.createShop);

router.get("/",Barrier.verifyJWT, shopController.getAllShops);

router.get("/:email",Barrier.verifyJWT, shopController.getSpecificShopForMarchant);

router.delete("/delete-shop/:id", Barrier.verifyJWT,shopController.deleteShop) 


export  const shopRoutes = router;