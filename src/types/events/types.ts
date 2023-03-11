export interface EventData {
  name: string;
  distance: number;
  type: string;
  date: Date;
  description: string;
  image: string;
}

export interface UserId extends Request {
  userId: string;
}

export type EventsData = EventData[];
