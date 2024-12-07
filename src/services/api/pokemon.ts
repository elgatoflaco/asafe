import { CACHE_TIMES, API_ENDPOINTS } from "@/constants/api";
import { fetchApi } from "@/services/api/base";
import {
  setPokemonListData,
  setPokemonStatsData,
  setPokemonTypeData,
} from "./transformers/pokemon";
import {
  Pokemon,
  ApiPokemon,
  PokemonStat,
  PokemonType,
  PokemonStatResponse,
  PokemonTypeWithCount,
  PokemonListResponse,
} from "@/types/pokemon";
import { ApiListResponse } from "@/types/api";

export async function getPokemonList(
  page: number,
  pageSize: number
): Promise<PokemonListResponse> {
  const offset = (page - 1) * pageSize;

  try {
    const data = await fetchApi<ApiListResponse<ApiPokemon>>(
      `${API_ENDPOINTS.POKEMON.BASE}?limit=${pageSize}&offset=${offset}`,
      {
        revalidate: CACHE_TIMES.HOUR,
        tags: ["pokemon-list"],
      }
    );

    return {
      results: setPokemonListData(data),
      count: data.count,
    };
  } catch (error) {
    console.error("Error fetching Pokemon list:", error);
    return { results: [], count: 0 };
  }
}

export async function getPokemonStats(
  id: number
): Promise<PokemonStatResponse[]> {
  try {
    const data = await fetchApi<{ stats: PokemonStat[] }>(
      `${API_ENDPOINTS.POKEMON.BASE}/${id}`,
      {
        revalidate: CACHE_TIMES.HOUR,
      }
    );

    return setPokemonStatsData(data.stats);
  } catch (error) {
    console.error("Error fetching Pokemon stats:", error);
    return [];
  }
}

export async function getPokemonTypeStats(): Promise<PokemonTypeWithCount[]> {
  try {
    const { results } = await fetchApi<ApiListResponse<PokemonType>>(
      API_ENDPOINTS.POKEMON.TYPES,
      {
        revalidate: CACHE_TIMES.DAY,
      }
    );

    const typesData = await Promise.all(
      results.map((type) => fetchApi<{ pokemon: any[] }>(type.url))
    );

    return setPokemonTypeData(typesData, results);
  } catch (error) {
    console.error("Error fetching Pokemon type stats:", error);
    return [];
  }
}
