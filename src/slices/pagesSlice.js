import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

const pagesAdapter = createEntityAdapter();

const initialState = pagesAdapter.getInitialState();

export const fetchPageByLink = createAsyncThunk(
  'pages/fetchPageByName',
  async (link) => {
    const response = await axios.get(routes.pagesPath(link));
    const {
      content_en,
      content_rus,
      name,
      site_id,
      title,
    } = response.data.page[0];

    return {
      id: title,
      name,
      site_id,
      content_rus,
      content_en,
    };
  },
);

const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPageByLink.fulfilled, (state, action) => {
        pagesAdapter.addOne(state, action.payload);
      });
  },
});

export const selectors = pagesAdapter.getSelectors((state) => state.pages);
export const { actions } = pagesSlice;
export default pagesSlice.reducer;
