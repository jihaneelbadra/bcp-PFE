import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import "chart.js/auto";

const AverageExecutionTimeChart = () => {
  const [executionData, setExecutionData] = useState([]);

  useEffect(() => {
    const fetchExecutionData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/mimapi/get-lancers', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        console.log('Fetched execution data:', response.data);
        setExecutionData(response.data.lancers);
      } catch (error) {
        console.error('Error fetching execution data:', error);
      }
    };

    fetchExecutionData();
  }, []);

  const calculateAverageExecutionTimes = (data) => {
    const executionTimes = {};

    data.forEach((item) => {
      if (item.dateFinLancement) {
        const startTime = new Date(item.dateDebutLancement).getTime();
        const endTime = new Date(item.dateFinLancement).getTime();
        const executionTime = (endTime - startTime) / (1000 * 60); // Durée en minutes

        if (executionTimes[item.nomTraitement]) {
          executionTimes[item.nomTraitement].totalTime += executionTime;
          executionTimes[item.nomTraitement].count += 1;
        } else {
          executionTimes[item.nomTraitement] = { totalTime: executionTime, count: 1 };
        }
      }
    });

    const averageExecutionTimes = [];
    for (const [key, value] of Object.entries(executionTimes)) {
      averageExecutionTimes.push({
        nomTraitement: key,
        averageTime: value.totalTime / value.count,
      });
    }

    return averageExecutionTimes;
  };

  const averageExecutionTimes = calculateAverageExecutionTimes(executionData);

  // Creating chart data
  const chartData = {
    labels: averageExecutionTimes.map((item) => item.nomTraitement),
    datasets: [
      {
        data: averageExecutionTimes.map((item) => item.averageTime),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        label: "Temps moyen d'exécution",
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
          text: '',
        },
        ticks: {
          maxRotation: 0,
          minRotation: 0,
          align:'center',
          font: {
            size: 10, // Taille de la police pour les étiquettes de l'axe x
          },
          callback: function (value) {
            const maxLength = 30;
            const label = this.getLabelForValue(value);
            if (label.length > maxLength) {
              return label.match(/.{1,20}/g); // Découper l'étiquette en morceaux de 15 caractères
            } else {
              return label;
            }
          },
        }
      },
    },
    
    
  };

  return (
    <div className="w-full lg:h-100 p-3 bg-white rounded-lg shadow-md">
      <h2 className='text-M font-bold mb-4 text-left'>Temps moyen d'exécution des traitements</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default AverageExecutionTimeChart;
