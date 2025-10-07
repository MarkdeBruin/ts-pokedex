import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache: Cache;

  constructor(cacheInterval: number) {
    this.cache = new Cache(cacheInterval);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL || `${PokeAPI.baseURL}/location-area/`;

    const cached = this.cache.get<ShallowLocations>(url);
    if (cached) return cached;

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
    const url = `${PokeAPI.baseURL}/location-area/${locationName}/`;

    const cached = this.cache.get<Location>(url);
    if (cached) return cached;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to fetch location: ${res.status}`);

      const data: Location = await res.json();
      this.cache.add(url, data);
      return data;
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error fetching location:", err.message);
      } else {
        console.error("Unknown error fetching location:", err);
      }
      throw err;
    }
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseURL}/pokemon/${encodeURIComponent(pokemonName)}/`;

    const cached = this.cache.get<Pokemon>(url);
    if (cached) return cached;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to fetch Pokemon: ${res.status}`);

      const data: Pokemon = await res.json();
      this.cache.add(url, data);
      return data;
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error fetching Pokemon:", err.message);
      } else {
        console.error("Unknown error fetching Pokemon:", err);
      }
      throw err;
    }
  }
}

export type ShallowLocations = {
  count: number;
  next: string;
  previous: string;
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

export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: {
    is_hidden: boolean;
    slot: number;
    ability: {
      name: string;
      url: string;
    };
  }[];
  forms: {
    name: string;
    url: string;
  }[];
  game_indices: {
    game_index: number;
    version: {
      name: string;
      url: string;
    };
  }[];
  held_items: {
    item: {
      name: string;
      url: string;
    };
    version_details: {
      rarity: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
  location_area_encounters: string;
  moves: {
    move: {
      name: string;
      url: string;
    };
    version_group_details: {
      level_learned_at: number;
      version_group: {
        name: string;
        url: string;
      };
      move_learn_method: {
        name: string;
        url: string;
      };
      order: number;
    }[];
  }[];
  species: {
    name: string;
    url: string;
  };
  sprites: {
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
    other: Record<string, any>;
    versions: Record<string, any>;
  };
  cries: {
    latest: string;
    legacy: string;
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  past_types: {
    generation: {
      name: string;
      url: string;
    };
    types: {
      slot: number;
      type: {
        name: string;
        url: string;
      };
    }[];
  }[];
  past_abilities: {
    generation: {
      name: string;
      url: string;
    };
    abilities: {
      ability: { name: string; url: string };
      is_hidden: boolean;
      slot: number;
    }[];
  }[];
};
