import { Router } from "express";
import { TicketSchema } from "@/schemas/tickets-schemas";
import { authenticateToken, validateBody } from "@/middlewares";
import { findTicket, findTicketTypes, postTicket } from "@/controllers/tickets-controller";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", findTicketTypes)
  .get("/", findTicket)
  .post("/", validateBody(TicketSchema), postTicket);

export { ticketsRouter };
