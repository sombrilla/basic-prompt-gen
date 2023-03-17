import { useMemo } from "react";

import { Slot } from "../types/base";

interface PromptProps {
  slots: [Slot, Slot];
}

const copies = {
  invalidCodes:
    "Looks like the codes provided are invalid, remember each card needs to have a unique country."
};

const promptConfig = {
  style: "a van gogh painting of ",
  setting: ", pictured from street, without flags, orange prominent"
};

export function Prompt({ slots }: PromptProps) {
  const slotsFilled = Boolean(slots[0]?.card && slots[1]?.card);
  const slotsValid =
    slotsFilled && slots[0]?.card?.country !== slots[1]?.card?.country;

  const newPrompt = useMemo(() => {
    if (!slotsFilled || !slotsValid) return;

    const imageDescriptions = slots
      .map((slot) => slot?.card?.promptHint)
      .join(" and ");

    return `${promptConfig.style} ${imageDescriptions} ${promptConfig.setting}`;
  }, [slotsFilled, slotsValid, slots]);

  return (
    <div className="generatePrompt">
      {slotsFilled && !slotsValid && (
        <p className="error">{copies.invalidCodes}</p>
      )}

      {newPrompt && (
        <>
          <h3>Prompt:</h3>
          <div className="promptResponse">{newPrompt}</div>
        </>
      )}
    </div>
  );
}
