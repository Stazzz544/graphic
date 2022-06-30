import { createSlice } from '@reduxjs/toolkit';


const initialState = {
	grathData: [
		{
			id: 1,
			label: 'grath 1',
			data: [],
			grathName: 'CO2',
			updateTime: 1000,
			timeInterval: [],
			lastDataUpdate: '',
			baseColor: '',
			segments: 0
		},
		{
			id: 2,
			label: 'grath 2',
			data: [],
			grathName: 'Сера',
			updateTime: 4000,
			timeInterval: [],
			lastDataUpdate: '',
			baseColor: '',
			segments: 0
		},
		{
			id: 3,
			label: 'grath 3',
			data: [],
			grathName: 'Температура °C',
			updateTime: 2000,
			timeInterval: [],
			lastDataUpdate: '',
			baseColor: '',
			segments: 0
		},
	],
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
					obj.timeInterval.shift()
				}
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
		},
		setGrathSegments: (state, action) => {
			state.grathData.forEach(obj => {
				if (obj.id === action.payload.id) {
					state.grathData.segments = action.payload
				}
			})
		}
	},
},
);

export const { dataAccumulator, setStartDataValue, setGrathSegments } = grathSlice.actions;


export default grathSlice.reducer;


