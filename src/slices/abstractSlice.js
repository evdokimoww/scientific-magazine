import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

const abstractAdapter = createEntityAdapter();

const initialState = abstractAdapter.getInitialState();

export const fetchAbstractById = createAsyncThunk(
  'abstract/fetchAbstractById',
  async (id) => {
    const response = await axios.get(routes.abstractByIdPath(id));
    return {
      id,
      sections: response.data,
    };
  },
);

const abstractSlice = createSlice({
  name: 'abstract',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAbstractById.fulfilled, (state, action) => {
        abstractAdapter.addOne(state, action.payload);
      });
  },
});

export const selectors = abstractAdapter.getSelectors((state) => state.abstract);
export const { actions } = abstractSlice;
export default abstractSlice.reducer;
