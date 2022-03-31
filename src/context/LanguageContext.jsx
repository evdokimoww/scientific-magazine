import React, { createContext, useState } from 'react';

export const LanguageContext = createContext({});

const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('rus');

  const setRu = () => setLang('rus');
  const setEn = () => setLang('en');

  const value = {
    lang,
    setRu,
    setEn,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
