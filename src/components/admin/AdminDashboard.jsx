'use client';
import React, { useEffect, useState } from 'react';
import api from '../../src/lib/api';
import Link from 'next/link';

export default function AdminDashboard(){
  const [events,setEvents]=useState([]); const [athletes,setAthletes]=useState([]);
  useEffect(()=>{ api.get('/api/events').then(r=>setEvents(r.data.data||r.data||[])); api.get('/api/athletes').then(r=>setAthletes(r.data.data||r.data||[])); }, []);
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm">Events</div>
          <div className="text-2xl">{events.length}</div>
          <Link href="/admin/events" className="text-blue-600">Manage</Link>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm">Athletes</div>
          <div className="text-2xl">{athletes.length}</div>
          <Link href="/admin/athletes" className="text-blue-600">Manage</Link>
        </div>
      </div>
    </div>
  );
}
