import ticketRepository from "@/repositories/tickets-repository/index";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { notFoundError, requestError, unauthorizedError } from "@/errors";
import { Payment } from "@prisma/client";
import paymentRepository from "@/repositories/payment-repository";

async function getPayment(userId: number, ticketId: number): Promise<Payment> {
  if (!ticketId) throw requestError(400, "Bad Request");

  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketRepository.searchTicketById(ticketId);
  if (!ticket) {
    throw notFoundError();
  }
  if (enrollment.id !== ticket.enrollmentId) throw unauthorizedError();
  const payment = await paymentRepository.findPaymentById(ticketId);
  return payment;
}

async function postPayment(userId: number, body: BodyPayment): Promise<Payment> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketRepository.searchTicketById(body.ticketId);
  if (!ticket) {
    throw notFoundError();
  }
  if (enrollment.id !== ticket.enrollmentId) throw unauthorizedError();
  const paymentData: Omit<Payment, "id"> = {
    ticketId: body.ticketId,
    value: ticket.TicketType.price,
    cardIssuer: body.cardData.issuer,
    cardLastDigits: body.cardData.number.toString().slice(-4),
    updatedAt: new Date(),
    createdAt: new Date(),
  };
  const payment = await paymentRepository.insertPayment(paymentData);
  await ticketRepository.updateStatusTicket(body.ticketId);
  return payment;
}
export type BodyPayment = {
  ticketId: number;
  cardData: {
    issuer: string;
    number: number;
    name: string;
    expirationDate: Date;
    cvv: number;
  };
};
const paymentService = {
  getPayment,
  postPayment,
};

export default paymentService;
