import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

const newNumberAdapter = createEntityAdapter();

const initialState = newNumberAdapter.getInitialState({ loading: 'idle', error: null });

export const fetchMagazineNewNumber = createAsyncThunk(
  'magazines/fetchMagazineNewNumber',
  async () => {
    const response = await axios.get(routes.newNumberPath());
    return {
      description: response.data[0].description,
      id: response.data[2].id,
      sections: response.data[1],
    };
  },
);

const newNumberSlice = createSlice({
  name: 'newNumber',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMagazineNewNumber.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(fetchMagazineNewNumber.fulfilled, (state, action) => {
        newNumberAdapter.addOne(state, action.payload);
        state.loading = 'idle';
        state.error = null;
      })
      .addCase(fetchMagazineNewNumber.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error;
      });
  },
});

export const selectors = newNumberAdapter.getSelectors((state) => state.newNumber);
export const { actions } = newNumberSlice;
export default newNumberSlice.reducer;
