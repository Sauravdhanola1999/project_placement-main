'use client';
import React, { useEffect, useState } from 'react';
import api from '../src/lib/api';
import Link from 'next/link';

export default function EventDetails({ eventId }){
  const [event, setEvent] = useState(null);
  const [heats, setHeats] = useState([]);
  useEffect(()=>{
    if(!eventId) return;
    api.get(`/api/events/${eventId}`).then(r=>setEvent(r.data.data||r.data||null)).catch(()=>{});
    api.get(`/api/heats/event/${eventId}`).then(r=>setHeats(r.data.data||r.data||[])).catch(()=>{});
  },[eventId]);
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">{event?.eventName || 'Event'}</h1>
      <div className="bg-white p-4 rounded shadow mb-4">
        <div>Distance: {event?.distance}m</div>
        <div>Category: {event?.category}</div>
      </div>
      <h2 className="text-lg font-semibold mb-2">Heats</h2>
      <div className="space-y-2">
        {heats.map(h=>(
          <div key={h.id} className="flex justify-between items-center bg-white p-3 rounded shadow">
            <div>Heat {h.heatNumber} • {h.round}</div>
            <div className="space-x-2">
              <Link href={`/admin/heat/${h.id}`} className="px-3 py-1 bg-indigo-600 text-white rounded">Enter Results</Link>
              <Link href={`/results/heat/${h.id}`} className="px-3 py-1 bg-gray-200 rounded">View</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
