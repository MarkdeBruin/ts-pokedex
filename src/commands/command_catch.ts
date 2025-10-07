import { State } from "../state.js";

export async function commandCatch(state: State, ...args: string[]) {
  const pokemonName = args[0];

  if (!pokemonName) {
    throw new Error("you must provide a Pokemon’s name");
  }

  if (state.caughtPokemon[pokemonName]) {
    throw new Error(`You already caught ${pokemonName}!`);
  }

  const pokemon = await state.pokeapi.fetchPokemon(pokemonName);

  const chance = Math.max(0.05, 1 - pokemon.base_experience / 500);
  const caught = Math.random() < chance;

  console.log(`Throwing a Pokeball at ${pokemon.name}...`);

  if (caught) {
    state.caughtPokemon[pokemon.name] = pokemon;
    console.log(`${pokemon.name} was caught!`);
    console.log("You can inspect it with the “inspect” command.");
  } else {
    console.log(`${pokemon.name} escaped!`);
  }
}
