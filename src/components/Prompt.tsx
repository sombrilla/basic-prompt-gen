import { useEffect, useMemo, useState } from "react";
import { Configuration, OpenAIApi } from "openai";

import { Slot } from "../types/base";

interface PromptProps {
  slots: [Slot, Slot];
  openAiKey: string;
}

const copies = {
  invalidCodes:
    "Looks like the codes provided are invalid, remember each card needs to have a unique country.",
};

const promptConfig = {
  style: "a van gogh painting of ",
  setting: ", without flags, orange prominent",
};

export function Prompt({ slots, openAiKey }: PromptProps) {
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

  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | undefined>();

  async function generateImage(prompt: string) {
    setIsLoading(true);

    const configuration = new Configuration({
      apiKey: openAiKey,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "256x256",
    });

    setGeneratedImage(response.data.data[0].url);
    setIsLoading(false);
  }

  useEffect(() => {
    if (newPrompt && openAiKey && !generatedImage) {
      generateImage(newPrompt);
    }
  }, [newPrompt, openAiKey]);

  return (
    <div className="generatePrompt">
      {slotsFilled && !slotsValid && (
        <p className="error">{copies.invalidCodes}</p>
      )}

      {newPrompt &&
        (isLoading ? (
          "Generating..."
        ) : (
          <>
            <button onClick={() => generateImage(newPrompt)}>Retry</button>
            {generatedImage ? (
              <>
                <h3>Image:</h3>
                <img src={generatedImage} alt={newPrompt} />
              </>
            ) : (
              "There was a problem generating the image, please try again."
            )}

            <h3>Prompt:</h3>
            <div className="promptResponse">{newPrompt}</div>
          </>
        ))}
    </div>
  );
}
