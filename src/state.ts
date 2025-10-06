import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands/commands.js";
import { PokeAPI } from "./pokeapi.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  readline: Interface;
  commands: Record<string, CLICommand>;
  pokeapi: PokeAPI;
  nextLocationsURL?: string;
  prevLocationsURL?: string;
}

export function initState(cacheInterval: number) {
  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });
  
  return {
    readline: readline,
    commands: getCommands(),
    pokeapi: new PokeAPI(cacheInterval),
    nextLocationURL: undefined,
    prevLocationURL: undefined,
  };
}