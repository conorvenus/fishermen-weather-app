import React, { createContext, useState, useContext } from 'react';

// Create a context to manage the current theme state
const ThemeContext = createContext();

// ThemeProvider component to manage the theme state
export const ThemeProvider = ({ children }) => {
  // Set initial state to 'light' theme
  const [theme, setTheme] = useState('light');

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    // Toggle the theme between 'light' and 'dark'
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Provide the theme and toggle function to its children
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to access the theme context
export const useTheme = () => useContext(ThemeContext);