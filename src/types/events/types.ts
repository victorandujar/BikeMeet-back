export interface EventData {
  name: string;
  distance: number;
  type: string;
  date: string;
  description: string;
  image: string;
}

export interface UserId extends Request {
  userId: string;
}

export type EventsData = EventData[];
