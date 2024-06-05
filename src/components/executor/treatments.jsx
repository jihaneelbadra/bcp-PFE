import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Treatments = () => {
  const [traitements, setTraitements] = useState([]);

  useEffect(() => {
    const fetchTraitements = async () => {
      try {
        const response = await axios.get('http://localhost:8080/mimapi/traitements');
        setTraitements(response.data);
      } catch (error) {
        console.error('Error fetching traitements:', error);
      }
    };

    fetchTraitements();
  }, []);

  const handleLaunch = async (traitement) => {
    console.log("Traitement à lancer :", traitement); 
    
    const { idTraitement, nomTraitement, sensFlux, modeLancement, interfaceIds } = traitement;
    const interfaceIdsString = interfaceIds.join(',');

    const dateDebutLancement = new Date().toISOString();
    const dateFinLancement = new Date(new Date().getTime() + 60000).toISOString(); // Add 1 minute for example
  
    try {
      const response = await axios.post('http://localhost:8080/mimapi/launch', null, {
        params: {
          idTraitement,
          nomTraitement,
          sensFlux,
          modeLancement,
          interfaceIds: interfaceIdsString,
          dateDebutLancement,
          dateFinLancement
        }
      });
      console.log('Treatment launched successfully:', response.data);
      alert('Treatment launched successfully');
    } catch (error) {
      console.error('Failed to launch treatment:', error);
      alert('Failed to launch treatment: ' + error.message);
    }
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md">
      <table className="min-w-full text-sm bg-white table-fixed rounded-lg">
        <thead>
          <tr>
            <th className="py-2 text-center">Traitement</th>
            <th className="py-2 text-center">Interfaces</th>
            <th className="py-2 text-center">Sens du Flux</th>
            <th className="py-2 text-center">Mode de Lancement</th>
            <th className="py-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {traitements.map((traitement, index) => (
            <tr key={index} className="border-t">
              <td className="py-2 px-4 text-center">{traitement.nomTraitement}</td>
              <td className="py-2 px-4 text-center">
                {traitement.interfaceNames.map((interfaceName, i) => (
                  <div className='my-2' key={i}>{interfaceName}</div>
                ))}
              </td>
              <td className="py-2 px-4 text-center">{traitement.sensFlux}</td>
              <td className="py-2 px-4 text-center">{traitement.modeLancement}</td>
              <td className="py-2 px-4 text-center">
                <button
                  onClick={() => handleLaunch(traitement)}
                  className="px-4 py-2 border-2 border-[#FAD7A0] text-gray-600 rounded bg-[#FAD7A0] hover:bg-[#E2B68D]"
                >
                  Lancer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Treatments;
