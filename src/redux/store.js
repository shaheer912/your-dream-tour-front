import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './features/authSlice';
import TourReducer from './features/tourSlice';
import MiscReducer from './features/miscSlice';

export default configureStore({
  reducer: { auth: AuthReducer, tour: TourReducer, misc: MiscReducer },
});
