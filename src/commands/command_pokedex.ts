import { State } from "../state.js"

export async function commandPokedex(state: State) {
  const caughtPokemons = Object.keys(state.caughtPokemon);
    if (caughtPokemons.length === 0) {
      throw new Error("Your Pokedex is empty.");
    }
  
    console.log("Your Pokedex:");
    for (const name of caughtPokemons) {
      console.log(` - ${name}`);
    }
}