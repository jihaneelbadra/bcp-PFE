import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import TraitementForm from './treatmentsForm'; // Importez votre composant TraitementForm ici

const Treatments = () => {
  const [traitements, setTraitements] = useState([]);
  const [showForm, setShowForm] = useState(false); // State pour afficher/masquer le formulaire
  const [selectedTraitement, setSelectedTraitement] = useState(null); // State pour stocker le traitement sélectionné pour modification
  const [highlightedRow, setHighlightedRow] = useState(null); // State pour stocker la ligne sélectionnée

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

  const handleAddTraitement = () => {
    setSelectedTraitement(null); // Réinitialiser le traitement sélectionné
    setShowForm(true); // Afficher le formulaire
  };

  const handleEditTraitement = () => {
    if (highlightedRow !== null) {
      setSelectedTraitement(traitements[highlightedRow]); // Sélectionner le traitement à modifier
      setShowForm(true); // Afficher le formulaire
    } else {
      alert("Veuillez sélectionner un traitement à modifier.");
    }
  };

  const handleRowClick = (index) => {
    setHighlightedRow(index); // Mettre en surbrillance la ligne sélectionnée
  };

  const handleFormSubmit = () => {
    // Rafraîchir les traitements après l'ajout/modification
    setShowForm(false); // Masquer le formulaire après la soumission
  };

  const handleBackToTable = () => {
    setShowForm(false); // Masquer le formulaire
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg ">
      <h1 className="text-2xl font-bold mb-4">Traitements</h1>
      {showForm ? (
        <div>
        <button onClick={handleBackToTable} className="flex px-4 py-2 mb-4  text-gray-400 rounded bg-white hover:text-gray-800">
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Treatments;
