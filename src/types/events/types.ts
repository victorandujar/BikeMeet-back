import { type InferSchemaType } from "mongoose";
import { type eventSchema } from "../../database/models/Events/Events";

export interface EventData {
  name: string;
  distance: number;
  type: string;
  date: Date | string;
  description: string;
  image: string;
  id: string;
  postedBy: string;
}

export type EventsData = EventData[];

export type EventStructure = InferSchemaType<typeof eventSchema>;
