export interface Pokemon {
  name: string;
  sprite: string;
}

export interface ApiPokemon {
  name: string;
  url: string;
}

export interface PokemonStat {
  stat: {
    name: string;
  };
  base_stat: number;
}

export interface PokemonStatResponse {
  name: string;
  value: number;
}

export interface PokemonType {
  name: string;
  url: string;
}

export interface PokemonTypeWithCount {
  name: string;
  value: number;
  url?: string;
}

export interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface PokemonListResponse {
  results: Pokemon[];
  count: number;
}

export interface PokemonListClientProps {
  initialPage: number;
  initialPageSize: number;
  pokemonList: Pokemon[];
  totalCount: number;
  totalPages: number;
}

export interface PokemonListParams {
  page: number;
  pageSize: number;
}
