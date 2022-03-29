import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

const magazineAdapter = createEntityAdapter();

const initialState = magazineAdapter.getInitialState();

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
      .addCase(fetchMagazineNumberById.fulfilled, (state, action) => {
        magazineAdapter.addOne(state, action.payload);
      });
  },
});

export const selectors = magazineAdapter.getSelectors((state) => state.magazine);
export const { actions } = magazineSlice;
export default magazineSlice.reducer;
