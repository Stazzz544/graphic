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
	defaults
} from 'chart.js';
import { Line, Chart } from 'react-chartjs-2';
import { useSelector, useDispatch } from 'react-redux';
import { dataAccumulator } from './grathSlice';
import { useEffect } from 'react';

ChartJS.defaults.plugins.tooltip = false

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
			dispatch(dataAccumulator(getRandomInt(-6, 2)))
			numOfSegments(grathData.length)
		}, 1000);

		return () => clearInterval(interval);
	}, [dispatch, grathData]);


	const numOfSegments = (amount) => {
		const arr = [];
		for(let i = 0; i < amount; i++) arr.push('');
		setSegments(arr);
	}

	const labels = segments //массив из интервалов [июнь, август, ...]


	const data = {
		labels,
		datasets: [ //линия графика
			{
				label: 'Мой график1', //назваие рядом с кнопкой диаграммы
				data: grathData,//массив со значениями по которым строится график
				borderColor: 'rgb(255, 99, 132)',// цвет линии диаграммы
				backgroundColor: 'rgba(255, 99, 132, 0.5)',	//заливка квадрата рядом с кнопкой диаграммы
				pointBorderColor: '#111',//цвет границы кружка в линии диаграммы
				pointBackgroundColor: '#ff4000',//заливка кружка в линии диаграммы
				pointBorderWidth: 1, // толщина границы кружка в линии диаграммы
				animations: 'none', // тут можно задействовать анимацию выростания диграммы вверх. при ди намических данных выглядит коряво
				borderWidth: 1, //толщина линии диаграммы
			},
		],
	};

	//https://www.chartjs.org/docs/latest/configuration/tooltip.html вкладка конфигурации

	const options = {
		maintainAspectRatio: false, // true - адаптивные ширина и высота, false - ручная настройка width и height
		responsive: true,
		plugins: {
			legend: {
				position: 'top',// расположение легенды
				labels: {
					font:{
						size:12,//размер текста рядом с кнопкой диграммы
						color: 'blue'
					}
				}
			},
			title: {
				display: true,//отображение названия графика
				text: 'Chart.js Line Chart', //название графика
			},
			tooltip: {
				enabled: true, //убирает описание в попапе
				bodyColor: 'red' // цвет текста в попапе
			}
		},
		layout: {
			responsive: false,
			padding: {
				left: 50 //отступ диаграммы от какого-либо края
		  }
		},
		
		
}


	return (
		<div>
			<Line maintainAspectRatio={false} height={150}  options={options} data={data} />
		</div>
	)
}

export default Grath