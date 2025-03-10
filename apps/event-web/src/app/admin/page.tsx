"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/api/admin/events") // Fetch events from API
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold">Manage Events</h2>
      <Link href="/admin/events/create">
        <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md">+ Create Event</button>
      </Link>

      <ul className="mt-4">
        {events.map((event) => (
          <li key={event.id} className="p-4 border rounded-md my-2 flex justify-between">
            <div>
              <h3 className="text-lg font-bold">{event.name}</h3>
              <p>{event.date} | {event.club}</p>
            </div>
            <div>
              <Link href={`/admin/events/edit/${event.id}`}>
                <button className="bg-blue-500 text-white px-4 py-2 mr-2">Edit</button>
              </Link>
              <button className="bg-red-500 text-white px-4 py-2" onClick={() => deleteEvent(event.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

async function deleteEvent(id) {
  await fetch(`/api/admin/events/${id}`, { method: "DELETE" });
  window.location.reload();
}
