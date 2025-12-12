'use client';
import React, { useEffect, useState } from 'react';
import api from '../src/lib/api';
import Link from 'next/link';

export default function EventsList(){
  const [events, setEvents] = useState([]);
  useEffect(()=>{ api.get('/api/events').then(r=>setEvents(r.data.data||r.data||[])).catch(()=>{}); }, []);
  return (
    <div className="grid gap-3">
      {events.map(e=>(
        <div key={e.id} className="p-4 bg-white rounded shadow flex justify-between items-center">
          <div>
            <div className="font-bold">{e.eventName}</div>
            <div className="text-sm text-gray-600">{e.distance}m • {e.category}</div>
          </div>
          <div className="space-x-2">
            <Link href={`/event/${e.id}`} className="px-3 py-1 bg-blue-600 text-white rounded">View</Link>
            <Link href={`/leaderboard/${e.id}`} className="px-3 py-1 bg-green-600 text-white rounded">Live</Link>
          </div>
        </div>
      ))}
    </div>
  );
}
