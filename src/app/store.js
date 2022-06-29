import { configureStore } from '@reduxjs/toolkit';
import grathReducer from '../features/counter/grathSlice';

export const store = configureStore({
	reducer: {
		grath: grathReducer,
	},
});
