import { NextResponse } from 'next/server';

interface Request {
  // Define the properties of the request object if needed
}

interface Params {
  id: string;
}

interface Event {
  id: string;
  // Define other properties of the event if needed
}

let events: Event[] = [
  // Example events
];

export async function DELETE(request: Request, { params }: { params: Params }) {
  events = events.filter((event: Event) => event.id !== params.id);
  return NextResponse.json({ message: "Event deleted" });
}
  