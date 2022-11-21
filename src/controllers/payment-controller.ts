import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import paymentService, { BodyPayment } from "@/services/payment-service/index";

export async function findPaymentById(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const ticketId = req.query.ticketId as string;

  try {
    const payment = await paymentService.getPayment(userId, Number(ticketId));
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === "RequestError") {
      return res.status(httpStatus.BAD_REQUEST).send(error);
    }
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    if (error.name === "UnauthorizedError") {
      return res.status(httpStatus.UNAUTHORIZED).send(error);
    }
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function postPayment(req: AuthenticatedRequest, res: Response) {
  const body = req.body as BodyPayment;
  const { userId } = req;
  try {
    const payment = await paymentService.postPayment(userId, body);

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === "RequestError") {
      return res.status(httpStatus.BAD_REQUEST).send(error);
    }
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    if (error.name === "UnauthorizedError") {
      return res.status(httpStatus.UNAUTHORIZED).send(error);
    }
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}
