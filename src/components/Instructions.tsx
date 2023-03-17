const instructions = [
  'Pick a card from each country (check "Available Cards")',
  'Write it down in each of the physical slots and press "Read" button',
];

export function Instructions() {
  return (
    <section>
      <h3>Instructions</h3>
      <ol>
        {instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
    </section>
  );
}
