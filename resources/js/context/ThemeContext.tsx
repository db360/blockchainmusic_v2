import React, { createContext, useContext, useEffect, useState } from 'react';

// TYPES
type Theme = 'light' | 'dark' | 'system';

// INTERFACE
interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// CONTEXT
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// PROVIDER
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    return savedTheme || 'system';
  });

  // APPLY THEME
  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = (currentTheme: Theme) => {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', currentTheme === 'dark' || (currentTheme === 'system' && prefersDark));
    };

    applyTheme(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // RETURN PROVIDER
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// HOOK
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
