import { configureStore } from '@reduxjs/toolkit';

import loadingReducer from './slices/loading.slice';
import variablesReducer from './slices/variables.slice';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    variables: variablesReducer,
  },
});
