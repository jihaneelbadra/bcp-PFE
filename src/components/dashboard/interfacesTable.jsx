
import React, { useState } from 'react';
import { PlayIcon, XCircleIcon, CheckCircleIcon, XIcon } from 'lucide-react';

const InterfacesTable = ({ data }) => {
  const [selectedTraitement, setSelectedTraitement] = useState(null);

  const renderEtatIcon = (etat) => {
    switch (etat) {
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

  const isButtonDisabled = (modeDeLancement, etat) => {
    if (modeDeLancement === 'manuel') {
      return false;
    } else if (modeDeLancement === 'automatique' && etat === 'échoué') {
      return false;
    } else {
      return true;
    }
  };

  const handleTraitementClick = (traitement) => {
    setSelectedTraitement(traitement);
  };

  const handleCloseClick = () => {
    setSelectedTraitement(null);
  };

  return (
    <div className="flex w-full">
      <div className={`transition-all duration-300 ${selectedTraitement ? 'w-2/3' : 'w-full'} bg-white p-1 rounded-lg shadow-md`}>
        <table className="min-w-full bg-white table-fixed rounded-lg">
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
                className={`border-t ${selectedTraitement === row.traitement ? 'bg-blue-100' : ''} cursor-pointer`}
                onClick={() => handleTraitementClick(row.traitement)}
              >
                <td className={`py-2 px-4 text-center ${selectedTraitement === row.traitement ? 'font-bold' : ''} hover:font-bold`}>{row.traitement}</td>
                <td className="py-2 px-4 text-center">{row.sensDuFlux}</td>
                <td className="py-2 px-4 text-center">{row.modeDeLancement}</td>
                <td className="py-2 px-4 text-center">{renderEtatIcon(row.etat)}</td>
                <td className="py-2 px-4 text-center">{row.dateDebut}</td> 
                <td className="py-2 px-4 text-center">{row.dateFin}</td>
                <td className="py-2 px-4 text-center">
                  <button
                    className={`px-4 py-2 border-2 border-[#FAD7A0] text-gray-600 rounded ${isButtonDisabled(row.modeDeLancement, row.etat) ? 'opacity-50 bg-[#FAD7A0] cursor-not-allowed' : 'bg-[#FAD7A0] hover:bg-[#E2B68D]'}`}
                    disabled={isButtonDisabled(row.modeDeLancement, row.etat)}
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
          <h3 className="text-lg font-semibold mb-4">{selectedTraitement}</h3>
          <button
            className="absolute top-2 right-2 p-1 bg-gray-200 rounded-full hover:bg-gray-300"
            onClick={handleCloseClick}
          >
            <XIcon className="w-4 h-4 text-gray-600" />
          </button>

          <table className="min-w-full bg-white table-fixed rounded-lg">
            <thead>
              <tr>
                <th className="py-2 text-center">Interface</th>
                <th className="py-2 text-center">Ordre</th>
                <th className="py-2 text-center">État</th>
                <th className="py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                { interface: 'Interface A', ordre: 1, etat: 'échoué' },
                { interface: 'Interface B', ordre: 2, etat: 'en cours' },
                { interface: 'Interface C', ordre: 3, etat: 'réussi' }
              ].map((detail, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2 px-4 text-center">{detail.interface}</td>
                  <td className="py-2 px-4 text-center">{detail.ordre}</td>
                  <td className="py-2 px-4 text-center">{renderEtatIcon(detail.etat)}</td>
                  <td className="py-2 px-4 text-center">
                    <button
                      className={`px-4 py-2 border-2 border-[#FAD7A0] text-gray-600 rounded ${isButtonDisabled('automatique', detail.etat) ? 'opacity-50 bg-[#FAD7A0] cursor-not-allowed' : 'bg-[#FAD7A0] hover:bg-[#E2B68D]'}`}
                      disabled={isButtonDisabled('automatique', detail.etat)}
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
