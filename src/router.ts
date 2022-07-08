import { Router } from "express";
import { paymentController } from "./controllers/paymentController";
import { validate } from "./misc/payloadValidate";
import { schemas } from "./misc/requestSchemas";

const router = Router()


router.post("/shorten", validate(schemas.urlCreation), paymentController.payment)
router.get("/:key", paymentController.payment)

export { router }