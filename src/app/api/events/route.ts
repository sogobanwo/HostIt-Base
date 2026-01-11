import { NextRequest, NextResponse } from "next/server";
import Event from "../../models/eventModel";
import { connectDB } from "@/app/lib/db";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Fetch all events from the database, sorted by creation date (newest first)
    const events = await Event.find().sort({ createdAt: -1 });

    return NextResponse.json(
      {
        message: "Events fetched successfully",
        events: events,
        count: events.length
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching events:", error.message);
      return NextResponse.json(
        { message: "Failed to fetch events", error: error.message },
        { status: 500 }
      );
    } else {
      console.error("An unknown error occurred:", error);
      return NextResponse.json(
        { message: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}

export async function POST(request: NextRequest) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_TEST;
  try {
    await connectDB();

    const {
      name,
      image,
      description,
      organizer_name,
      event_type,
      event_category,
      location,
      start_date,
      end_date,
      ticket_types,
      schedule,
    } = await request.json();

    // Input validation
    if (
      !name ||
      !image ||
      !description ||
      !organizer_name ||
      !event_type ||
      !location ||
      !start_date ||
      !end_date ||
      !ticket_types ||
      ticket_types.length === 0
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate ticket types
    for (const ticket of ticket_types) {
      if (!ticket.name || !ticket.price || !ticket.quantity) {
        return NextResponse.json(
          { message: "Invalid ticket type data" },
          { status: 400 }
        );
      }
    }

    // Create the event in the database
    const event = await Event.create({
      name,
      image,
      description,
      organizer_name,
      event_type,
      event_category,
      location,
      start_date: new Date(start_date),
      end_date: new Date(end_date),
      ticket_types,
      schedule,
    });

    // Generate the JSON link for the created event
    const jsonLink = `${baseUrl}events/${event._id}`;

    // Return the response with the event data and JSON link
    return NextResponse.json(
      {
        message: "Event created successfully",
        event: {
          id: event._id,
          name: event.name,
          link: jsonLink
        }
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating event:", error.message);
      return NextResponse.json(
        { message: "Failed to create event", error: error.message },
        { status: 500 }
      );
    } else {
      console.error("An unknown error occurred:", error);
      return NextResponse.json(
        { message: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}