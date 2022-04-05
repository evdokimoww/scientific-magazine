import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

const mostViewedArticlesAdapter = createEntityAdapter();

const initialState = mostViewedArticlesAdapter.getInitialState({ loading: 'idle', error: null });

export const fetchMostViewedArticles = createAsyncThunk(
  'mostViewedArticles/fetchMostViewedArticles',
  async () => {
    const response = await axios.get(routes.mostViewedArticlesPath());
    return response.data;
  },
);

const mostViewedArticlesSlice = createSlice({
  name: 'mostViewedArticles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMostViewedArticles.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(fetchMostViewedArticles.fulfilled, (state, action) => {
        mostViewedArticlesAdapter.addMany(state, action.payload);
        state.loading = 'idle';
        state.error = null;
      })
      .addCase(fetchMostViewedArticles.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error;
      });
  },
});

export const selectors = mostViewedArticlesAdapter.getSelectors((state) => state.mostViewedArticles);
export const { actions } = mostViewedArticlesSlice;
export default mostViewedArticlesSlice.reducer;
