import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

const magazineAdapter = createEntityAdapter();

const initialState = magazineAdapter.getInitialState({ loading: 'idle', error: null });

export const fetchMagazineNumberById = createAsyncThunk(
  'magazines/fetchMagazineNumberById',
  async (id) => {
    const response = await axios.get(routes.magazineNumberByIdPath(id));
    return {
      description: response.data[0].description,
      id: response.data[2].id,
      sections: response.data[1],
    };
  },
);

const magazineSlice = createSlice({
  name: 'magazine',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMagazineNumberById.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(fetchMagazineNumberById.fulfilled, (state, action) => {
        magazineAdapter.addOne(state, action.payload);
        state.loading = 'idle';
        state.error = null;
      })
      .addCase(fetchMagazineNumberById.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error;
      });
  },
});

export const selectors = magazineAdapter.getSelectors((state) => state.magazine);
export const { actions } = magazineSlice;
export default magazineSlice.reducer;
