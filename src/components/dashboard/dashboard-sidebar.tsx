import { MenuItem } from '@/types/dashboard'
import { MENU_ITEMS } from '@/constants/navigation'
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
            <div
                data-sidebar="sidebar"
                className="flex h-full w-full flex-col bg-sidebar dark:bg-black transition-colors duration-200"
            >
                <SidebarHeader>
                    <h2 className="text-xl font-bold dark:text-white">{title}</h2>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel className="dark:text-gray-400">{menuLabel}</SidebarGroupLabel>
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
                                                className="flex items-center px-4 py-3 rounded-xl 
                                                    text-zinc-600 dark:text-gray-300
                                                    hover:bg-zinc-100/80 dark:hover:bg-zinc-800 
                                                    hover:text-zinc-900 dark:hover:text-white
                                                    hover:shadow-sm dark:hover:shadow-gray-800
                                                    active:scale-[0.99]
                                                    transition-all duration-200
                                                    group"
                                            >
                                                <item.icon className="mr-3 h-5 w-5 transition-transform duration-300 group-hover:scale-110 dark:text-gray-400 dark:group-hover:text-white" />
                                                <span className="font-medium">{item.label}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>

                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </div>
        </Sidebar>
    )
}
