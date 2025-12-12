"use client";
import React, { useEffect, useState } from "react";
import api from "../../src/lib/api";

export default function EventsAdmin() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    eventName: "",
    category: "",
    distance: "",
  });
  useEffect(() => {
    api.get("/api/events").then((r) => setEvents(r.data.data || r.data || []));
  }, []);
 const create = async () => {
  const distanceNum = Number(form.distance);

  if (!form.eventName) {
    alert("Event name is required");
    return;
  }

  if (!form.category) {
    alert("Category is required");
    return;
  }

  if (isNaN(distanceNum)) {
    alert("Distance must be a number");
    return;
  }

  if (distanceNum < 50) {
    alert("Distance must be at least 50 meters");
    return;
  }

  try {
    await api.post("/api/events/create", {
      eventName: form.eventName,
      category: form.category,
      distance: distanceNum,
    });

    alert("Event created");

    setForm({ eventName: "", category: "", distance: "" });

  } catch (err) {
    alert(err.response?.data?.errors?.[0]?.msg || "Validation error");
  }
};

  return (
    <div>
      <h1 className="text-2xl mb-4">Manage Events</h1>
      <div className="bg-white p-4 rounded shadow mb-4">
        <input
          value={form.eventName}
          onChange={(e) => setForm({ ...form, eventName: e.target.value })}
          placeholder="Event name"
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          placeholder="Category"
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="number"
          min={50}
          value={form.distance}
          onChange={(e) => setForm({ ...form, distance: e.target.value })}
          placeholder="Distance (>= 50m)"
          className="w-full p-2 mb-2 border rounded"
        />

        <button
          onClick={create}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Event
        </button>
      </div>
      <div className="grid gap-2">
        {events.map((ev) => (
          <div
            key={ev.id}
            className="p-3 bg-white rounded shadow flex justify-between"
          >
            <div>
              {ev.eventName} • {ev.distance}m
            </div>
            <div className="space-x-2">
              <a className="text-sm text-indigo-600" href={`/event/${ev.id}`}>
                View
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
