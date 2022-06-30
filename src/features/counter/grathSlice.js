import { createSlice } from '@reduxjs/toolkit';


const initialState = {
	grathData: [
		{ id: 1, label: 'grath 1', data: [], grathName: 'CO2', updateTime: 1000, timeInterval: [], lastDataUpdate: '', baseColor: ''},
		{ id: 2, label: 'grath 2', data: [], grathName: 'Сера', updateTime: 4000, timeInterval: [], lastDataUpdate: '', baseColor: '' },
		{ id: 3, label: 'grath 3', data: [], grathName: 'Температура °C', updateTime: 2000, timeInterval: [], lastDataUpdate: '', baseColor: '' },
	]
};

export const grathSlice = createSlice({
	name: 'grath',
	initialState,
	reducers: {
		dataAccumulator: (state, action) => {
			state.grathData.forEach(obj => {
				if (obj.id === action.payload.id) {
					state.grathData = [...state.grathData]
					obj.data.push(action.payload.data)
					obj.lastDataUpdate = action.payload.lastDataUpdate
					obj.timeInterval[obj.data.length - 1] = action.payload.lastDataUpdate
				}
				if (obj.id === action.payload.id && obj.data.length > 20) {
					obj.data.shift()
				}
				//if (obj.timeInterval.slice(-1) !== '') obj.timeInterval.shift()
			})
		},
		setStartDataValue: (state, action) => {
			state.grathData.forEach(obj => {
				if (obj.id === action.payload.id) {
					state.grathData = [...state.grathData]
					obj.timeInterval = action.payload.segments
					obj.baseColor = action.payload.baseColor
				}
			})
		}
	},
},
);

export const { dataAccumulator, setStartDataValue } = grathSlice.actions;


export default grathSlice.reducer;


