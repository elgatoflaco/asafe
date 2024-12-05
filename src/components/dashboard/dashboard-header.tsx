import { ReactNode } from "react"
import { UserDropdown } from "@/components/dashboard/user-dropdown"

export function DashboardHeader({ children, title = "Dashboard" }: { children: ReactNode, title?: string }) {
    return (
        <header className="flex h-16 items-center gap-4 border-b bg-gray-100/40 px-6">
            {children}
            <h1 className="text-lg font-semibold">{title}</h1>
            <div className="ml-auto flex items-center gap-4">
                <UserDropdown />
            </div>
        </header>
    )
}

