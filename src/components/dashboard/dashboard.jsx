import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InterfacesTable from './interfacesTable';
import AnomaliesCount from './anomaliesChart';
import AverageExecutionTimeChart from './executionTimeChart';
import AnomaliesVariationChart from './anomaliesVariationChart'; // Import the new component

const Dashboard = ({ currentDate }) => {
  const [interfacesData, setInterfacesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTraitementId, setSelectedTraitementId] = useState(null);
  const [selectedTraitementName, setSelectedTraitementName] = useState('');
  const [instanceInterfacesData, setInstanceInterfacesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/mimapi/get-lancers', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        console.log('Fetched data:', response.data);
        const sortedData = response.data.lancers.sort((a, b) => new Date(b.dateDebutLancement) - new Date(a.dateDebutLancement));
        const recentData = sortedData.slice(0, 3);
        setInterfacesData(recentData);
        setLoading(false);
      } catch (error) {
        console.error('There was an error fetching the data!', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedTraitementId !== null) {
      const fetchInstanceInterfaces = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/mimapi/instance-interfaces/${selectedTraitementId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
          console.log('Fetched instance interfaces data:', response.data);
          setInstanceInterfacesData(response.data);
        } catch (error) {
          console.error('There was an error fetching the instance interfaces data!', error);
          setError(error);
        }
      };

      fetchInstanceInterfaces();
    }
  }, [selectedTraitementId]);

  const handleTraitementClick = (traitementId, traitementName) => {
    setSelectedTraitementId(traitementId);
    setSelectedTraitementName(traitementName);
  };

  const filteredInterfacesData = interfacesData.filter(
    (item) => new Date(item.dateDebutLancement).toDateString() === new Date(currentDate).toDateString()
  );

  const anomaliesPercentage = (filteredInterfacesData.filter(item => item.etatLancement === 'échoué').length / filteredInterfacesData.length) * 100;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>There was an error fetching the data!</div>;
  if (!Array.isArray(interfacesData)) {
    console.error('Data is not an array:', interfacesData);
    return <div>Error: Data is not an array</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tableau de bord</h1>
      <InterfacesTable 
        data={filteredInterfacesData} 
        onTraitementClick={handleTraitementClick} 
        instanceInterfacesData={instanceInterfacesData} 
        selectedTraitementName={selectedTraitementName} 
      />
      <div className="flex flex-row">
        <div className="mt-4 mr-6">
          <AnomaliesCount currentDate={currentDate} />
        </div>
        <div className="mt-4 w-1/2 mr-6">
          <AnomaliesVariationChart />
        </div>
        <div className="mt-4 w-1/2 ">
          <AverageExecutionTimeChart data={instanceInterfacesData} />
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
