import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useAction, createEvent, getEvents } from 'wasp/client/operations';

const DashboardPage = () => {
  const { data: events, isLoading, error } = useQuery(getEvents);
  const createEventFn = useAction(createEvent);
  const [newEventName, setNewEventName] = useState('');
  const [newEventDescription, setNewEventDescription] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [newEventLocation, setNewEventLocation] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateEvent = () => {
    createEventFn({
      name: newEventName,
      description: newEventDescription,
      date: newEventDate,
      location: newEventLocation
    });
    setNewEventName('');
    setNewEventDescription('');
    setNewEventDate('');
    setNewEventLocation('');
  };

  return (
    <div className='p-4'>
      <div className='flex gap-x-4 py-5'>
        <input
          type='text'
          placeholder='Event Name'
          className='px-1 py-2 border rounded text-lg'
          value={newEventName}
          onChange={(e) => setNewEventName(e.target.value)}
        />
        <input
          type='text'
          placeholder='Event Description'
          className='px-1 py-2 border rounded text-lg'
          value={newEventDescription}
          onChange={(e) => setNewEventDescription(e.target.value)}
        />
        <input
          type='text'
          placeholder='Event Date'
          className='px-1 py-2 border rounded text-lg'
          value={newEventDate}
          onChange={(e) => setNewEventDate(e.target.value)}
        />
        <input
          type='text'
          placeholder='Event Location'
          className='px-1 py-2 border rounded text-lg'
          value={newEventLocation}
          onChange={(e) => setNewEventLocation(e.target.value)}
        />
        <button
          onClick={handleCreateEvent}
          className='bg-green-500 hover:bg-green-700 px-2 py-2 text-white font-bold rounded'
        >
          Create Event
        </button>
      </div>
      {events.map((event) => (
        <div
          key={event.id}
          className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
        >
          <div>{event.name}</div>
          <div>{event.date}</div>
          <div>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >
              Edit
            </button>
            <button
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2'
            >
              Delete
            </button>
            <Link
              to={`/event/${event.id}`}
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2'
            >
              Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardPage;