import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InterfaceForm from './interfacesForm';
import { FaArrowLeft } from 'react-icons/fa';

const Interfaces = () => {
  const [interfaces, setInterfaces] = useState([]);
  const [traitements, setTraitements] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedInterface, setSelectedInterface] = useState(null);
  const [highlightedRow, setHighlightedRow] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  useEffect(() => {
    fetchInterfaces();
    fetchTraitements();
  }, []);

  const fetchInterfaces = async () => {
    try {
      const response = await axios.get('http://localhost:8080/mimapi/interfaces', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setInterfaces(response.data);
    } catch (error) {
      console.error('Error fetching interfaces:', error);
    }
  };

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

  const handleAddInterface = () => {
    setSelectedInterface(null);
    setShowForm(true);
  };

  const handleEditInterface = () => {
    if (highlightedRow !== null) {
      setSelectedInterface(interfaces[highlightedRow]);
      setShowForm(true);
    } else {
      alert("Veuillez sélectionner une interface à modifier.");
    }
  };

  const handleDeleteConfirmation = () => {
    setShowConfirmationModal(true);
  };

  const handleDeleteInterface = async () => {
    setShowConfirmationModal(false);
    if (highlightedRow !== null) {
      const iface = interfaces[highlightedRow];
      try {
        await axios.delete(`http://localhost:8080/mimapi/interfaces/${iface.idInterface}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        fetchInterfaces();
        setHighlightedRow(null);
      } catch (error) {
        console.error('Error deleting interface:', error);
      }
    } else {
      alert("Veuillez sélectionner une interface à supprimer.");
    }
  };

  const handleRowClick = (index) => {
    setHighlightedRow(index);
  };

  const handleFormSubmit = () => {
    fetchInterfaces();
    setShowForm(false);
  };

  const handleBackToTable = () => {
    setShowForm(false);
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Interfaces</h1>
      {showForm ? (
        <div>
          <button onClick={handleBackToTable} className="flex px-4 py-2 mb-4 text-gray-400 rounded bg-white hover:text-gray-800">
            <FaArrowLeft className="mr-2" />
          </button>
          <InterfaceForm interfaceData={selectedInterface} onSubmit={handleFormSubmit} traitements={traitements} />
        </div>
      ) : (
        <div>
          <div className="overflow-y-auto" style={{ maxHeight: '400px' }}>
            <table className="min-w-full text-sm bg-white table-fixed rounded-lg mb-4">
              <thead>
                <tr>
                  <th className="py-2 text-center">Interface</th>
                  <th className="py-2 text-center">Ordre de Lancement</th>
                  <th className="py-2 text-center">Traitement</th>
                </tr>
              </thead>
              <tbody>
                {interfaces.map((iface, index) => (
                  <tr
                    key={index}
                    className={`border-t ${highlightedRow === index ? 'bg-blue-100' : ''}`}
                    onClick={() => handleRowClick(index)}
                  >
                    <td className="py-2 px-4 text-center">{iface.nomInterface}</td>
                    <td className="py-2 px-4 text-center">{iface.ordreLancement}</td>
                    <td className="py-2 px-4 text-center">{iface.traitement ? iface.traitement.nomTraitement : 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end space-x-6 mr-10">
            <button onClick={handleAddInterface} className="px-4 py-2 border-5 border-[#28a745] text-gray-600 rounded bg-[#28a745] text-white hover:bg-[#218838]">
              Ajouter
            </button>
            <button onClick={handleEditInterface} className="px-4 py-2 border-5 border-[#AED6F1] text-gray-600 rounded bg-[#AED6F1] text-white hover:bg-[#85C1E9]">
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
            <p className="text-lg font-semibold mb-4">Êtes-vous sûr de vouloir supprimer cette interface ?</p>
            <div className="flex justify-end space-x-4">
              <button onClick={handleDeleteInterface} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Oui</button>
              <button onClick={() => setShowConfirmationModal(false)} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Non</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Interfaces;
