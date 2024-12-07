import { ReactNode } from "react"
import { UserDropdown } from "@/components/dashboard/user-dropdown"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { cn } from "@/lib/utils"

interface DashboardHeaderProps {
    children: ReactNode;
    className?: string;
}

export function DashboardHeader({ children, className }: DashboardHeaderProps) {
    return (
        <header className={cn(
            "sticky top-0 z-50 flex min-h-[64px] h-16 items-center gap-4 border-b border-zinc-200 dark:border-zinc-800 bg-gray-100/80 dark:bg-black/80 backdrop-blur-sm px-6 transition-colors duration-200",
            className
        )}>
            {children}
            <div className="ml-auto flex items-center gap-4">
                <ThemeToggle />
                <UserDropdown />
            </div>
        </header>
    )
}
