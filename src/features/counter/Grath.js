import React, { useState } from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useSelector, useDispatch } from 'react-redux';
import { dataAccumulator } from './grathSlice';
import { useEffect } from 'react';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title, // заголовок над графиком
	Tooltip, //всплывающий попап на точке
	Legend //плитки выбора графика
);

const Grath = () => {
	const grathData = useSelector(state => state.grath.grathData);
	const dispatch = useDispatch();
	const [segments, setSegments] = useState([]);
	

	console.log('grathData', grathData)

	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	}

	useEffect(() => {
		const interval = setInterval(() => {
			dispatch(dataAccumulator(getRandomInt(0.2, 10)))
			numOfSegments(grathData.length)
		}, 100);

		return () => clearInterval(interval);
	}, [dispatch, grathData]);


	const numOfSegments = (amount) => {
		const arr = [];
		for(let i = 0; i < amount; i++) arr.push('');
		setSegments(arr);
	}

	const labels = segments

	const data = {
		labels,
		datasets: [ //линия графика
			{
				label: 'Мой график1',
				data: grathData,
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(255, 99, 132, 0.5)',	
				pointBorderColor: '#111',
				pointBackgroundColor: '#ff4000',
				pointBorderWidth: 1,
				animations: 'none',
				borderWidth: 1,
				ChartData:{
					height: 300,
				}
			},
		],
	};

	const options = {
		maintainAspectRatio: false, // фикси
		responsive: true,
		plugins: {
			legend: {
				position: 'top'
			},
			title: {
				display: true,
				text: 'Chart.js Line Chart',
			},
		},
		layout: {
			height: 100,
			responsive: true,	
		},
	};


	return (
		<div>
			<Line maintainAspectRatio={false} height={150}  options={options} data={data} />
		</div>
	)
}

export default Grath