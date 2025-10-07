import { State } from "../state.js";

export async function commandExplore(state: State, ...args: string[]) {
  const areaName = args[0];

  if (!areaName) {
    throw new Error("you must provide a location name");
  }

  console.log(`Exploring ${areaName}...`);

  const location = await state.pokeapi.fetchLocation(areaName);

  if (!location.pokemon_encounters.length) {
    console.log("No Pokémon found in this area.");
    return;
  }

  console.log("Found Pokémon:");

  for (const encounter of location.pokemon_encounters) {
    console.log(` - ${encounter.pokemon.name}`);
  }
}
