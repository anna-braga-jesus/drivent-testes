import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import ticketsService from "@/services/tickets-service/index";

export async function findTicketTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const types = await ticketsService.getAllTicketsType();
    return res.status(httpStatus.OK).send(types);
  } catch (error) {
    return res.status(httpStatus.NO_CONTENT).send(error);
  }
}

export async function findTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const tickets = await ticketsService.getTicket(userId);
    return res.status(httpStatus.OK).send(tickets);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}
export async function postTicket(req: AuthenticatedRequest, res: Response) {
  const ticketTypeId = req.body.ticketTypeId as number;
  const { userId } = req;
  try {
    const tickets = await ticketsService.postTicket(userId, ticketTypeId);

    return res.status(httpStatus.CREATED).send(tickets);
  } catch (error) {
    if (error.name === "RequestError") {
      return res.status(httpStatus.BAD_REQUEST).send(error);
    }
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}
//teste
