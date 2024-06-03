

import React from 'react';
import { PlayIcon, XCircleIcon, CheckCircleIcon, XIcon } from 'lucide-react';


const Treatments = ({ treatmentData }) => {
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
  return (
    <div className="flex w-full">
      <table className="min-w-full bg-white table-fixed">
        <thead>
          <tr>
            <th className="py-2 text-center">Traitement</th>
            <th className="py-2 text-center">Interfaces</th>
            <th className="py-2 text-center">Sens de flux</th>
            <th className="py-2 text-center">Mode de lancement</th>
            <th className="py-2 text-center">Etat</th>
          </tr>
        </thead>
        <tbody>
          {treatmentData.map((row, index) => (
            <tr key={index}>
              <td className="py-2 px-4 text-center">{row.traitement}</td>
              <td className="py-2 px-4 text-center">{row.interfaces}</td>
              <td className="py-2 px-4 text-center">{row.sensDuFlux}</td>
              <td className="py-2 px-4 text-center">{row.modeDeLancement}</td>
              <td className="py-2 px-4 text-center">{renderEtatIcon(row.etat)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Treatments;
