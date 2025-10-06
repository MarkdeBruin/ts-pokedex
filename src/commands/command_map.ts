import { State } from "../state.js";

export async function commandMapForwards(state: State) {
  const locations = await state.pokeapi.fetchLocations(state.nextLocationsURL);

  state.nextLocationsURL = locations.next;
  state.prevLocationsURL = locations.previous;

  for (const loc of locations.results) {
    console.log(loc.name);
  }
}

export async function commandMapBackwards(state: State) {
  if (!state.prevLocationsURL) {
    throw new Error("You're on the first page");
  }

  const locations = await state.pokeapi.fetchLocations(state.prevLocationsURL);

  state.nextLocationsURL = locations.next;
  state.prevLocationsURL = locations.previous;

  for (const loc of locations.results) {
    console.log(loc.name);
  }
}
