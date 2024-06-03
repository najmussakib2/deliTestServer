import  express  from "express";
import { parcelController } from "./parcel.controller.js";
import { Barrier } from "../app/accessBarrier.js";

const router = express.Router()

router.get("/",  parcelController.getAllParcels);

router.get("/parcels-approved",Barrier.verifyJWT, parcelController.getAllApprovedParcels);

router.get('/parcels-unpaid',Barrier.verifyJWT, parcelController.getAllUnpaidParcels);

router.get("/parcels-paid",Barrier.verifyJWT, parcelController.getAllPaidParcels);

router.get("/:id",Barrier.verifyJWT, parcelController.getSpacificParcel);

router.post("/create-parcel", parcelController.createParcel);

router.patch("/change-payment/:id", parcelController.updateParcelPayment);

router.patch("/change-status/:id",Barrier.verifyJWT, parcelController.updateParcelStatus);

router.delete("/:id",Barrier.verifyJWT, parcelController.deleteSingleParcel);

router.get("/parcels-email/:email",Barrier.verifyJWT, parcelController.getSpacificParcelForMerchant);

router.get("/parcels-shop/:name",Barrier.verifyJWT, parcelController.getAllParcelsByShop);

router.get("/parcels-unpaid/:email",Barrier.verifyJWT, parcelController.getUnpaidParcelByEmail);

router.get("/parcels-paid/:email",Barrier.verifyJWT, parcelController.getPaidParcelByEmail);


export  const parcelRoutes = router;