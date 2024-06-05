

import React from 'react';
import { PlayIcon, XCircleIcon, CheckCircleIcon, XIcon } from 'lucide-react';


const Interfaces = ({ treatmentData }) => {
  
  return (
    <div className="flex w-full">
      <table className="min-w-full bg-white table-fixed">
        <thead>
          <tr>
            <th className="py-2 text-center">Interfaces</th>
            <th className="py-2 text-center">Traitement </th>
            <th className="py-2 text-center">Ordre de Lancement</th>
            <th className="py-2 text-center">Etat</th>
          </tr>
        </thead>
        <tbody>
          {treatmentData.map((row, index) => (
            <tr key={index}>
              <td className="py-2 px-4 text-center">{row.Interfaces}</td>
              <td className="py-2 px-4 text-center">{row.Traitement}</td>
              <td className="py-2 px-4 text-center">{row.ordreDeLancement}</td>
              
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Interfaces;
