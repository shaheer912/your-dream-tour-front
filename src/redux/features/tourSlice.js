import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';

export const createTour = createAsyncThunk(
  'tour/createTour',
  async ({ updatedTourData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createTour(updatedTourData);
      toast.success('Tour created successfully!');
      navigate('/dashboard');
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getTours = createAsyncThunk(
  'tour/getTours',
  async (page, { rejectWithValue }) => {
    try {
      const response = await api.getTours(page);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getTour = createAsyncThunk(
  'tour/getTour',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getTour(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getUserTours = createAsyncThunk(
  'tour/getUserTours',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getUserTours(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const deleteTour = createAsyncThunk(
  'tour/deleteTour',
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteTour(id);
      toast.success('Tour deleted successfully!');
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updateTour = createAsyncThunk(
  'tour/updateTour',
  async ({ id, updatedTourData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.updateTour(id, updatedTourData);
      toast.success('Tour updated successfully!');
      navigate('/dashboard');
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const searchTours = createAsyncThunk(
  'tour/searchTours',
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await api.searchTours(searchQuery);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const searchToursByTag = createAsyncThunk(
  'tour/searchToursByTag',
  async (tag, { rejectWithValue }) => {
    try {
      const response = await api.searchToursByTag(tag);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getRelatedToursByTags = createAsyncThunk(
  'tour/getRelatedToursByTag',
  async (tags, { rejectWithValue }) => {
    try {
      const response = await api.getRelatedToursByTags(tags);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const likeTour = createAsyncThunk(
  'tour/likeTour',
  async ({ _id }, { rejectWithValue }) => {
    try {
      const response = await api.likeTour(_id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const tourSlice = createSlice({
  name: 'tour',
  initialState: {
    tour: {},
    tours: [],
    userTours: [],
    tagTours: [],
    relatedTours: [],
    currentPage: 1,
    numberOfPages: null,
    error: '',
    loading: false,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: {
    [createTour.pending]: (state, action) => {
      state.loading = true;
    },
    [createTour.fulfilled]: (state, action) => {
      state.loading = false;
      state.tours = [action.payload];
    },
    [createTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [getTours.pending]: (state, action) => {
      state.loading = true;
    },
    [getTours.fulfilled]: (state, action) => {
      state.loading = false;
      state.tours = action.payload.data;
      state.numberOfPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
    },
    [getTours.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [getTour.pending]: (state, action) => {
      state.loading = true;
    },
    [getTour.fulfilled]: (state, action) => {
      state.loading = false;
      state.tour = action.payload;
    },
    [getTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [getUserTours.pending]: (state, action) => {
      state.loading = true;
    },
    [getUserTours.fulfilled]: (state, action) => {
      state.loading = false;
      state.userTours = action.payload;
    },
    [getUserTours.rejected]: (state, action) => {
      state.loading = false;
      state.error = action?.payload?.message;
    },

    [deleteTour.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteTour.fulfilled]: (state, action) => {
      state.loading = false;

      const { arg } = action.meta;
      if (arg) {
        state.tours = state.tours.filter((tour) => {
          return tour._id !== arg.id;
        });
        state.userTours = state.userTours.filter((tour) => {
          return tour._id !== arg.id;
        });
      }
    },
    [deleteTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action?.payload?.message;
    },

    [updateTour.pending]: (state, action) => {
      state.loading = true;
    },
    [updateTour.fulfilled]: (state, action) => {
      state.loading = false;

      const { arg } = action.meta;
      if (arg) {
        state.tours = state.tours.map((tour) => {
          return tour._id === arg.id ? action.payload : tour;
        });
        state.userTours = state.userTours.map((tour) => {
          return tour._id === arg.id ? action.payload : tour;
        });
      }
    },
    [updateTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action?.payload?.message;
    },

    [searchTours.pending]: (state, action) => {
      state.loading = true;
    },
    [searchTours.fulfilled]: (state, action) => {
      state.loading = false;
      state.tours = action.payload;
    },
    [searchTours.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [searchToursByTag.pending]: (state, action) => {
      state.loading = true;
    },
    [searchToursByTag.fulfilled]: (state, action) => {
      state.loading = false;
      state.tagTours = action.payload;
    },
    [searchToursByTag.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [getRelatedToursByTags.pending]: (state, action) => {
      state.loading = true;
    },
    [getRelatedToursByTags.fulfilled]: (state, action) => {
      state.loading = false;
      state.relatedTours = action.payload;
    },
    [getRelatedToursByTags.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [likeTour.pending]: (state, action) => {},
    [likeTour.fulfilled]: (state, action) => {
      state.loading = false;
      console.log(action);
      const { arg } = action.meta;
      if (arg && arg._id) {
        state.tours = state.tours.map((tour) => {
          return tour._id === arg._id ? action.payload : tour;
        });
      }
    },
    [likeTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { setCurrentPage } = tourSlice.actions;

export default tourSlice.reducer;
