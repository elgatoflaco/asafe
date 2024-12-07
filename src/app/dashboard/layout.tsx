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
                <div className="flex flex-col flex-1">
                    <DashboardHeader className="sticky top-0 z-10">
                        <SidebarTrigger />
                    </DashboardHeader>
                    <div className="">
                        {children}
                    </div>
                </div>
            </div>
        </SidebarProvider>
    )
}
