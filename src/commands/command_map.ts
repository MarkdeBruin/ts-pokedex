import { State } from "../state.js";

export async function commandMapForwards(state: State) {
  try {
    const data = await state.pokeapi.fetchLocations(state.nextLocationsURL);
    
    data.results.forEach(loc => console.log(loc.name));
    
    state.nextLocationsURL = data.next || undefined;
    state.prevLocationsURL = data.previous || undefined;
    
  } catch (err) {
    console.error("Error fetching locations:", err);
  }
}

export async function commandMapBackwards(state: State) {
if (!state.prevLocationsURL) {
  console.log("you're on the first page");
  return;
}

try {
  const data = await state.pokeapi.fetchLocations(state.prevLocationsURL);

  data.results.forEach((loc) => console.log(loc.name));

  state.nextLocationsURL = data.next || undefined;
  state.prevLocationsURL = data.previous || undefined;
  
} catch (err: unknown) {
  if (err instanceof Error) {
    console.error("Error fetching previous locations:", err.message);
  } else {
    console.error("Unknown error fetching previous locations:", err);
  }
}
}
