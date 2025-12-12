'use client';
import React, { useEffect, useState } from 'react';
import api from '../../src/lib/api';

export default function AthletesAdmin(){
  const [athletes,setAthletes]=useState([]); const [form,setForm]=useState({ name:'', country:'', age:'', gender:'M', personalBest:'', seasonBest:'' });
  useEffect(()=>{ api.get('/api/athletes').then(r=>setAthletes(r.data.data||r.data||[])); }, []);
  const create=async()=>{ await api.post('/api/athletes', form); alert('created'); setForm({ name:'', country:'', age:'', gender:'M', personalBest:'', seasonBest:'' }); };
  return (
    <div>
      <h1 className="text-2xl mb-4">Manage Athletes</h1>
      <div className="bg-white p-4 rounded shadow mb-4">
        <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Name" className="w-full p-2 mb-2 border rounded" />
        <input value={form.country} onChange={e=>setForm({...form,country:e.target.value})} placeholder="Country" className="w-full p-2 mb-2 border rounded" />
        <input value={form.age} onChange={e=>setForm({...form,age:e.target.value})} placeholder="Age" className="w-full p-2 mb-2 border rounded" />
        <select value={form.gender} onChange={e=>setForm({...form,gender:e.target.value})} className="w-full p-2 mb-2 border rounded">
          <option value="M">M</option><option value="F">F</option><option value="O">O</option>
        </select>
        <input value={form.personalBest} onChange={e=>setForm({...form,personalBest:e.target.value})} placeholder="Personal Best" className="w-full p-2 mb-2 border rounded" />
        <input value={form.seasonBest} onChange={e=>setForm({...form,seasonBest:e.target.value})} placeholder="Season Best" className="w-full p-2 mb-2 border rounded" />
        <button onClick={create} className="bg-green-600 text-white px-4 py-2 rounded">Create Athlete</button>
      </div>
      <div className="grid gap-2">
        {athletes.map(a=>(
          <div key={a.id} className="p-3 bg-white rounded shadow flex justify-between">
            <div>{a.name} ({a.country})</div>
            <div className="text-sm text-gray-600">{a.personalBest || '-'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
