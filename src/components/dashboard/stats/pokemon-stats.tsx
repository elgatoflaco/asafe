import { Suspense, memo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { D3BarChart } from '@/components/charts/dynamic-d3'
import { D3LineChart } from '@/components/charts/dynamic-d3'
import { PokemonStatsSkeleton } from './pokemon-stats-skeleton'
import { getPokemonStats, getPokemonTypeStats } from '@/services/api/pokemon'

const StatsChart = memo(function StatsChart({ stats }: { stats: { name: string; value: number }[] }) {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Estadísticas de Pokémon</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
                <D3BarChart
                    data={stats}
                    height={350}
                    colors={['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F06292']}
                />
            </CardContent>
        </Card>
    )
}, (prevProps, nextProps) => {
    return JSON.stringify(prevProps.stats) === JSON.stringify(nextProps.stats);
})

const TypesChart = memo(function TypesChart({ types }: { types: { name: string; value: number }[] }) {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Distribución de Tipos de Pokémon</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
                <D3LineChart
                    data={types}
                    height={350}
                />
            </CardContent>
        </Card>
    )
})

export async function PokemonStats({ id }: { id: number }) {
    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Suspense
                fallback={<PokemonStatsSkeleton />}
                key={`stats-${id}`}
            >
                <StatsStatsLoader id={id} />
            </Suspense>
            <Suspense
                fallback={<PokemonStatsSkeleton />}
                key={`types`}
            >
                <TypesStatsLoader />
            </Suspense>
        </div>
    )
}

async function StatsStatsLoader({ id }: { id: number }) {
    const stats = await getPokemonStats(id)
    return <StatsChart stats={stats} />
}

async function TypesStatsLoader() {
    const types = await getPokemonTypeStats()
    return <TypesChart types={types} />
}
