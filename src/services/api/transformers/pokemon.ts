import {
  Pokemon,
  ApiPokemon,
  PokemonStat,
  PokemonType,
  PokemonStatResponse,
  PokemonTypeWithCount,
  TypePokemon,
} from "@/types/pokemon";
import { ApiListResponse } from "@/types/api";

export const setPokemonListData = (
  data: ApiListResponse<ApiPokemon>
): Pokemon[] => {
  return data.results.map((pokemon) => ({
    id: Number(pokemon.url.split("/")[6]),
    name: pokemon.name,
    types: [],
    sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
      pokemon.url.split("/")[6]
    }.png`,
  }));
};

export const setPokemonStatsData = (
  stats: PokemonStat[]
): PokemonStatResponse[] => {
  return stats.map((stat) => ({
    name: stat.stat.name,
    value: stat.base_stat,
  }));
};

export const setPokemonTypeData = (
  types: TypePokemon[],
  typeNames: PokemonType[]
): PokemonTypeWithCount[] => {
  return types.map((type, index) => ({
    name: typeNames[index].name,
    value: type.pokemon.length,
  }));
};
