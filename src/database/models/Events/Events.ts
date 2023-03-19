import { model, Schema } from "mongoose";

export const eventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  distance: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
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

export const Event = model("Event", eventSchema, "events");
