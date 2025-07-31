import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
let systemSettingDark: MediaQueryList | undefined;

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
    systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
  }

  const savedTheme = localStorage.getItem("theme") as Theme | null;

  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (systemSettingDark?.matches) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
