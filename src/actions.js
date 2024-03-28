import { HttpError } from 'wasp/server'

export const createEvent = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  return context.entities.Event.create({
    data: {
      name: args.name,
      description: args.description,
      date: args.date,
      location: args.location,
      ticketsSold: 0,
      userId: context.user.id
    }
  });
}

export const sellTicket = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  const event = await context.entities.Event.findUnique({
    where: { id: args.eventId }
  });
  if (!event) { throw new HttpError(404, 'Event not found') };
  const updatedEvent = await context.entities.Event.update({
    where: { id: args.eventId },
    data: { ticketsSold: event.ticketsSold + 1 }
  });
  return updatedEvent;
}

export const registerAttendee = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  const event = await context.entities.Event.findUnique({ where: { id: args.eventId } });
  if (!event) { throw new HttpError(404, 'Event not found') };
  const newAttendee = await context.entities.Attendee.create({ data: { name: args.name, email: args.email, eventId: args.eventId } });
  return newAttendee;
}