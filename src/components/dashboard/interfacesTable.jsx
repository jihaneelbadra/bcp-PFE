<<<<<<< HEAD

import React, { useState } from 'react';
=======
import React, { useState, useEffect } from 'react';
>>>>>>> 1c662dde5f870066a76fe4ee80d0f8771fb71d8c
import { PlayIcon, XCircleIcon, CheckCircleIcon, XIcon } from 'lucide-react';

const InterfacesTable = ({ data, onTraitementClick, instanceInterfacesData, selectedTraitementName }) => {
  const [selectedTraitement, setSelectedTraitement] = useState(null);

  useEffect(() => {
    console.log('InterfacesTable data:', data);
  }, [data]);

  const renderEtatIcon = (etatLancement) => {
    switch (etatLancement) {
      case 'échoué':
        return <XCircleIcon className="text-red-500" />;
      case 'en cours':
        return <PlayIcon className="text-yellow-500" />;
      case 'réussi':
        return <CheckCircleIcon className="text-green-500" />;
      default:
        return null;
    }
  };

  const isButtonDisabled = (modeLancement, etatLancement) => {
    if (modeLancement === 'manuel' && etatLancement === 'échoué') {
      return false;
    } else if (modeLancement === 'auto' && etatLancement === 'échoué') {
      return false;
    } else if(etatLancement === 'réussi'){
      return true;
    }
  };

  const handleTraitementClick = (traitementId, traitementName) => {
    setSelectedTraitement(traitementId);
    onTraitementClick(traitementId, traitementName); // Pass the traitementId and traitementName to the parent component
  };

  const handleCloseClick = () => {
    setSelectedTraitement(null);
  };

  return (
    <div className="flex w-full">
      <div className={`transition-all duration-300 ${selectedTraitement ? 'w-2/3' : 'w-full'} bg-white p-1 rounded-lg shadow-md`}>
        <table className="min-w-full text-sm bg-white table-fixed rounded-lg">
          <thead>
            <tr>
              <th className="py-2 text-center">Traitement</th>
              <th className="py-2 text-center">Sens du Flux</th>
              <th className="py-2 text-center">Mode de Lancement</th>
              <th className="py-2 text-center">État</th>
              <th className="py-2 text-center">Date de Début</th>
              <th className="py-2 text-center">Date de Fin</th>
              <th className="py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className={`border-t ${selectedTraitement === row.instanceTraitementId ? 'bg-blue-100' : ''} cursor-pointer`}
                onClick={() => handleTraitementClick(row.instanceTraitementId, row.nomTraitement)}
              >
                <td className={`py-2 px-4 text-center ${selectedTraitement === row.instanceTraitementId ? 'font-bold' : ''} hover:font-bold`}>{row.nomTraitement}</td>
                <td className="py-2 px-4 text-center">{row.sensFlux}</td>
                <td className="py-2 px-4 text-center">{row.modeLancement}</td>
                <td className="py-2 px-4 text-center">{renderEtatIcon(row.etatLancement)}</td>
                <td className="py-2 px-4 text-center">{new Date(row.dateDebutLancement).toLocaleString()}</td>
                <td className="py-2 px-4 text-center">{row.dateFinLancement ? new Date(row.dateFinLancement).toLocaleString() : 'N/A'}</td>
                <td className="py-2 px-4 text-center">
                  <button
                    className={`px-4 py-2 border-2 border-[#FAD7A0] text-gray-600 rounded ${isButtonDisabled(row.modeLancement, row.etatLancement) ? 'opacity-50 bg-[#FAD7A0] cursor-not-allowed' : 'bg-[#FAD7A0] hover:bg-[#E2B68D]'}`}
                    disabled={isButtonDisabled(row.modeLancement, row.etatLancement)}
                  >
                    Lancer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedTraitement && (
        <div className="w-1/3 border-l border-gray-300 p-3 relative bg-white rounded-lg shadow-lg">
          <h3 className="text-sm font-semibold p-3 mb-4">{selectedTraitementName}</h3>
          <button
            className="absolute top-2 right-2 p-1 bg-gray-200 rounded-full hover:bg-gray-300"
            onClick={handleCloseClick}
          >
            <XIcon className="w-4 h-4 text-gray-600" />
          </button>

          <table className="min-w-full text-sm bg-white table-fixed rounded-lg">
            <thead>
              <tr>
                <th className="py-2 text-center">Interface</th>
                <th className="py-2 text-center">Ordre</th>
                <th className="py-2 text-center">État</th>
                <th className="py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {instanceInterfacesData.map((detail, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2 px-4 text-center">{detail.interfaceName}</td>
                  <td                  className="py-2 px-4 text-center">{detail.ordre}</td>
                  <td className="py-2 px-4 text-center">{renderEtatIcon(detail.etat)}</td>
                  <td className="py-2 px-4 text-center">
                    <button
                      className={`px-4 py-2 border-2 border-[#FAD7A0] text-gray-600 rounded ${isButtonDisabled('auto', detail.etat) ? 'opacity-50 bg-[#FAD7A0] cursor-not-allowed' : 'bg-[#FAD7A0] hover:bg-[#E2B68D]'}`}
                      disabled={isButtonDisabled('auto', detail.etat)}
                    >
                      Lancer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InterfacesTable;

