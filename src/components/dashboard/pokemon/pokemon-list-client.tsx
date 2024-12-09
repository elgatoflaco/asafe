"use client"

import { usePagination } from '@/hooks/use-pagination';
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pokemon, PokemonListClientProps } from '@/types/pokemon';
import { Pagination } from "@/components/ui/pagination";

export function PokemonListClient({
    initialPage,
    initialPageSize,
    pokemonList,
    totalCount,
    totalPages
}: PokemonListClientProps) {
    const { page, pageSize, handlePageChange, handlePageSizeChange } = usePagination(initialPage, initialPageSize);

    return (
        <div role="region" aria-label="Lista de Pokémon">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-4">
                <div className="text-sm sm:text-base" aria-live="polite">
                    Mostrando {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, totalCount)} de {totalCount} Pokémon
                </div>
                <Select
                    value={pageSize.toString()}
                    onValueChange={handlePageSizeChange}
                    aria-label="Seleccionar cantidad de Pokémon por página"
                >
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Seleccionar tamaño de página" />
                    </SelectTrigger>
                    <SelectContent>
                        {[10, 20, 50, 100].map(size => (
                            <SelectItem key={size} value={size.toString()}>
                                {size} por página
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="overflow-x-auto">
                <Table aria-label="Tabla de Pokémon">
                    <TableHeader>
                        <TableRow>
                            <TableHead scope="col" className="w-20">ID</TableHead>
                            <TableHead scope="col" className="min-w-[150px]">Nombre</TableHead>
                            <TableHead scope="col" className="w-20">Imagen</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pokemonList.map((pokemon: Pokemon, index: number) => (
                            <TableRow key={pokemon.name}>
                                <TableCell className="text-sm sm:text-base">
                                    {(page - 1) * pageSize + index + 1}
                                </TableCell>
                                <TableCell className="font-medium text-sm sm:text-base">
                                    {pokemon.name}
                                </TableCell>
                                <TableCell>
                                    <div className="w-12 h-12 sm:w-16 sm:h-16">
                                        <Image
                                            src={pokemon.sprite}
                                            alt={`Imagen de ${pokemon.name}`}
                                            className="object-contain"
                                            width={64}
                                            height={64}
                                            loading="lazy"
                                            quality={75}
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div
                aria-live="polite"
                role="status"
                aria-label="Información de paginación"
                className="text-sm sm:text-base"
            >
                Mostrando {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, totalCount)} de {totalCount} Pokémon
            </div>
            <div className="mt-4">
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}
