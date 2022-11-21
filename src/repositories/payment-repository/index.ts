import { prisma } from "@/config";
import { Payment } from "@prisma/client";

async function findPaymentById(ticketId: number) {
  return prisma.payment.findFirst({
    where: { ticketId },
  });
}

async function insertPayment(paymentData: Omit<Payment, "id">): Promise<Payment> {
  return prisma.payment.create({
    data: paymentData,
  });
}

const paymentRepository = {
  findPaymentById,
  insertPayment,
};

export default paymentRepository;
