import { prisma } from "@/config";
import { Ticket, TicketStatus } from "@prisma/client";

async function searchFindManyTicketTypes() {
  return prisma.ticketType.findMany();
}
async function searchFindUniqueTicket(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: { enrollmentId },
    include: {
      TicketType: true,
    },
  });
}
async function searchTicketById(id: number) {
  return prisma.ticket.findFirst({
    where: {
      id,
    },
    include: {
      TicketType: true,
    },
  });
}
async function insertTicket(enrollmentId: number, ticketTypeId: number): Promise<Ticket> {
  return prisma.ticket.create({
    data: {
      enrollmentId: enrollmentId,
      ticketTypeId: ticketTypeId,
      status: TicketStatus.RESERVED,
    },
    include: {
      TicketType: true,
    },
  });
}
async function updateStatusTicket(id: number) {
  return prisma.ticket.update({
    where: {
      id,
    },
    data: {
      status: TicketStatus.PAID,
    },
  });
}
const ticketRepository = {
  searchFindManyTicketTypes,
  searchFindUniqueTicket,
  searchTicketById,
  insertTicket,
  updateStatusTicket,
};

export default ticketRepository;
