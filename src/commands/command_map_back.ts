import { State } from "src/state";

export async function commandMapBack(state: State) {
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