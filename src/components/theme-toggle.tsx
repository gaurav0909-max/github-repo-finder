"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils/cn";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative h-10 w-10 rounded-md border border-border",
        "flex items-center justify-center",
        "bg-background hover:bg-muted",
        "transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      )}
      aria-label="Toggle theme"
    >
      {theme === "light" && <Sun className="h-5 w-5 text-foreground" />}
      {theme === "dark" && <Moon className="h-5 w-5 text-foreground" />}
      {theme === "system" && <Monitor className="h-5 w-5 text-foreground" />}
    </button>
  );
}
