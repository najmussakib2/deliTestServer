import express from "express";
import { parcelController } from "./parcel.controller.js";
import auth from "../../middlewares/auth.js";
import { USER_ROLE } from "../User/user.constant.js";
import validateRequest from "../../middlewares/validateRequest.js";
import { parcelZodSchema } from "./parcel.zodValidation.js";


const router = express.Router()

router.get("/", auth(
  USER_ROLE.superAdmin,
  USER_ROLE.admin,
  USER_ROLE.student,
), parcelController.getAllParcels);

router.get("/:id", auth(
  USER_ROLE.superAdmin,
  USER_ROLE.admin,
  USER_ROLE.student,
), parcelController.getSpacificParcel);

router.post("/create-parcel", auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(parcelZodSchema), parcelController.createParcel);

router.patch("/change-payment/:id", parcelController.updateParcelPayment);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(parcelZodSchema),
  parcelController.updateParcel,
);

router.patch("/change-status/:id", parcelController.updateParcelStatus);

router.delete("/:id", auth(USER_ROLE.superAdmin, USER_ROLE.admin), parcelController.deleteSingleParcel);

router.get("/parcels-email/:email", parcelController.getSpacificParcelForMerchant);

router.get("/parcels-shop/:name", parcelController.getAllParcelsByShop);

router.get("/parcels-unpaid/:email", parcelController.getUnpaidParcelByEmail);

router.get("/parcels-paid/:email", parcelController.getPaidParcelByEmail);


export const parcelRoutes = router;