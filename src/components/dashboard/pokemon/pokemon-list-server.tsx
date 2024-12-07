import { PokemonListClient } from "@/components/dashboard/pokemon/pokemon-list-client"
import { getPokemonList } from '@/services/api/pokemon'

export async function PokemonListServer({ page, pageSize }: { page: number, pageSize: number }) {
  const { results: pokemonList, count: totalCount } = await getPokemonList(page, pageSize)
  const totalPages = Math.ceil(totalCount / pageSize)

  return (
    <PokemonListClient
      initialPage={page}
      initialPageSize={pageSize}
      pokemonList={pokemonList}
      totalCount={totalCount}
      totalPages={totalPages}
    />
  )
}

