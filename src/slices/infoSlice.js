import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

const infoAdapter = createEntityAdapter();

const initialState = {
  allArticles: '-',
  allNumbers: '-',
  averageArticles: '-',
};

export const fetchTotalStatistic = createAsyncThunk(
  'pages/fetchTotalStatistic',
  async () => {
    const response = await axios.get(routes.totalStatisticPath(), {
      headers: {

      },
    });
    const { all_articles, all_numbers, average_articles } = response.data;
    return {
      allArticles: all_articles,
      allNumbers: all_numbers,
      averageArticles: average_articles,
    };
  },
);

const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTotalStatistic.fulfilled, (state, action) => ({ ...state, ...action.payload }));
  },
});

export const selectors = infoAdapter.getSelectors((state) => state.info);
export const { actions } = infoSlice;
export default infoSlice.reducer;
