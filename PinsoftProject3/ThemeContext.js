import React, { createContext, useContext, useState } from 'react';


const ThemeContext = createContext();

export function useThemeContext() {
  return useContext(ThemeContext);
}

export function ThemeContextProvider({ children }) {
  const [isDarkModeOn, setIsDarkModeOn] = useState(false); 

  const toggleSwitch = () => {
    setIsDarkModeOn((prevValue) => !prevValue);
  };

  const contextValue = {
    isDarkModeOn,
    toggleSwitch,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
