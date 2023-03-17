import { Country } from "../enum/base";
import { CardData } from "../types/base";

interface AvailableCardsProps {
  allCards: Array<CardData>;
}

export function AvailableCards({ allCards }: AvailableCardsProps) {
  const cardIdsByCountry = allCards.reduce(
    (accumulator, card) => {
      accumulator[card.country].push(card.id);
      return accumulator;
    },
    { [Country.Argentina]: [], [Country.Netherlands]: [] } as Record<
      Country,
      Array<string>
    >
  );

  return (
    <section>
      <h3 id="available-cards">Available Cards</h3>
      {Object.entries(cardIdsByCountry).map(([country, value]) => (
        <p>
          <b>{country}:</b> {value.join(", ")}
        </p>
      ))}
    </section>
  );
}
