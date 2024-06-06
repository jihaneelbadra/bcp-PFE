import React, { useState } from 'react';
import axios from 'axios';

const TraitementForm = ({ onSubmit, traitement }) => {
  const [nomTraitement, setNomTraitement] = useState(traitement ? traitement.nomTraitement : '');
  const [sensFlux, setSensFlux] = useState(traitement ? traitement.sensFlux : '');
  const [modeLancement, setModeLancement] = useState(traitement ? traitement.modeLancement : '');
  const [interfaceNames, setInterfaceNames] = useState(traitement ? traitement.interfaceNames : []);
  const [interfaceIds, setInterfaceIds] = useState(traitement ? traitement.interfaceIds : []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTraitement = { nomTraitement, sensFlux, modeLancement, interfaceNames, interfaceIds };
    try {
      await axios.post('http://localhost:8080/mimapi/traitements', newTraitement, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      onSubmit();
    } catch (error) {
      console.error('Error adding traitement:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="">
        <label className="block text-gray-700 text-sm font-bold mb-2">Nom du Traitement</label>
        <input
          type="text"
          value={nomTraitement}
          onChange={(e) => setNomTraitement(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Sens du Flux</label>
        <input
          type="text"
          value={sensFlux}
          onChange={(e) => setSensFlux(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Mode de Lancement</label>
        <input
          type="text"
          value={modeLancement}
          onChange={(e) => setModeLancement(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Interfaces</label>
        <input
          type="text"
          value={interfaceNames.join(',')}
          onChange={(e) => setInterfaceNames(e.target.value.split(','))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      {/* <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Interface IDs:</label>
        <input
          type="text"
          value={interfaceIds.join(',')}
          onChange={(e) => setInterfaceIds(e.target.value.split(',').map(Number))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div> */}
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Valider
        </button>
      </div>
    </form>
  );
};

export default TraitementForm;
