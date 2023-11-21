import React, { createContext } from 'react';

export const DomainContext = createContext({});

const DomainProvider = ({ children }) => {
  const domain = window.location.hostname;
  const magazines = {
    [process.env.REACT_APP_DOMAIN_SCIENTIFICSEARCH]: 'ScientificSearch',
    [process.env.REACT_APP_DOMAIN_ECONOMPRAV]: 'EconomPrav',
    [process.env.REACT_APP_DOMAIN_SCIENTIFICNOTES]: 'ScientificNotes',
    [process.env.REACT_APP_DOMAIN_IPP]: 'Ipp',
    [process.env.REACT_APP_DOMAIN_TLIC]: 'TlIc',
    [process.env.REACT_APP_DOMAIN_AUDITORIUM]: 'Auditorium',
    [process.env.REACT_APP_DOMAIN_IGNIS]: 'Ignis',
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
