import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, getEventAnalytics } from 'wasp/client/operations';

const AnalyticsPage = () => {
  const { eventId } = useParams();
  const { data: analytics, isLoading, error } = useQuery(getEventAnalytics, { eventId });

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Event Analytics</h1>
      <div className='bg-gray-100 p-4 mb-4 rounded-lg'>
        <p>Total Tickets Sold: {analytics.totalTicketsSold}</p>
        <p>Total Attendees: {analytics.totalAttendees}</p>
      </div>
    </div>
  );
}

export default AnalyticsPage;