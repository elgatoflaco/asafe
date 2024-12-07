import { Suspense } from "react"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { StatisticsCards } from "@/components/dashboard/stats/stadistics-cards"
import { StatisticsCardsSkeleton } from "@/components/dashboard/stats/stadistics-skeleton"
import { PokemonStats } from "@/components/dashboard/stats/pokemon-stats"
import { PokemonStatsSkeleton } from "@/components/dashboard/stats/pokemon-stats-skeleton"

export default function Dashboard() {
    return (
        <DashboardShell>
            <Suspense fallback={<StatisticsCardsSkeleton />}>
                <StatisticsCards />
            </Suspense>
            <Suspense fallback={<PokemonStatsSkeleton />}>
                <PokemonStats id={1} />
            </Suspense>
        </DashboardShell>
    )
}

