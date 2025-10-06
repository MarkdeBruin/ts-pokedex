import { createInterface } from "node:readline";
import { stdin, stdout } from "node:process";

export function startREPL() {
  const rl = createInterface({
    input: stdin,
    output: stdout,
    prompt: "Pokedex > ",
  });

  rl.prompt();

  rl.on("line", (line) => {
    const cleanLine = cleanInput(line);
    
    if (cleanLine.length === 0) {
      rl.prompt();
      return;
    }
    
    console.log("Your command was:", cleanLine[0]);
    rl.prompt();
  });
  
  rl.on("SIGINT", () => {
    console.log("\nExiting Pokedex...");
    process.exit(0);
  });
}

export function cleanInput(input: string): string[] {
  if (!input.trim()) return [];
  return input.trim().toLowerCase().split(/\s+/);
}
