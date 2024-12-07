export const API_ENDPOINTS = {
  POKEMON: {
    BASE: process.env.NEXT_PUBLIC_POKEMON_API_URL ?? "",
    TYPES: process.env.NEXT_PUBLIC_POKEMON_API_TYPES_URL ?? "",
  },
} as const;

export const CACHE_TIMES = {
  HOUR: 3600,
  DAY: 86400,
} as const;
