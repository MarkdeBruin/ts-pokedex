import { State } from "./state.js";

export function startREPL(state: State) {
  const { readline, commands } = state;

  readline.prompt();

  readline.on("line", async (input) => {
    const words = cleanInput(input);

    if (!words.length) return readline.prompt();

    const cmdName = words[0];
    const command = commands[cmdName];

    if (!command) {
      console.log(
        `Unknown command: ${cmdName}. Type "help" for a list of commands.`,
      );
      readline.prompt();
      return;
    }

    try {
      const args = words.slice(1);
      await command.callback(state, ...args);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error executing command:", err.message);
      } else {
        console.error("Unknown error executing command:", err);
      }
    }

    readline.prompt();
  });

  readline.on("SIGINT", () => {
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
