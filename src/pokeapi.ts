import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache: Cache;

  constructor(cacheInterval: number) {
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
  results: {
      name: string;
      url: string;
    }[];
};

export type Location = {
  encounter_method_rates: {
    encounter_method: {
      name: string;
      url: string;
    };
    version_details: {
      rate: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
  game_index: number;
  id: number;
  location: {
    name: string;
    url: string;
  };
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
    version_details: {
      encounter_details: {
        chance: number;
        condition_values: any[];
        max_level: number;
        method: {
          name: string;
          url: string;
        };
        min_level: number;
      }[];
      max_chance: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
};