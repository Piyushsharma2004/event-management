'use client';
import React, { useState } from "react";
import Head from "next/head";

function TicketsAdminPage() {
  const [tickets, setTickets] = useState([
    { id: 1, event: "Garba Night", price: 500, status: "Available" },
    { id: 2, event: "MakerCarnival", price: 800, status: "Sold Out" },
  ]);
  const [newTicket, setNewTicket] = useState({ event: "", price: "", status: "Available" });
  const [editingTicket, setEditingTicket] = useState(null);

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTicket({ ...newTicket, [name]: value });
  };

  // Add New Ticket
  const addTicket = () => {
    if (newTicket.event && newTicket.price) {
      setTickets([...tickets, { id: Date.now(), ...newTicket }]);
      setNewTicket({ event: "", price: "", status: "Available" });
    }
  };

  // Edit Ticket
  const startEdit = (ticket) => {
    setEditingTicket(ticket);
    setNewTicket({ event: ticket.event, price: ticket.price, status: ticket.status });
  };

  const saveEdit = () => {
    setTickets(
      tickets.map((t) => (t.id === editingTicket.id ? { ...editingTicket, ...newTicket } : t))
    );
    setEditingTicket(null);
    setNewTicket({ event: "", price: "", status: "Available" });
  };

  // Delete Ticket
  const deleteTicket = (id) => {
    setTickets(tickets.filter((ticket) => ticket.id !== id));
  };

  return (
    <div className="w-full">
      <Head>
        <title>Tickets Admin | Dashboard</title>
        <meta name="description" content="Manage event tickets efficiently with the Tickets Admin Dashboard." />
      </Head>

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-center p-6">
        <h1 className="text-black dark:text-white text-5xl font-bold mb-6">Tickets Admin PAGE</h1>

        {/* Ticket Form */}
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            {editingTicket ? "Edit Ticket" : "Add New Ticket"}
          </h2>
          <input
            type="text"
            name="event"
            placeholder="Event Name"
            value={newTicket.event}
            onChange={handleInputChange}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="Ticket Price"
            value={newTicket.price}
            onChange={handleInputChange}
            className="w-full p-2 mb-2 border rounded"
          />
          <select
            name="status"
            value={newTicket.status}
            onChange={handleInputChange}
            className="w-full p-2 mb-2 border rounded"
          >
            <option value="Available">Available</option>
            <option value="Sold Out">Sold Out</option>
          </select>
          <button
            onClick={editingTicket ? saveEdit : addTicket}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            {editingTicket ? "Save Changes" : "Add Ticket"}
          </button>
        </div>

        {/* Ticket List */}
        <div className="mt-6 max-w-lg mx-auto">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="flex justify-between items-center bg-white dark:bg-gray-800 p-3 mb-2 rounded shadow">
              <div className="text-gray-900 dark:text-white">
                <p className="font-semibold">{ticket.event}</p>
                <p className="text-sm">Price: ₹{ticket.price}</p>
                <p className="text-sm">Status: {ticket.status}</p>
              </div>
              <div>
                <button
                  onClick={() => startEdit(ticket)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTicket(ticket.id)}
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

export default TicketsAdminPage;
