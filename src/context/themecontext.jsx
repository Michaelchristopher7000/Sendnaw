import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("appTheme") || "light";
  });

  const setThemeMode = (value) => {
    setTheme(value);
    localStorage.setItem("appTheme", value);
  };

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setThemeMode(next);
  };

  // Apply theme class to <body> so CSS can pick it up globally if needed
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}