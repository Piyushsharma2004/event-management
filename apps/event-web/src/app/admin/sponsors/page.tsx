'use client';
import React, { useState } from "react";
import Head from "next/head";

function SponsorsAdminPage() {
  const [sponsors, setSponsors] = useState([
    { id: 1, name: "Tata", category: "Gold", logo: "https://via.placeholder.com/50" },
    { id: 2, name: "Infosys", category: "Platinum", logo: "https://via.placeholder.com/50" },
  ]);
  const [newSponsor, setNewSponsor] = useState({ name: "", category: "Gold", logo: "" });
  const [editingSponsor, setEditingSponsor] = useState(null);

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSponsor({ ...newSponsor, [name]: value });
  };

  // Add New Sponsor
  const addSponsor = () => {
    if (newSponsor.name && newSponsor.logo) {
      setSponsors([...sponsors, { id: Date.now(), ...newSponsor }]);
      setNewSponsor({ name: "", category: "Gold", logo: "" });
    }
  };

  // Edit Sponsor
  const startEdit = (sponsor) => {
    setEditingSponsor(sponsor);
    setNewSponsor({ name: sponsor.name, category: sponsor.category, logo: sponsor.logo });
  };

  const saveEdit = () => {
    setSponsors(
      sponsors.map((s) =>
        s.id === editingSponsor.id ? { ...editingSponsor, ...newSponsor } : s
      )
    );
    setEditingSponsor(null);
    setNewSponsor({ name: "", category: "Gold", logo: "" });
  };

  // Delete Sponsor
  const deleteSponsor = (id) => {
    setSponsors(sponsors.filter((sponsor) => sponsor.id !== id));
  };

  return (
    <div className="w-full">
      <Head>
        <title>Sponsors Admin | Dashboard</title>
        <meta name="description" content="Manage event sponsors efficiently with the Sponsors Admin Dashboard." />
      </Head>

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-center p-6">
        <h1 className="text-black dark:text-white text-5xl font-bold mb-6">Sponsors Admin PAGE</h1>

        {/* Sponsor Form */}
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            {editingSponsor ? "Edit Sponsor" : "Add New Sponsor"}
          </h2>
          <input
            type="text"
            name="name"
            placeholder="Sponsor Name"
            value={newSponsor.name}
            onChange={handleInputChange}
            className="w-full p-2 mb-2 border rounded"
          />
          <select
            name="category"
            value={newSponsor.category}
            onChange={handleInputChange}
            className="w-full p-2 mb-2 border rounded"
          >
            <option value="Gold">Gold</option>
            <option value="Platinum">Platinum</option>
            <option value="Silver">Silver</option>
          </select>
          <input
            type="text"
            name="logo"
            placeholder="Sponsor Logo URL"
            value={newSponsor.logo}
            onChange={handleInputChange}
            className="w-full p-2 mb-2 border rounded"
          />
          <button
            onClick={editingSponsor ? saveEdit : addSponsor}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            {editingSponsor ? "Save Changes" : "Add Sponsor"}
          </button>
        </div>

        {/* Sponsor List */}
        <div className="mt-6 max-w-lg mx-auto">
          {sponsors.map((sponsor) => (
            <div key={sponsor.id} className="flex justify-between items-center bg-white dark:bg-gray-800 p-3 mb-2 rounded shadow">
              <div className="flex items-center text-gray-900 dark:text-white">
                <img src={sponsor.logo} alt={sponsor.name} className="w-12 h-12 rounded-full mr-3" />
                <div>
                  <p className="font-semibold">{sponsor.name}</p>
                  <p className="text-sm">{sponsor.category} Sponsor</p>
                </div>
              </div>
              <div>
                <button
                  onClick={() => startEdit(sponsor)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteSponsor(sponsor.id)}
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

export default SponsorsAdminPage;
