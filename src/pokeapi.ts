import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache: Cache;

  constructor(cacheInterval = 1000 * 60 * 1) { // default 1 min
      this.cache = new Cache(cacheInterval);
    }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ?? `${PokeAPI.baseURL}/location-area/`;
    
    const cached = this.cache.get<ShallowLocations>(url);
      if (cached) {
        return cached;
      }
    
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to fetch locations: ${res.status}`);
        const data: ShallowLocations = await res.json();
        this.cache.add(url, data);
        return data;
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