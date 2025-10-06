import { createInterface } from "node:readline";
import { stdin, stdout } from "node:process";
import { getCommands } from "./commands/commands.js";

export function startREPL() {
  const rl = createInterface({
    input: stdin,
    output: stdout,
    prompt: "Pokedex > ",
  });

  rl.prompt();

  rl.on("line", (line) => {
    const words = cleanInput(line);
    const commands = getCommands();
    
    if (!words.length) return rl.prompt();
    
    const cmdName = words[0];
    const command = commands[cmdName];
    
    if (!command) {
      console.log(`Unknown command: ${cmdName}. Type "help" for a list of commands.`);
      return;
    }
    
    try {
      command.callback(commands);
    } catch (err) {
      console.error("Error executing command:", err);
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
