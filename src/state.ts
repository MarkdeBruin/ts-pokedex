import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands/commands.js";
import { PokeAPI, Pokemon } from "./pokeapi.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  readline: Interface;
  commands: Record<string, CLICommand>;
  pokeapi: PokeAPI;
  nextLocationsURL: string;
  prevLocationsURL: string;
  caughtPokemon: Record<string, Pokemon>;
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
    nextLocationsURL: "",
    prevLocationsURL: "",
    caughtPokemon: {},
  };
}