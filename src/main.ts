import { initState } from "./state.js";
import { startREPL } from "./repl.js";

function main() {
  const state = initState(1000 * 60 * 5); // 5 min cach interval
  startREPL(state);
}

main();
