import React from 'react';
import './App.css';
import Grath from './features/counter/Grath';
import { useSelector } from 'react-redux';
import TestGrath from './features/TestGrath';


function App() {

 const grathData = useSelector(state => state.grath.grathData);
console.log('grathDataHOK', grathData)



//==========grathicks config===============
const segments = 20  //задаём изначальное количество сегментов графика(делим шкалу времени)

  return (
    <div className="App">
		{grathData.map(grath => {
			return <Grath 
			baseColor={grath.baseColor}
			lastDataUpdate={grath.lastDataUpdate}
			timeInterval={grath.timeInterval}
			updateTime={grath.updateTime}
			startIntervalValue={segments}
			label={grath.label}
			key={grath.id}
			grathName={grath.grathName}
			minRange={0} //диапазон для моковых значений графика
			maxEange={100} //диапазон для моковых значений графика
			id={grath.id} //id графика
			grathValue={grath.data}/> //массив значений одного графика
		})}
    </div>
  );
}

export default App;
