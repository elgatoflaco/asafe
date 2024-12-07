import { Button } from "@/components/ui/button";
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    labels?: {
        first?: string;
        previous?: string;
        next?: string;
        last?: string;
    };
}

export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    labels = {
        first: "Primera",
        previous: "Anterior",
        next: "Siguiente",
        last: "Última"
    }
}: PaginationProps) {
    const showPageNumbers = totalPages <= 5;
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);

    return (
        <div className="flex justify-center items-center gap-1 sm:gap-2 flex-wrap">
            <div className="hidden sm:flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                >
                    {labels.first}
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    {labels.previous}
                </Button>
            </div>

            <div className="flex sm:hidden items-center gap-1">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                >
                    <ChevronFirst className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
                {showPageNumbers ? (
                    // Mostrar todos los números si hay 5 o menos páginas
                    [...Array(totalPages)].map((_, i) => (
                        <Button
                            key={i + 1}
                            variant={currentPage === i + 1 ? "default" : "outline"}
                            size="sm"
                            onClick={() => onPageChange(i + 1)}
                            className="hidden sm:inline-flex"
                        >
                            {i + 1}
                        </Button>
                    ))
                ) : (
                    [...Array(endPage - startPage + 1)].map((_, i) => {
                        const pageNumber = startPage + i;
                        return (
                            <Button
                                key={pageNumber}
                                variant={pageNumber === currentPage ? "default" : "outline"}
                                size="sm"
                                onClick={() => onPageChange(pageNumber)}
                                className="hidden sm:inline-flex"
                            >
                                {pageNumber}
                            </Button>
                        );
                    })
                )}


                <span className="sm:hidden text-sm font-medium">
                    {currentPage} de {totalPages}
                </span>
            </div>

            {/* Botones de navegación para móvil */}
            <div className="flex sm:hidden items-center gap-1">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages}
                >
                    <ChevronLast className="h-4 w-4" />
                </Button>
            </div>


            <div className="hidden sm:flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    {labels.next}
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages}
                >
                    {labels.last}
                </Button>
            </div>
        </div>
    );
}