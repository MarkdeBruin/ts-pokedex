export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ?? `${PokeAPI.baseURL}/location-area/`;
    
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to fetch locations: ${res.status}`);
      return await res.json();
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error fetching locations:", err.message);
      } else {
        console.error("Unknown error fetching locations:", err);
      }
      throw err;
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    throw new Error("Not implemented yet");
  }
}

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Location[];
};

export type Location = {
  name: string;
  url: string;
};