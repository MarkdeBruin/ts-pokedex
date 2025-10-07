import { State } from "../state.js";

export async function commandCatch(state: State, ...args: string[]) {
  const pkmnName = args[0];

  if (!pkmnName) {
    throw new Error("you must provide a Pokemon’s name or id");
  }
  
  console.log(`Throwing a Pokeball at ${pkmnName}`);
}