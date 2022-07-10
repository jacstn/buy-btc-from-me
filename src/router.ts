import { Router } from "express";
import { mainController } from "./controllers/mainController";
import { validate } from "./misc/payloadValidate";
import { schemas } from "./misc/requestSchemas";

const router = Router()


router.get("/omise-public-key", mainController.getOmisePublicKey)
router.post("/charge", validate(schemas.newCharge), mainController.charge)
router.post("/order", validate(schemas.newOrder), mainController.createOrder)
export { router }