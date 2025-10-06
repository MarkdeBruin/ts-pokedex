import { CLICommand } from "../state.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapBack } from "./command_map_back.js";

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
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Shows a list of the previous 20 locations",
      callback: commandMapBack,
    },
  };
}