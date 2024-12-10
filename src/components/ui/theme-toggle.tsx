"use client";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from 'lucide-react'
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Marcar el componente como montado después de la primera renderización
  // para asegurarse de que se aplique el tema sólo en el cliente.
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // O un placeholder si es necesario
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      data-testid="theme-toggle"
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light");
      }}
    >
      <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Cambiar tema</span>
    </Button>
  );
}
