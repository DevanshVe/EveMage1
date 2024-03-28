import { HttpError } from 'wasp/server';

export const getEvent = async ({ id }, context) => {
  if (!context.user) { throw new HttpError(401); }

  const event = await context.entities.Event.findUnique({
    where: { id },
    include: { attendees: true }
  });

  if (!event) { throw new HttpError(404, 'No event with id ' + id); }

  return event;
}

export const getEvents = async (args, context) => {
  if (!context.user) { throw new HttpError(401); }

  return context.entities.Event.findMany({
    where: { userId: context.user.id },
    include: { attendees: true }
  });
}

export const getEventAnalytics = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const { eventId } = args;

  const event = await context.entities.Event.findUnique({
    where: { id: eventId },
    include: {
      attendees: {
        select: {
          id: true
        }
      }
    }
  });

  if (!event) { throw new HttpError(404, 'No event with id ' + eventId) }

  const totalTicketsSold = event.ticketsSold;
  const totalAttendees = event.attendees.length;

  return { totalTicketsSold, totalAttendees };
}