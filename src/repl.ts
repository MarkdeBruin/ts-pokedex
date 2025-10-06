import { createInterface } from "node:readline";
import { stdin, stdout } from "node:process";
import { getCommands } from "./commands/commands.js";
import { State } from "./state.js";

export function startREPL(state: State) {
  const { rl, commands } = state;

  rl.prompt();

  rl.on("line", async (input) => {
    const words = cleanInput(input);

    if (!words.length) return rl.prompt();

    const cmdName = words[0];
    const command = commands[cmdName];

    if (!command) {
      console.log(
        `Unknown command: ${cmdName}. Type "help" for a list of commands.`,
      );
      rl.prompt();
      return;
    }

    try {
      command.callback(state);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error executing command:", err.message);
      } else {
        console.error("Unknown error executing command:", err);
      }
    }

    rl.prompt();
  });

  rl.on("SIGINT", () => {
    console.log("\nExiting Pokedex...");
    process.exit(0);
  });
}

export function cleanInput(input: string): string[] {
  return input
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter((word) => word !== "");
}
