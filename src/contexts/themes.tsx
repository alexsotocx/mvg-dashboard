import { createContext, FC, ReactNode, useContext, useMemo, useState } from 'react'

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  nextTheme: () => 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider: FC<{ children: ReactNode }> = (({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>("light");

  const nextTheme: ThemeContextType['nextTheme'] = () => {
    return theme === 'light' ? 'dark' : 'light';
  };
  const toggleTheme = () => {
    setTheme((prevTheme) => prevTheme === 'light' ? 'dark' : 'light');
  }

  const contextValue: ThemeContextType = useMemo(() => ({ theme, toggleTheme, nextTheme }), [theme]);

  return (
    <ThemeContext.Provider value={contextValue} >
      {children}
    </ThemeContext.Provider>
  )
});

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
