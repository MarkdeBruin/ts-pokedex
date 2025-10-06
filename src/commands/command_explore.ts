import { State } from "src/state";

export async function commandExplore(state: State, ...args: string[]) {
  const areaName = args[0];

  if (!areaName) {
    console.log(
      "Please provide a location area name (e.g., explore pastoria-city-area)",
    );
    return;
  }

  console.log(`Exploring ${areaName}...`);

  try {
    const location = await state.pokeapi.fetchLocation(areaName);

    if (!location.pokemon_encounters.length) {
      console.log("No Pokémon found in this area.");
      return;
    }

    console.log("Found Pokémon:");
    for (const encounter of location.pokemon_encounters) {
      console.log(` - ${encounter.pokemon.name}`);
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error exploring area:", err.message);
    } else {
      console.error("Unknown error exploring area:", err);
    }
  }
}
