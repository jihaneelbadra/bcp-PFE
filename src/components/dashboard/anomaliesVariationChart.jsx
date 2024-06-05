import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import "chart.js/auto";

const AnomaliesVariationChart = () => {
  const [anomaliesData, setAnomaliesData] = useState([]);

  useEffect(() => {
    const fetchAnomaliesData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/mimapi/instance-interfaces');
        setAnomaliesData(response.data);
      } catch (error) {
        console.error('Error fetching anomalies data:', error);
      }
    };

    fetchAnomaliesData();
  }, []);

  const calculateAnomaliesPercentageByDay = (data) => {
    const daysOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const anomaliesByDay = {};

    data.forEach((item) => {
      const day = new Date(item.dateDebutLancement).getDay();
      if (!anomaliesByDay[day]) {
        anomaliesByDay[day] = { total: 0, anomalies: 0 };
      }
      anomaliesByDay[day].total += 1;
      if (item.etat === 'échoué') {
        anomaliesByDay[day].anomalies += 1;
      }
    });

    const percentages = daysOfWeek.map((day, index) => {
      const dayData = anomaliesByDay[index];
      if (dayData) {
        return (dayData.anomalies / dayData.total) * 100;
      }
      return 0;
    });

    return {
      labels: daysOfWeek,
      data: percentages,
    };
  };

  const { labels, data } = calculateAnomaliesPercentageByDay(anomaliesData);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Pourcentage des anomalies',
        data,
        fill: false,
        backgroundColor: '#EBB8C6',
        borderColor: '#CA6B6E',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
   
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Pourcentage d\'anomalies',
        },
      },
      x: {
        title: {
          display: true,
          text: '',
        },
      },
    },
  };

  return (
    <div className="w-full lg:h-100 p-3 bg-white rounded-lg shadow-md">
      <h2 className='text-M font-bold mb-4 text-left'>Variation des anomalies par jour</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default AnomaliesVariationChart;
