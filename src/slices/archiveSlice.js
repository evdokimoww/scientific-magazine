import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

const archiveAdapter = createEntityAdapter();

const initialState = archiveAdapter.getInitialState({
  pages: 1,
  currentPage: 1,
  loading: 'idle',
  error: null,
});

export const fetchArchiveNumbers = createAsyncThunk(
  'archive/fetchArchiveNumbers',
  async (pageNumber) => {
    const response = await axios.get(routes.archivePath(pageNumber));
    return {
      number: response.data.number,
      pages: response.data.pages,
      currentPage: response.data.current_page,
    };
  },
);

const archiveSlice = createSlice({
  name: 'archive',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArchiveNumbers.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(fetchArchiveNumbers.fulfilled, (state, action) => {
        archiveAdapter.setAll(state, action.payload.number);
        state.pages = action.payload.pages;
        state.currentPage = action.payload.currentPage;
        state.loading = 'idle';
        state.error = null;
      })
      .addCase(fetchArchiveNumbers.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error;
      });
  },
});

export const selectors = archiveAdapter.getSelectors((state) => state.archive);
export const { actions } = archiveSlice;
export default archiveSlice.reducer;
