import { Country } from "../enum/base";
import { CardData } from "../types/base";

export const cards: Array<CardData> = [
  {
    id: "obelisco",
    title: "Obelisco",
    image: "obelisco.jpg",
    promptHint: "el Obelisco on 9 de julio street",
    country: Country.Argentina,
  },
  {
    id: "messi",
    title: "Messi",
    image: "messi.jpg",
    promptHint: "Messi lifting world cup",
    country: Country.Argentina,
  },
  {
    id: "tango",
    title: "Tango",
    image: "tango.jpg",
    promptHint: "tango dance",
    country: Country.Argentina,
  },
  {
    id: "koningsdag",
    title: "The Koningsdag vrijmarkt",
    image: "koningsdag.jpg",
    promptHint: "Koningsdag free market",
    country: Country.Netherlands,
  },
  {
    id: "tompouce",
    title: "Tompouce",
    image: "tompouce.webp",
    promptHint: "tompouce food",
    country: Country.Netherlands,
  },
];
