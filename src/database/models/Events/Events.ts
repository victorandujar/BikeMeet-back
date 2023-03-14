import { model, Schema } from "mongoose";

const EventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  postedBy: { type: Schema.Types.ObjectId, ref: "User" },
});

export const Event = model("Event", EventSchema, "events");
