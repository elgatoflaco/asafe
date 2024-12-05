import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardLayoutProps } from '@/types/dashboard'
import { AppSidebar } from '@/components/dashboard/dashboard-sidebar'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { SidebarTrigger } from '@/components/ui/sidebar'

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <SidebarProvider>
            <div className="flex h-screen overflow-hidden w-full">
                <AppSidebar />
                <div className="flex flex-col flex-1 overflow-hidden">
                    <DashboardHeader>
                        <SidebarTrigger />
                    </DashboardHeader>
                    <main className="flex-1 overflow-y-auto p-6">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    )
} 