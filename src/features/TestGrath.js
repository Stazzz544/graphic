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


ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title, // заголовок над графиком
	Tooltip, //всплывающий попап на точке
	Legend //плитки выбора графика
);

const TestGrath = () => {



	const labels = [1, 4, 6, 8] //массив из интервалов [июнь, август, ...]

	const randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);

	const data = {
		labels,
		datasets: [ //линия графика
			{
				label: 'testGrath', //назваие рядом с кнопкой диаграммы
				data: [3,3,4,5,6,2,],//массив со значениями по которым строится график
				borderColor: 'blue',// цвет линии диаграммы
				backgroundColor: 'rgba(255, 99, 132, 0.5)',	//заливка квадрата рядом с кнопкой диаграммы
				pointBorderColor: '#111',//цвет границы кружка в линии диаграммы
				pointBackgroundColor: '#ff4000',//заливка кружка в линии диаграммы
				pointBorderWidth: 1, // толщина границы кружка в линии диаграммы
				animations: 'none', // тут можно задействовать анимацию выростания диграммы вверх. при ди намических данных выглядит коряво
				borderWidth: 3, //толщина линии диаграммы
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
		<div className='grath'>
			<Line 
			options={options} 
			data={data} />
		</div>
	)
}

export default TestGrath