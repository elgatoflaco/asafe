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
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light");
      }}
    >
      {theme === "dark" ? (
        <MoonIcon className="transition-all" />
      ) : (
        <SunIcon className="transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
