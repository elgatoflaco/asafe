import dynamic from 'next/dynamic'
import { PokemonStatsSkeleton } from '../dashboard/stats/pokemon-stats-skeleton'

export const D3BarChart = dynamic(
    () => import('./bar-chart').then((mod) => mod.BarChart),
    {
        ssr: false,
        loading: () => <PokemonStatsSkeleton />
    }
)

export const D3LineChart = dynamic(
    () => import('./line-chart').then((mod) => mod.LineChart),
    {
        ssr: false,
        loading: () => <PokemonStatsSkeleton />
    }
)

