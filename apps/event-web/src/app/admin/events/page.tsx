'use client';
import React, { useState } from "react";
import Head from "next/head";

function EventAdminPage() {
  const [events, setEvents] = useState([
    { id: 1, name: "Garba Night", date: "2025-03-20" },
    { id: 2, name: "MakerCarnival", date: "2025-04-05" },
  ]);
  const [newEvent, setNewEvent] = useState({ name: "", date: "" });
  const [editingEvent, setEditingEvent] = useState(null);

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  // Add New Event
  const addEvent = () => {
    if (newEvent.name && newEvent.date) {
      setEvents([...events, { id: Date.now(), ...newEvent }]);
      setNewEvent({ name: "", date: "" });
    }
  };

  // Edit Event
  const startEdit = (event) => {
    setEditingEvent(event);
    setNewEvent({ name: event.name, date: event.date });
  };

  const saveEdit = () => {
    setEvents(
      events.map((ev) => (ev.id === editingEvent.id ? { ...editingEvent, ...newEvent } : ev))
    );
    setEditingEvent(null);
    setNewEvent({ name: "", date: "" });
  };

  // Delete Event
  const deleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <div className="w-full">
      <Head >
        <title>Event Admin | Dashboard</title>
        <meta name="description" content="Manage your events efficiently with the Event Admin Dashboard." />
      </Head>

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-center p-6">
        <h1 className="text-black dark:text-white text-5xl font-bold mb-6">Event Admin PAGE</h1>

        {/* Event Form */}
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            {editingEvent ? "Edit Event" : "Add New Event"}
          </h2>
          <input
            type="text"
            name="name"
            placeholder="Event Name"
            value={newEvent.name}
            onChange={handleInputChange}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="date"
            name="date"
            value={newEvent.date}
            onChange={handleInputChange}
            className="w-full p-2 mb-2 border rounded"
          />
          <button
            onClick={editingEvent ? saveEdit : addEvent}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            {editingEvent ? "Save Changes" : "Add Event"}
          </button>
        </div>

        {/* Event List */}
        <div className="mt-6 max-w-lg mx-auto">
          {events.map((event) => (
            <div key={event.id} className="flex justify-between items-center bg-white dark:bg-gray-800 p-3 mb-2 rounded shadow">
              <div className="text-gray-900 dark:text-white">
                <p className="font-semibold">{event.name}</p>
                <p className="text-sm">{event.date}</p>
              </div>
              <div>
                <button
                  onClick={() => startEdit(event)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteEvent(event.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventAdminPage;
