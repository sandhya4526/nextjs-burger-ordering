import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// This defines what our theme context can do
interface ThemeContextType {
  theme: 'light' | 'dark'; // The current theme
  toggleTheme: () => void; // A function to switch between themes
}

// We're creating a new context for our theme
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// This is the main component that wraps our app and provides theme functionality
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // This is where we store our current theme
  const [theme, setTheme] = useState<'light' | 'dark'>('dark'); // We start with dark theme

  // This runs when our component first loads
  useEffect(() => {
    // We check if the user has a saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme as 'light' | 'dark');
    
    // We apply the theme to our whole app
    document.documentElement.className = `${savedTheme}-theme`;
    document.body.style.backgroundColor = savedTheme === 'light' ? '#ffffff' : '#000000';
    document.body.style.color = savedTheme === 'light' ? '#000000' : '#ffffff';
  }, []);

  // This function switches between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    // We apply the new theme to our whole app
    document.documentElement.className = `${newTheme}-theme`;
    document.body.style.backgroundColor = newTheme === 'light' ? '#ffffff' : '#000000';
    document.body.style.color = newTheme === 'light' ? '#000000' : '#ffffff';
    
    // We save the user's preference for next time
    localStorage.setItem('theme', newTheme);
  };

  // We're providing the current theme and the toggle function to the rest of our app
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// This is a handy hook that lets other components easily use our theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
