'use client';
import React, { useEffect, useState } from 'react';
import api from '../../src/lib/api';

export default function HeatEntry({ heatId }){
  const [heat,setHeat]=useState(null); const [athletes,setAthletes]=useState([]);
  const [form,setForm]=useState({ athleteId:'', lane:'', reactionTime:'', finishTime:'', status:'OK' });
  useEffect(()=>{ if(!heatId) return; api.get(`/api/heats/${heatId}`).then(r=>setHeat(r.data.data||r.data||null)).catch(()=>{}); api.get('/api/athletes').then(r=>setAthletes(r.data.data||r.data||[])); },[heatId]);
  const save=async()=>{ await api.post('/api/results', { heatId, ...form }); alert('Saved'); };
  return (
    <div>
      <h1 className="text-xl mb-4">Enter Results</h1>
      <div className="bg-white p-4 rounded shadow max-w-lg">
        <select value={form.athleteId} onChange={e=>setForm({...form,athleteId:e.target.value})} className="w-full mb-2 p-2 border rounded">
          <option value="">Select Athlete</option>
          {athletes.map(a=> <option key={a.id} value={a.id}>{a.name} ({a.country})</option>)}
        </select>
        <input value={form.lane} onChange={e=>setForm({...form,lane:e.target.value})} placeholder="Lane" className="w-full mb-2 p-2 border rounded" />
        <input value={form.reactionTime} onChange={e=>setForm({...form,reactionTime:e.target.value})} placeholder="Reaction Time" className="w-full mb-2 p-2 border rounded" />
        <input value={form.finishTime} onChange={e=>setForm({...form,finishTime:e.target.value})} placeholder="Finish Time" className="w-full mb-2 p-2 border rounded" />
        <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})} className="w-full mb-2 p-2 border rounded">
          <option value="OK">OK</option><option value="DNS">DNS</option><option value="DNF">DNF</option><option value="DSQ">DSQ</option>
        </select>
        <button onClick={save} className="w-full bg-green-600 text-white p-2 rounded">Save Result</button>
      </div>
    </div>
  );
}
