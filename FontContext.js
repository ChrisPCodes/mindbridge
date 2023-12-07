// FontContext.js
import React, { createContext, useState, useContext } from 'react';

const FontContext = createContext();

const FontProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(18); // default font size
  const [fontFamily, setFontFamily] = useState('System'); // default font family

  const updateFont = (size, family) => {
    setFontSize(size);
    setFontFamily(family);
  };

  return (
    <FontContext.Provider value={{ fontSize, fontFamily, updateFont }}>
      {children}
    </FontContext.Provider>
  );
};

export { FontProvider, FontContext };
