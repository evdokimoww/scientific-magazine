import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

const archiveAdapter = createEntityAdapter();

const initialState = archiveAdapter.getInitialState();

export const fetchArchiveNumbers = createAsyncThunk(
  'archive/fetchArchiveNumbers',
  async () => {
    const response = await axios.get(routes.archivePath());
    return {
      number: response.data.number,
      pages: response.data.pages,
      currentPage: response.data.current_page,
    };
  },
);

const archiveSlice = createSlice({
  name: 'archive',
  initialState: {
    ...initialState,
    pages: 1,
    currentPage: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArchiveNumbers.fulfilled, (state, action) => {
        archiveAdapter.addMany(state, action.payload.number);
        state.pages = action.payload.pages;
        state.currentPage = action.payload.currentPage;
      });
  },
});

export const selectors = archiveAdapter.getSelectors((state) => state.archive);
export const { actions } = archiveSlice;
export default archiveSlice.reducer;
