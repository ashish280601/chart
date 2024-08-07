import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './App.css';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [dataPoints, setDataPoints] = useState([]);
  const chartRef = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    if (isNaN(value)) {
      alert("Please enter a valid number");
      return;
    }
    setInputValue(value);

    // Create new data point
    const newDataPoint = { x: dataPoints.length + 1, y: parseFloat(value) };

    // Update data with new point
    setDataPoints([...dataPoints, newDataPoint]);
  };

  const data = {
    labels: dataPoints.map((point) => point.x),
    datasets: [
      {
        label: 'Dynamic Data',
        data: dataPoints.map((point) => point.y),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        chartRef.current.resize();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="App">
      <section className='graph_sec'>
        <h1>Dynamic Graph Plotting Application</h1>
        <input 
          type="text" 
          value={inputValue} 
          onChange={handleChange} 
          placeholder="Enter a number" 
        />
        <div className='chart_box'>
          <Line ref={chartRef} data={data} />
        </div>
      </section>
    </div>
  );
};

export default App;

