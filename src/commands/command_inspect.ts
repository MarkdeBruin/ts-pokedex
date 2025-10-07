import { State } from "../state.js";

export async function commandInspect(state: State, ...args: string[]) {
  const pokemonName = args[0];

  if (!pokemonName) {
    throw new Error("you must provide a Pokemon’s name");
  }
  
  const pokemon = state.caughtPokemon[pokemonName];
  
  if (!pokemon) {
    throw new Error("you have not caught that pokemon");
  }

  console.log(`Name: ${pokemon.name}`);
  console.log(`Height: ${pokemon.height}`);
  console.log(`Weight: ${pokemon.weight}`);
  console.log("Stats:");
  for (const stat of pokemon.stats) {
    console.log(`  -${stat.stat.name}: ${stat.base_stat}`);
  }
  console.log("Types:");
  for (const type of pokemon.types) {
    console.log(`  - ${type.type.name}`);
  }
}