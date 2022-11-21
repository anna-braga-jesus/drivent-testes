import { Router } from "express";
import { PaymentSchema } from "@/schemas/payment-schemas";
import { authenticateToken, validateBody } from "@/middlewares";
import { findPaymentById, postPayment } from "@/controllers";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", findPaymentById)
  .post("/process", validateBody(PaymentSchema), postPayment);

export { paymentsRouter };
