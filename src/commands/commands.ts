import { CLICommand } from "../state.js";
import { commandExit } from "./command_exit.js";
import { commandExplore } from "./command_explore.js";
import { commandHelp } from "./command_help.js";
import { commandMapForwards, commandMapBackwards } from "./command_map.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the Pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Shows a list of commands",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Shows a list of 20 new locations",
      callback: commandMapForwards,
    },
    mapb: {
      name: "mapb",
      description: "Shows a list of the previous 20 locations",
      callback: commandMapBackwards,
    },
    explore: {
      name: "explore",
      description: "Shows a list of Pokemons in the given location",
      callback: commandExplore,
    },
  };
}
