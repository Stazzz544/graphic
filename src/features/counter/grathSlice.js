import { createSlice } from '@reduxjs/toolkit';


const initialState = {
	grathData: [3,5,3,2,6,7,4,2,7,8, 11, 22, 5,2,1,5,7,4,2,6]
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


