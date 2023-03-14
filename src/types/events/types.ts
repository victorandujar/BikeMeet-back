export interface EventData {
  name: string;
  distance: number;
  type: string;
  date: Date;
  description: string;
  image: string;
  id: string;
  postedBy: string;
}

export type EventsData = EventData[];
