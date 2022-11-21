import ticketRepository from "@/repositories/tickets-repository/index";
import { Ticket, TicketType } from "@prisma/client";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { notFoundError, requestError } from "@/errors";

async function getAllTicketsType(): Promise<TicketType[]> {
  return await ticketRepository.searchFindManyTicketTypes();
}
async function getTicket(userId: number): Promise<Ticket> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketRepository.searchFindUniqueTicket(enrollment.id);
  if (!ticket) {
    throw notFoundError();
  }
  return ticket;
}
async function postTicket(userId: number, ticketTypeId: number): Promise<Ticket> {
  if (!ticketTypeId) {
    throw requestError(400, "Bad request!");
  }
  const enrollmentType = await enrollmentRepository.findWithAddressByUserId(userId);
  if (enrollmentType === null) {
    throw notFoundError();
  }
  const result = await ticketRepository.insertTicket(enrollmentType.id, ticketTypeId);
  return result;
}

const ticketsService = {
  getAllTicketsType,
  getTicket,
  postTicket,
};

export default ticketsService;
