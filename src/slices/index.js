import { configureStore } from '@reduxjs/toolkit';
import pagesSlice from './pagesSlice.js';
import infoSlice from './infoSlice.js';
import newNumberSlice from './newNumberSlice.js';
import archiveSlice from './archiveSlice.js';
import magazineSlice from './magazineSlice.js';
import mostViewedArticlesSlice from './mostViewedArticlesSlice';
import searchSlice from './searchSlice';
import certificatesSlice from './certificatesSlice';
import abstractSlice from './abstractSlice';

export default configureStore({
  reducer: {
    pages: pagesSlice,
    info: infoSlice,
    newNumber: newNumberSlice,
    archive: archiveSlice,
    magazine: magazineSlice,
    abstract: abstractSlice,
    mostViewedArticles: mostViewedArticlesSlice,
    search: searchSlice,
    certificates: certificatesSlice,
  },
});
