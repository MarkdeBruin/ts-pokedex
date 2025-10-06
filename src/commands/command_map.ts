import { State } from "../state.js";

export async function commandMap(state: State) {
  try {
    const data = await state.pokeapi.fetchLocations(state.nextLocationsURL);
    
    data.results.forEach(loc => console.log(loc.name));
    
    state.nextLocationsURL = data.next || undefined;
    state.prevLocationsURL = data.previous || undefined;
    
  } catch (err) {
    console.error("Error fetching locations:", err);
  }
}
