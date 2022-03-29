import React, { createContext } from 'react';

export const DomainContext = createContext({});

const DomainProvider = ({ children }) => {
  const domain = window.location.host;
  const magazines = {
    'localhost:8080': 'ScientificSearch',
    'economprav.ru': 'EconomPrav',
    'scientific-notes.ru': 'ScientificNotes',
    'ipp.kursksu.ru': 'Ipp',
    // 'scientific-search.kursksu.ru': 'ScientificSearch',
  };

  const value = {
    domain: magazines[domain],
  };

  return (
    <DomainContext.Provider value={value}>
      {children}
    </DomainContext.Provider>
  );
};

export default DomainProvider;
