import Joi from "joi";

export const TicketSchema = Joi.object({
  ticketTypeId: Joi.number().required(),
});
