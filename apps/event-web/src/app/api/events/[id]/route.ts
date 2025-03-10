import { NextResponse } from "next/server";

// Dummy event data (replace with database later)
const events = [
  { id: "1", name: "Tech Conference 2025", date: "2025-04-10", club: "Tech Club", price: 500, description: "A tech conference featuring top industry speakers." },
  { id: "2", name: "Startup Pitch Fest", date: "2025-05-02", club: "Entrepreneurship Club", price: 300, description: "Showcase your startup ideas and win funding." },
  { id: "3", name: "AI Workshop", date: "2025-06-15", club: "AI Club", price: 0, description: "Learn AI and ML basics from experts." },
];

export async function GET(request, { params }) {
  const event = events.find((e) => e.id === params.id);
  return event ? NextResponse.json(event) : NextResponse.json({ error: "Event not found" }, { status: 404 });
}
