import React, { useEffect } from 'react';
import "chart.js/auto";
import { Bar } from 'react-chartjs-2';

const AverageExecutionTimeChart = ({ data }) => {

  const averageExecutionTimes = data.map((item) => {
    const startTime = new Date(item.dateDebut).getTime();
    const endTime = new Date(item.dateFin).getTime();
  
    return {
      traitement: item.traitement,
      averageExecutionTime: (endTime - startTime) / (1000 * 60), // Durée en minutes
    };
  });
  // Extracting traitement names and average execution times for chart labels and data
  const traitementNames = averageExecutionTimes.map((item) => item.traitement);
  const executionTimes = averageExecutionTimes.map((item) => item.averageExecutionTime);

  // Creating chart data
  const chartData = {
    labels: traitementNames,
    datasets: [
      {
        data: executionTimes,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        label: 'Temps moyen d\'exécution',

      },
      
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Temps moyen d'exécution (en minutes)",
        },
      },
      x: {
        title: {
          display: true,
          text: 'Traitements',
        },
      },
    },
  };
  return (
<div className="h-80 p-3 bg-white rounded-lg shadow-md">      
      <h2 className='text-M font-bold mb-4 text-left'>Temps moyen d'exécution des traitements</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default AverageExecutionTimeChart; 