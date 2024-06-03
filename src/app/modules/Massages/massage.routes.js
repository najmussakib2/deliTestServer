import  express  from "express";
import { massageController } from "./massage.controller.js";
import { Barrier } from "../app/accessBarrier.js";

const router = express.Router()

router.post('/create-massage',Barrier.verifyJWT, massageController.createMassage)

router.get('/',Barrier.verifyJWT, massageController.getAllMassages)

router.delete('/delete-massage/:id',Barrier.verifyJWT, massageController.deleteMassage)

export  const massageRoutes = router;