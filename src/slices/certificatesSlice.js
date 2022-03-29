import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

const certificatesAdapter = createEntityAdapter();

const initialState = certificatesAdapter.getInitialState();

export const fetchCertificates = createAsyncThunk(
  'certificates/fetchCertificates',
  async () => {
    const response = await axios.get(routes.certificatesPath());
    return response.data.data;
  },
);

const certificatesSlice = createSlice({
  name: 'certificates',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCertificates.fulfilled, (state, action) => {
        certificatesAdapter.addMany(state, action.payload);
      });
  },
});

export const selectors = certificatesAdapter.getSelectors((state) => state.certificates);
export const { actions } = certificatesSlice;
export default certificatesSlice.reducer;
