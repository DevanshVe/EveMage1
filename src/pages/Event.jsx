import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useAction, getEvent, sellTicket, registerAttendee } from 'wasp/client/operations';

const EventPage = () => {
  const { eventId } = useParams();
  const { data: event, isLoading, error } = useQuery(getEvent, { id: eventId });
  const sellTicketFn = useAction(sellTicket);
  const registerAttendeeFn = useAction(registerAttendee);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSellTicket = () => {
    sellTicketFn({ eventId: event.id });
  };

  const handleRegisterAttendee = () => {
    registerAttendeeFn({ eventId: event.id, name, email });
    setName('');
    setEmail('');
  };

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>{event.name}</h1>
      <p className='mb-2'>{event.description}</p>
      <p className='mb-2'>Date: {event.date}</p>
      <p className='mb-4'>Location: {event.location}</p>
      <div className='mb-4'>
        <button onClick={handleSellTicket} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4'>Sell Ticket</button>
        <input type='text' placeholder='Your Name' className='px-2 py-1 border rounded mr-2' value={name} onChange={(e) => setName(e.target.value)} />
        <input type='email' placeholder='Your Email' className='px-2 py-1 border rounded mr-2' value={email} onChange={(e) => setEmail(e.target.value)} />
        <button onClick={handleRegisterAttendee} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>Register Attendee</button>
      </div>
      <h2 className='text-xl font-bold mb-2'>Attendees:</h2>
      <ul>
        {event.attendees.map((attendee) => (
          <li key={attendee.id}>{attendee.name} - {attendee.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default EventPage;