import { Home, BarChart2, Users } from "lucide-react";
import { MenuItem } from "@/types/dashboard";

export const MENU_ITEMS: MenuItem[] = [
  { icon: Home, label: "Inicio", href: "/dashboard" },
  { icon: Users, label: "Pokémon", href: "/dashboard/pokemon" },
  { icon: BarChart2, label: "Estadísticas", href: "/dashboard/estadisticas" },
];
