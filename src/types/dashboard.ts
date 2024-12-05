import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export interface MenuItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

export interface DashboardLayoutProps {
  children: ReactNode;
}

export interface DashboardHeaderProps {
  children: ReactNode;
  title?: string;
}

export interface SidebarProps {
  menuItems?: MenuItem[];
  title?: string;
  menuLabel?: string;
}

export interface UserDropdownProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}
