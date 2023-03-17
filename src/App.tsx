import { useState } from "react";

import { Instructions } from "./components/Instructions";
import { AvailableCards } from "./components/AvailableCards";
import { Slots } from "./components/Slots";
import { Prompt } from "./components/Prompt";
import { Slot } from "./types/base";
import { cards } from "./data/base";

import "./styles.scss";

const copies = {
  generatePrompt: "Generate prompt",
  style: "style like a van gogh painting",
  setting: "during king's day",
  error: {
    codeNotFound:
      "Can't find card with provided code, please lift the card and try again or try with a different card.",
    codesInvalid:
      "Looks like the codes provided are invalid, remember each card needs to have a unique country.",
  },
};

export default function App() {
  const [slots, setSlots] = useState<[Slot, Slot]>([null, null]);

  function updateSlots(slot: number, value: string | null) {
    const card = cards.find((card) => card.id === value) || undefined;
    const error = card ? undefined : copies.error.codeNotFound;

    setSlots((prevSlots) => {
      prevSlots[slot] = value ? { card, error } : null;

      return [...prevSlots];
    });
  }

  return (
    <div className="App">
      <Instructions />
      <hr />
      <AvailableCards allCards={cards} />
      <hr />
      <Slots onSlotUpdate={updateSlots} slots={slots} />
      <hr />
      <Prompt slots={slots} />
    </div>
  );
}
