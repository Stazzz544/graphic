import { createSlice } from '@reduxjs/toolkit';


const initialState = {
	grathData: []
};

export const grathSlice = createSlice({
	name: 'grath',
	initialState,
	reducers: {
		dataAccumulator: (state, action) => {
			if(state.grathData.length < 20) {
				state.grathData.push(action.payload)
			} else {
				state.grathData.shift()
				state.grathData.push(action.payload)
			}
		},
	},
});

export const { dataAccumulator } = grathSlice.actions;


export default grathSlice.reducer;


