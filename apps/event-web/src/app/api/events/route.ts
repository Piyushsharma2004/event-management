import { NextResponse } from "next/server";

// Dummy event data (Replace with DB query later)
const events = [
  { id: "1", name: "Tech Conference 2025", date: "2025-04-10", club: "Tech Club", price: 500 },
  { id: "2", name: "Startup Pitch Fest", date: "2025-05-02", club: "Entrepreneurship Club", price: 300 },
  { id: "3", name: "AI Workshop", date: "2025-06-15", club: "AI Club", price: 0 },
];

export async function GET() {
  return NextResponse.json(events);
}
