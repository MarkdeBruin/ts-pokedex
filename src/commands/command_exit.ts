import { State } from "src/state";

export function commandExit(state: State) {
  console.log("Closing the Pokedex... Goodbye!");
  state.rl.close();
  process.exit(0);
}