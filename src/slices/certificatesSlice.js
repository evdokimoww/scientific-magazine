import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

const certificatesAdapter = createEntityAdapter();

const initialState = certificatesAdapter.getInitialState({ loading: 'idle', error: null });

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
      .addCase(fetchCertificates.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(fetchCertificates.fulfilled, (state, action) => {
        certificatesAdapter.addMany(state, action.payload);
        state.loading = 'idle';
        state.error = null;
      })
      .addCase(fetchCertificates.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error;
      });
  },
});

export const selectors = certificatesAdapter.getSelectors((state) => state.certificates);
export const { actions } = certificatesSlice;
export default certificatesSlice.reducer;
