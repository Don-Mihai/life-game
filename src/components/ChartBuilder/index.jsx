import React, { useState } from 'react';
import LineChart from './LineChart';
import './ChartBuilder.scss';

const ChartBuilder = () => {
  const [xAxisData, setXAxisData] = useState(['Неделя 1', 'Неделя 2', 'Неделя 3', 'Неделя 4']);
  const [yAxisData, setYAxisData] = useState([20, 40, 60, 80]);

  const handleAddDataPoint = () => {
    setXAxisData([...xAxisData, `Неделя ${xAxisData.length + 1}`]);
    setYAxisData([...yAxisData, 0]);
  };

  const chartData = {
    labels: xAxisData,
    datasets: [
      {
        label: 'Progress (%)',
        data: yAxisData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const handleXChange = (e) => {
    setXAxisData(e.target.value.split(','));
  };

  const handleYChange = (e) => {
    setYAxisData(e.target.value.split(',').map(Number));
  };

  return (
    <div className="chart__builder">
      <h2>Построй свой график</h2>
      <div className="chart__builder__inputs">
        {/* <label>X-axis (comma-separated): </label> */}
        <input className="input__chart" type="text" value={xAxisData.join(',')} onChange={handleXChange} />
        {/* <label>Y-axis (comma-separated): </label> */}
        <input className="input__chart" type="text" value={yAxisData.join(',')} onChange={handleYChange} />
        <button className="button__add" onClick={handleAddDataPoint}>
          Добавить точку
        </button>
      </div>

      <LineChart chartData={chartData} />
    </div>
  );
};

export default ChartBuilder;
