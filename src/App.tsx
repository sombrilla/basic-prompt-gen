import { useState, FormEvent } from "react";

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
  const [openAiKey, setOpenAiKey] = useState<string | null>(null);
  const [slots, setSlots] = useState<[Slot, Slot]>([null, null]);

  const urlParams = new URLSearchParams(window.location.search);

  function updateSlots(slot: number, value: string | null) {
    const card = cards.find((card) => card.id === value) || undefined;
    const error = card ? undefined : copies.error.codeNotFound;

    setSlots((prevSlots) => {
      prevSlots[slot] = value ? { card, error } : null;

      return [...prevSlots];
    });
  }

  function handleApiKeySubmit(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const inputValue = formData.get("apiKey") as string | null;

    setOpenAiKey(inputValue);
  }

  return (
    <div className="App">
      {openAiKey ? (
        <>
          <Instructions />
          <hr />
          <AvailableCards allCards={cards} />
          <hr />
          <Slots onSlotUpdate={updateSlots} slots={slots} />
          <hr />
          <Prompt slots={slots} openAiKey={openAiKey} />
        </>
      ) : (
        <form
          onSubmit={handleApiKeySubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <h3>Submit your OpenAI API key:</h3>
          <input
            defaultValue={urlParams.get("apiKey") || undefined}
            name="apiKey"
            style={{ marginBottom: "10px" }}
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}
