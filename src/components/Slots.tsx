import { SlotInput } from "./SlotInput";
import { Slot } from "../types/base";
import { FormEvent } from "react";

interface SlotsProps {
  slots: [Slot, Slot];
  onSlotUpdate: (slotIndex: number, value: string | null) => void;
}

export function Slots({ slots, onSlotUpdate }: SlotsProps) {
  function handleReadSlot(event: FormEvent, slot: number) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const inputValue = formData.get("input") as string | null;

    if (inputValue) {
      onSlotUpdate(slot, inputValue);
    }
  }

  function handleLiftCard(slot: number) {
    onSlotUpdate(slot, null);
    // setPrompt(null);
  }

  return (
    <section className="slots">
      {slots.map((slot, index) => (
        <SlotInput
          key={index}
          card={slot?.card}
          error={slot?.error}
          slotNumber={index}
          onReadSlot={handleReadSlot}
          onLiftCard={handleLiftCard}
        />
      ))}
    </section>
  );
}
