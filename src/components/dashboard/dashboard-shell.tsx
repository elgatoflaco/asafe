import { ReactNode } from "react"

export function DashboardShell({ children }: { children: ReactNode }) {
    return <main className="flex-1 p-6 overflow-y-auto">{children}</main>
}

