import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  start_time: { type: String, required: true },
  end_time: { type: String, required: true },
  activity: { type: String, required: true },
  description: { type: String, required: true },
});

const ticketTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the event name"],
    },
    image: {
        type: String,
        required: [true, "Please enter the event image URL"],
    },
    description: {
        type: String,
        required: [true, "Please enter the event description"],
    },
    organizer_name: {
        type: String,
        required: [true, "Please enter the organizer name"],
    },
    event_type: {
        type: String,
        required: [true, "Please enter the event type"],
    },
    event_category: {
        type: String,
    },
    location: {
        type: String,
        required: [true, "Please enter the event location"],
    },
    start_date: {
        type: Date,
        required: [true, "Please enter the event start date"],
    },
    end_date: {
        type: Date,
        required: [true, "Please enter the event end date"],
    },
    ticket_types: {
        type: [ticketTypeSchema],
        required: [true, "Please add at least one ticket type"],
    },
    schedule: {
        type: [scheduleSchema],
    },
},
    {
        timestamps: true,
    });

export default mongoose.models.Event || mongoose.model("Event", eventSchema);