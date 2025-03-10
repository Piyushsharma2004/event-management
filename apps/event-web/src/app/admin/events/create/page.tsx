"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateEvent() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [club, setClub] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/admin/events", {
      method: "POST",
      body: JSON.stringify({ name, date, club }),
    });
    router.push("/admin");
  };

  return (
    <div className="p-6 w-full">
      <h2 className="text-xl font-bold">Create Event</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <input className="border p-2 w-full" type="text" placeholder="Event Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="border p-2 w-full mt-2" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input className="border p-2 w-full mt-2" type="text" placeholder="Club Name" value={club} onChange={(e) => setClub(e.target.value)} />
        <button type="submit" className="mt-4 bg-green-500 text-white px-4 py-2">Create</button>
      </form>
    </div>
  );
}
