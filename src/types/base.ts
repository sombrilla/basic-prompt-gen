import { Country } from "../enum/base";

export interface CardData {
  id: string;
  title: string;
  image: string;
  promptHint: string;
  country: Country;
}

export type Slot = { card?: CardData; error?: string } | null;
