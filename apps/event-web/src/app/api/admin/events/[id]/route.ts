export async function DELETE(request, { params }) {
    events = events.filter((event) => event.id !== params.id);
    return NextResponse.json({ message: "Event deleted" });
  }
  