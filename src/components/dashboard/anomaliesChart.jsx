import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);


const AnomaliesCount = ({ currentDate }) => {
  const [anomaliesPercentage, setAnomaliesPercentage] = useState(0);
  console.log('1');
  useEffect(() => {
    console.log('2');
    const fetchInterfacesData = async () => {
      console.log('3');
      try {
        const response = await axios.get('http://localhost:8080/mimapi/instance-interfaces');
        // console.log('Fetched anomalies data:', response.data);
        const interfacesData = response.data;

        const interfacesToday = interfacesData.filter(
          (item) => new Date(item.dateDebutLancement).toDateString() === new Date(currentDate).toDateString()
        );

        if (interfacesToday.length > 0) {
          const failedInterfacesCount = interfacesToday.filter(
            (item) => item.etat === 'échoué'
          ).length;
          const totalInterfacesCount = interfacesToday.length;
          const percentage = (failedInterfacesCount / totalInterfacesCount) * 100;
          setAnomaliesPercentage(percentage);
        }
      } catch (error) {
        console.error('Error fetching interfaces data:', error);
      }
    };

    if (currentDate) {
      fetchInterfacesData();
    }
  }, [currentDate]);

  const data = {
    datasets: [
      {
        data: [anomaliesPercentage, 100 - anomaliesPercentage],
        backgroundColor: ['#E79B38', '#E2E2E2'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: '80%',
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
          <div className="w-4 h-4 bg-[#E79B38] rounded-full mr-2"></div>
          <span className="text-sm">Interfaces lancées échouées</span>
        </div>
      </div>
    </div>
  );
};

export default AnomaliesCount;
