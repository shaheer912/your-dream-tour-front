import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';

export const contact = createAsyncThunk(
  'contact',
  async ({ formData, toast }, { rejectWithValue }) => {
    try {
      const response = await api.contact(formData);
      toast.success('Query Posted Successfully');
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const miscSlice = createSlice({
  name: 'misc',
  initialState: {
    error: '',
    loading: false,
  },
  extraReducers: {
    [contact.pending]: (state, action) => {
      state.loading = true;
    },
    [contact.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [contact.rejected]: (state, action) => {
      state.loading = false;
      state.error = action?.error
        ? 'Could not submit your query, please try again later'
        : action.payload.message;
    },
  },
});

export default miscSlice.reducer;
