import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

const mostViewedArticlesAdapter = createEntityAdapter();

const initialState = mostViewedArticlesAdapter.getInitialState();

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
      .addCase(fetchMostViewedArticles.fulfilled, (state, action) => {
        mostViewedArticlesAdapter.addMany(state, action.payload);
      });
  },
});

export const selectors = mostViewedArticlesAdapter.getSelectors((state) => state.mostViewedArticles);
export const { actions } = mostViewedArticlesSlice;
export default mostViewedArticlesSlice.reducer;
