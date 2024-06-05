import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const AnomaliesCount = ({ anomaliesPercentage }) => {
  const data = {
    datasets: [
      {
        data: [anomaliesPercentage, 100 - anomaliesPercentage],
        backgroundColor: ['#478F96', '#E2E2E2'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: '80%', // Adjusts the thickness of the doughnut chart
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.raw}% anomalies`;
          },
        },
      },
    },
  };

  return (
<div className="w-60 h-50 shadow-lg p-3 relative bg-white rounded-lg shadow-md">
  <h2 className="text-M font-bold mb-4 text-left">Pourcentage d'anomalies</h2>
  <div className="relative">
    <Doughnut data={data} options={options} />
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="text-xl font-bold">{anomaliesPercentage.toFixed(2)}%</span>
    </div>
  </div>
  <div className="flex justify-left mt-2">
    <div className="flex items-center">
      <div className="w-4 h-4 bg-[#478F96] rounded-full mr-2"></div>
      <span className="text-sm">Interfaces lancées échouées</span>
    </div>
  </div>
</div>
  );
};

export default AnomaliesCount;