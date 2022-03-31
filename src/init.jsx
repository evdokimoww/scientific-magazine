import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import ru from './locales/ru';
import App from './components/App.jsx';
import DomainProvider from './context/DomainContext.jsx';
import store from './slices/index.js';
import LanguageProvider from './context/LanguageContext.jsx';

export default async () => {
  const i18nextInstance = i18next.createInstance();
  await i18nextInstance
    .use(initReactI18next)
    .init({
      lng: 'ru',
      resources: ru,
    });

  return (
    <Provider store={store}>
      <DomainProvider>
        <I18nextProvider i18n={i18nextInstance}>
          <LanguageProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </LanguageProvider>
        </I18nextProvider>
      </DomainProvider>
    </Provider>
  );
};
