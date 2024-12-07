import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardLayoutProps } from '@/types/dashboard'
import { AppSidebar } from '@/components/dashboard/dashboard-sidebar'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { SidebarTrigger } from '@/components/ui/sidebar'

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <SidebarProvider>
            <div className="flex h-screen w-full">
                <AppSidebar />
                <div className="flex-1 flex flex-col overflow-hidden">
                    <DashboardHeader className="flex-shrink-0">
                        <SidebarTrigger />
                    </DashboardHeader>
                    <div className="flex-1 overflow-y-auto">
                        {children}
                    </div>
                </div>
            </div>
        </SidebarProvider>
    )
}
