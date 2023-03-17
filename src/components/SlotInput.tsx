import { FormEvent } from "react";
import { CardData } from "../App";

interface SlotInputProps {
  slotNumber: number;
  card?: CardData;
  error?: string;
  onReadSlot: (event: FormEvent, slot: number) => void;
  onLiftCard: (slot: number) => void;
}

export function SlotInput({
  slotNumber,
  card,
  onReadSlot,
  onLiftCard,
  error
}: SlotInputProps) {
  const inUse = Boolean(card) || Boolean(error);

  return (
    <div className="slot">
      <h3>
        Physical slot {slotNumber + 1} [{inUse ? "In use" : "Empty"}]
      </h3>
      <form onSubmit={(event) => onReadSlot(event, slotNumber)}>
        <input disabled={inUse} name="input" type="text" />

        <div className="buttonsWrapper">
          <button disabled={inUse} type="submit">
            Read
          </button>

          <button
            type="button"
            disabled={!inUse}
            onClick={() => onLiftCard(slotNumber)}
          >
            Lift
          </button>
        </div>
      </form>
      {error && <p className="error">{error}</p>}

      {card && (
        <div className={`card ${card.country}`}>
          <img src={`/images/${card.image}`} alt={card.promptHint} />
          <p className="title">{card.title}</p>
          <p className="country">({card.country})</p>
        </div>
      )}
    </div>
  );
}
