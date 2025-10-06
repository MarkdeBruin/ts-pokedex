import { CLICommand } from "./command_types.js";

export function commandHelp(commands: Record<string, CLICommand>) {
  console.log("Welcome to the Pokedex!");
  console.log("Usage:\n");

  for (const cmdName in commands) {
    const cmd = commands[cmdName];
    console.log(`${cmd.name}: ${cmd.description}`);
  }
}
