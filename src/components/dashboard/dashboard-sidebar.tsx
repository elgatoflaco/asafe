import { MenuItem } from '@/types/dashboard'
import { MENU_ITEMS } from '@/config/navigation'
import Link from 'next/link'
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar"

interface SidebarProps {
    menuItems?: MenuItem[]
    title?: string
    menuLabel?: string
}

export function AppSidebar({
    menuItems = MENU_ITEMS,
    title = "Dashboard",
    menuLabel = "Menú Principal"
}: SidebarProps) {
    return (
        <Sidebar>
            <SidebarHeader>
                <h2 className="text-xl font-bold">{title}</h2>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>{menuLabel}</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-2">
                            {menuItems.map((item) => (
                                <SidebarMenuItem key={item.label}>
                                    <SidebarMenuButton
                                        asChild
                                        className="w-full"
                                    >
                                        <Link
                                            href={item.href}
                                            className="flex items-center px-4 py-3 rounded-xl text-zinc-600 
                               hover:bg-zinc-100/80 hover:text-zinc-900
                               hover:shadow-sm
                               active:scale-[0.99]
                               group"
                                        >
                                            <item.icon className="mr-3 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                                            <span className="font-medium">{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}

