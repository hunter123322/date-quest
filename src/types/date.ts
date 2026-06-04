export type JourneyStep = 0 | 1 | 2 | 3 | 4 | 5;

export interface DateOption {
  id: string;
  label: string;
}

export interface TimeOption {
  id: string;
  label: string;
}

export interface FoodOption {
  id: string;
  emoji: string;
  title: string;
  description: string;
}

export interface DateJourneyState {
  date: DateOption | null;
  time: TimeOption | null;
  food: FoodOption | null;
  excitement: number;
  loveScore: number;
}

export interface QRPayload {
  date: string;
  time: string;
  food: string;
  excitement: number;
  loveScore: number;
}
