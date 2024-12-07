import { Skeleton } from "@/components/ui/skeleton"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export function PokemonListSkeleton() {
    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-4">
                <Skeleton className="h-6 w-48" />
                <div className="w-full sm:w-[180px]">
                    <Skeleton className="h-10" />
                </div>
            </div>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-20">ID</TableHead>
                            <TableHead className="min-w-[150px]">Nombre</TableHead>
                            <TableHead className="w-20">Imagen</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[...Array(10)].map((_, index) => (
                            <TableRow key={index}>
                                <TableCell className="text-sm sm:text-base">
                                    <Skeleton className="h-4 w-12" />
                                </TableCell>
                                <TableCell className="font-medium text-sm sm:text-base">
                                    <Skeleton className="h-4 w-32" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-12 w-12 sm:w-16 sm:h-16" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="mt-4">
                <Skeleton className="h-10 w-full" />
            </div>
        </div>
    )
}

