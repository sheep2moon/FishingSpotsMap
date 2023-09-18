import { IconBrightnessUp, IconMoon } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
type Theme = "light" | "dark";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.theme === "light") {
        setTheme("light");
        document.documentElement.classList.remove("dark");
      } else {
        setTheme("dark");
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            id="theme-toggle"
            className="justify-start"
            variant="ghost"
            onClick={toggleTheme}
          >
            {theme === "dark" && <IconMoon />}
            {theme === "light" && <IconBrightnessUp />}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="p-2">
          <p>Zmień motyw na {theme === "light" ? "ciemny" : "jasny"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ThemeToggle;
