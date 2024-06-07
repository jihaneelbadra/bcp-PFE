import React, { useState } from 'react';
import axios from 'axios';

const InterfaceForm = ({ onSubmit, interfaceData, traitements }) => {
  const [nomInterface, setNomInterface] = useState(interfaceData ? interfaceData.nomInterface : '');
  const [ordreLancement, setOrdreLancement] = useState(interfaceData ? interfaceData.ordreLancement : '');
  const [traitementId, setTraitementId] = useState(interfaceData ? interfaceData.traitement.idTraitement : '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!traitementId || isNaN(parseInt(traitementId))) {
      alert('Veuillez sélectionner un traitement valide.');
      return;
    }

    const newInterface = { nomInterface, ordreLancement, traitementId: parseInt(traitementId) };
    try {
      if (interfaceData) {
        await axios.put(`http://localhost:8080/mimapi/interfaces/${interfaceData.idInterface}`, newInterface, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      } else {
        await axios.post('http://localhost:8080/mimapi/interfaces', newInterface, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      }
      onSubmit();
    } catch (error) {
      console.error('Error saving interface:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Nom de l'Interface</label>
        <input
          type="text"
          value={nomInterface}
          onChange={(e) => setNomInterface(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Ordre de Lancement</label>
        <input
          type="number"
          value={ordreLancement}
          onChange={(e) => setOrdreLancement(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Traitement</label>
        <select
          value={traitementId}
          onChange={(e) => setTraitementId(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Choisir un traitement</option>
          {traitements.map((traitement) => (
            <option key={traitement.idTraitement} value={traitement.idTraitement}>
              {traitement.nomTraitement}
            </option>
          ))}
        </select>
      </div>
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

export default InterfaceForm;
