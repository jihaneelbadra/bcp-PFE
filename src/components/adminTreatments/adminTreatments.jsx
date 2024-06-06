import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import TraitementForm from './treatmentsForm';

const Treatments = () => {
  const [traitements, setTraitements] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedTraitement, setSelectedTraitement] = useState(null);
  const [highlightedRow, setHighlightedRow] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  useEffect(() => {
    fetchTraitements();
  }, []);

  const fetchTraitements = async () => {
    try {
      const response = await axios.get('http://localhost:8080/mimapi/traitements', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setTraitements(response.data);
    } catch (error) {
      console.error('Error fetching traitements:', error);
    }
  };

  const handleAddTraitement = () => {
    setSelectedTraitement(null);
    setShowForm(true);
  };

  const handleEditTraitement = () => {
    if (highlightedRow !== null) {
      setSelectedTraitement(traitements[highlightedRow]);
      setShowForm(true);
    } else {
      alert("Veuillez sélectionner un traitement à modifier.");
    }
  };

  const handleDeleteConfirmation = () => {
    setShowConfirmationModal(true);
  };

  const handleDeleteTraitement = async () => {
    setShowConfirmationModal(false); // Hide the confirmation modal
    if (highlightedRow !== null) {
      const traitement = traitements[highlightedRow];
      try {
        await axios.delete(`http://localhost:8080/mimapi/traitements/${traitement.idTraitement}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        fetchTraitements(); // Refresh the traitements after deletion
        setHighlightedRow(null);
      } catch (error) {
        console.error('Error deleting traitement:', error);
      }
    } else {
      alert("Veuillez sélectionner un traitement à supprimer.");
    }
  };

  const handleRowClick = (index) => {
    setHighlightedRow(index);
  };

  const handleFormSubmit = () => {
    fetchTraitements(); // Refresh the traitements after add/update
    setShowForm(false);
  };

  const handleBackToTable = () => {
    setShowForm(false);
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Traitements</h1>
      {showForm ? (
        <div>
          <button onClick={handleBackToTable} className="flex px-4 py-2 mb-4 text-gray-400 rounded bg-white hover:text-gray-800">
            <FaArrowLeft className="mr-2" />
          </button>
          <TraitementForm traitement={selectedTraitement} onSubmit={handleFormSubmit} />
        </div>
      ) : (
        <div>
          <div className="overflow-y-auto" style={{ maxHeight: '400px' }}>
            <table className="min-w-full text-sm bg-white table-fixed rounded-lg mb-4">
              <thead>
                <tr>
                  <th className="py-2 text-center">Traitement</th>
                  <th className="py-2 text-center">Interfaces</th>
                  <th className="py-2 text-center">Sens du Flux</th>
                  <th className="py-2 text-center">Mode de Lancement</th>
                </tr>
              </thead>
              <tbody>
                {traitements.map((traitement, index) => (
                  <tr
                    key={index}
                    className={`border-t ${highlightedRow === index ? 'bg-blue-100' : ''}`}
                    onClick={() => handleRowClick(index)}
                  >
                    <td className="py-2 px-4 text-center">{traitement.nomTraitement}</td>
                    <td className="py-2 px-4 text-center">
                      {traitement.interfaceNames.map((interfaceName, i) => (
                        <div className='my-2' key={i}>{interfaceName}</div>
                      ))}
                    </td>
                    <td className="py-2 px-4 text-center">{traitement.sensFlux}</td>
                    <td className="py-2 px-4 text-center">{traitement.modeLancement}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end space-x-6 mr-10">
            <button onClick={handleAddTraitement} className="px-4 py-2 border-5 border-[#28a745] text-gray-600 rounded bg-[#28a745] text-white hover:bg-[#218838]">
              Ajouter
            </button>
            <button onClick={handleEditTraitement} className="px-4 py-2 border-5 border-[#AED6F1] text-gray-600 rounded bg-[#AED6F1] text-white hover:bg-[#85C1E9]">
              Modifier
            </button>
            <button onClick={handleDeleteConfirmation} className="px-4 py-2 border-5 border-[#dc3545] text-gray-600 rounded bg-[#dc3545] text-white hover:bg-[#c82333]">
              Supprimer
            </button>
          </div>
        </div>
      )}
      {showConfirmationModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg">
            <p className="text-lg font-semibold mb-4">Êtes-vous sûr de vouloir supprimer ce traitement ?</p>
            <div className="flex justify-end space-x-4">
              <button onClick={handleDeleteTraitement} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Oui</button>
              <button onClick={() => setShowConfirmationModal(false)} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Non</button>
            </div>
          </div>
        </div>
      )}
    </div>
);
};

export default Treatments;