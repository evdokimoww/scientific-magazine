import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

const searchAdapter = createEntityAdapter();

const initialState = searchAdapter.getInitialState({ loading: 'idle', error: null });

export const fetchSearchArticles = createAsyncThunk(
  'archive/fetchSearchArticles',
  async (formData) => {
    const response = await axios.post(routes.searchPath(), formData);
    return response.data.result;
  },
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchArticles.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(fetchSearchArticles.fulfilled, (state, action) => {
        searchAdapter.setAll(state, action.payload);
        state.loading = 'idle';
        state.error = null;
      })
      .addCase(fetchSearchArticles.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error;
      });
  },
});

export const selectors = searchAdapter.getSelectors((state) => state.search);
export const { actions } = searchSlice;
export default searchSlice.reducer;
