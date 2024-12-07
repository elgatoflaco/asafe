import React, { Suspense } from "react";
import { PokemonListSkeleton } from "@/components/dashboard/pokemon/pokemon-list-skeleton";
import { PokemonListServer } from "@/components/dashboard/pokemon/pokemon-list-server";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function PokemonPage({
    searchParams,
}: {
    searchParams: { page?: string, pageSize?: string }
}) {
    const page = Number(searchParams.page) || 1;
    const pageSize = Number(searchParams.pageSize) || 10;

    return (
        <DashboardShell>
            <h1 className="text-3xl font-bold mb-6">Lista de Pokémon</h1>
            <Suspense fallback={<PokemonListSkeleton />}>
                <PokemonListServer page={page} pageSize={pageSize} />
            </Suspense>
        </DashboardShell>
    );
}
