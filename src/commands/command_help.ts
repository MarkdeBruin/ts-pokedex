import { CLICommand, State } from "../state.js";

export function commandHelp(state: State) {
  console.log("Welcome to the Pokedex!");
  console.log("Usage:\n");

  for (const cmdName in state.commands) {
    const cmd = state.commands[cmdName];
    console.log(`${cmd.name}: ${cmd.description}`);
  }
}
