import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'emerald' | 'pearl' | 'amethyst';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  isSoundOn: boolean;
  setIsSoundOn: (enabled: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('vitalis_theme');
    return (saved as ThemeMode) || 'emerald';
  });

  const [isSoundOn, setIsSoundOnState] = useState<boolean>(() => {
    return localStorage.getItem('vitalis_sound') === 'true';
  });

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem('vitalis_theme', newTheme);
  };

  const setIsSoundOn = (enabled: boolean) => {
    setIsSoundOnState(enabled);
    localStorage.setItem('vitalis_sound', String(enabled));
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-emerald', 'theme-pearl', 'theme-amethyst', 'dark', 'light');

    if (theme === 'pearl') {
      root.classList.add('theme-pearl', 'light');
    } else if (theme === 'amethyst') {
      root.classList.add('theme-amethyst', 'dark');
    } else {
      root.classList.add('theme-emerald', 'dark');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isSoundOn, setIsSoundOn }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
