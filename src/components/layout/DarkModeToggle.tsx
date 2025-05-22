
"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "../providers/theme-provider";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

export function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a placeholder or null to avoid hydration mismatch
    return <div style={{ width: '2.5rem', height: '2.5rem' }} />; 
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
      {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </Button>
  );
}
