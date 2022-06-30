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
import { useDispatch } from 'react-redux';
import { dataAccumulator, setGrathSegments, setStartDataValue } from './grathSlice';
import { useEffect } from 'react';
import './grath.css';
import {dateFromUTC } from '../../utils/utils'


ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title, // заголовок над графиком
	Tooltip, //всплывающий попап на точке
	Legend //плитки выбора графика
);

const Grath = ({
	minRange,
	maxEange,
	id,
	grathValue,
	label,
	startIntervalValue,
	grathName,
	updateTime,
	timeInterval,
	lastDataUpdate,
	baseColor
}) => {
	const dispatch = useDispatch();
	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	}

	function generateDarkColorRgb() {  //Генератор случайного тёмного цвета
		const red = Math.floor(Math.random() * 256/2);
		const green = Math.floor(Math.random() * 256/2);
		const blue = Math.floor(Math.random() * 256/2);
		return "rgb(" + red + ", " + green + ", " + blue + ")";
	 }

	useEffect(() => { //для первоначального сегментирования графика
		const segments = numOfSegments(startIntervalValue)
		const randomColor = generateDarkColorRgb()
		
		dispatch(setStartDataValue({
			id: id, 
			segments: segments, 
			baseColor: randomColor}))
		dispatch(setGrathSegments(startIntervalValue))
	}, [])

	useEffect(() => {
		const interval = setInterval(() => {

			dispatch(dataAccumulator({
				data: getRandomInt(minRange, maxEange), 
				id: id,
				lastDataUpdate: dateFromUTC(Date.now())
			}))

		}, updateTime);

		return () => clearInterval(interval);
	}, [dispatch, grathValue]);


	const numOfSegments = (amount) => {
		const arrOfSegments = [];
		for (let i = 0; i < amount; i++) arrOfSegments.push('');
		return arrOfSegments;
	}

	const labels = timeInterval //массив из интервалов [июнь, август, ...]

	

	const data = {
		labels,
		datasets: [ //линия графика
			{
				label: `последнее обновление данных в ${lastDataUpdate}`, //назваие рядом с кнопкой диаграммы
				data: grathValue,//массив со значениями по которым строится график
				borderColor: baseColor,// цвет линии диаграммы
				backgroundColor: baseColor,	//заливка квадрата рядом с кнопкой диаграммы
				pointBorderColor: '#111',//цвет границы кружка в линии диаграммы
				pointBackgroundColor: '#ff4000',//заливка кружка в линии диаграммы
				pointBorderWidth: 1, // толщина границы кружка в линии диаграммы
				animations: 'none', // тут можно задействовать анимацию выростания диграммы вверх. при ди намических данных выглядит коряво
				borderWidth: 2, //толщина линии диаграммы
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
					font: {
						size: 20,//размер текста рядом с кнопкой диграммы
					},
					boxWidth: 70,
					color: 'black',//цвет текста в легенде
				}
			},
			title: {
				display: true,//отображение названия графика
				text: grathName, //название графика
				font: {
					size: 30
				}
			},
			tooltip: {
				enabled: true, //убирает описание в попапе
				bodyColor: 'red', // цвет текста в попапе
				padding: 100,
				borderRadius: 100,
				borderColor: 'white',
				borderWidth: 10,
				callbacks: {
					labelTextColor: function (context) { //параметры текста в попапе
						return 'white' //перебивает цвет bodyColor
					},
					labelColor: function (constext) { //параметры квадрата в попапе
						return {
							borderColor: 'green',
							borderWidth: 10,
						}
					}
				}
			},

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
				datasetIdKey={id}
				//maintainAspectRatio={false} 
				//height={150}  
				//width={50}
				options={options}
				data={data} />
		</div>
	)
}

export default Grath