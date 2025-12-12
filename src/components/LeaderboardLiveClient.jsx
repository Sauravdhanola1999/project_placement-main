'use client';
import React, { useEffect, useState } from 'react';
import { connectSocket, joinLeaderboard, leaveLeaderboard } from '../src/lib/socket';
import api from '../src/lib/api';

export default function LeaderboardLiveClient({ eventId }){
  const [data, setData] = useState([]);
  useEffect(()=>{
    if(!eventId) return;
    const s = connectSocket();
    s.on('leaderboard:update', payload => setData(payload));
    joinLeaderboard(eventId);
    api.get(`/api/results/leaderboard/${eventId}`).then(r=>setData(r.data.data||r.data||[])).catch(()=>{});
    return ()=>{ leaveLeaderboard(eventId); s.off('leaderboard:update'); s.disconnect(); };
  },[eventId]);
  return (
    <div className="bg-white rounded shadow p-4">
      <table className="w-full table-auto">
        <thead><tr><th>Pos</th><th>Athlete</th><th>Lane</th><th>Time</th><th>Reaction</th></tr></thead>
        <tbody>
          {data && data.length ? data.map(r=>(
            <tr key={r.id}>
              <td className="p-2">{r.position}</td>
              <td className="p-2">{r.Athlete?.name || r.name}</td>
              <td className="p-2">{r.lane}</td>
              <td className="p-2">{r.finishTime?.toFixed? r.finishTime.toFixed(2) : r.finishTime}</td>
              <td className="p-2">{r.reactionTime?.toFixed? r.reactionTime.toFixed(3) : r.reactionTime}</td>
            </tr>
          )) : <tr><td colSpan="5" className="p-2">No data yet</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
