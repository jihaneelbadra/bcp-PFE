import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaFilePdf, FaFileExcel } from 'react-icons/fa';

const LaunchHistory = () => {
  const [launchHistory, setLaunchHistory] = useState([]);

  useEffect(() => {
    const fetchLaunchHistory = async () => {
      try {
        const response = await axios.get('http://localhost:8080/mimapi/launchHistory');
        setLaunchHistory(response.data);
      } catch (error) {
        console.error('Error fetching launch history:', error);
      }
    };

    fetchLaunchHistory();
  }, []);

  const exportToFile = async (url, fileName) => {
    try {
      const response = await axios.get(url, {
        responseType: 'blob',
      });
      const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = urlBlob;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(`Error exporting to ${fileName}:`, error);
    }
  };

  const exportToPdf = () => {
    exportToFile('http://localhost:8080/mimapi/export/pdf', 'launch_history.pdf');
  };

  const exportToExcel = () => {
    exportToFile('http://localhost:8080/mimapi/export/excel', 'launch_history.xlsx');
  };

  return (
    
    <div className="w-full bg-white p-4 rounded-lg">
     <h1 className="text-2xl font-bold mb-4">Historique des traitements</h1>
      <div className="overflow-auto max-h-80 mt-8">
        <table className="min-w-full text-sm bg-white table-fixed rounded-lg">
          <thead>
            <tr>
              <th className="py-2 text-center">Nom Traitement</th>
              <th className="py-2 text-center">Sens du Flux</th>
              <th className="py-2 text-center">Mode de Lancement</th>
              <th className="py-2 text-center">Date Début Lancement</th>
              <th className="py-2 text-center">Date Fin Lancement</th>
              <th className="py-2 text-center">Etat Lancement</th>
            </tr>
          </thead>
          <tbody>
            {launchHistory.map((launch, index) => (
              <tr key={index} className="border-t">
                <td className="py-2 px-4 text-center">{launch.nomTraitement}</td>
                <td className="py-2 px-4 text-center">{launch.sensFlux}</td>
                <td className="py-2 px-4 text-center">{launch.modeLancement}</td>
                <td className="py-2 px-4 text-center">{new Date(launch.dateDebutLancement).toLocaleString()}</td>
                <td className="py-2 px-4 text-center">{new Date(launch.dateFinLancement).toLocaleString()}</td>
                <td className="py-2 px-4 text-center">{launch.etatLancement}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-8">
        <span className="mr-2 mt-2">Exporter</span>
        <button
          onClick={exportToPdf}
          className="flex items-center px-4 py-2 mx-2 border-2 border-red-400 text-red-600 rounded bg-red-200 hover:bg-red-300"
        >
          <FaFilePdf className="mr-2" />
          en PDF
        </button>
        <button
          onClick={exportToExcel}
          className="flex items-center px-4 py-2 mx-2 border-2 border-green-400 text-green-600 rounded bg-green-200 hover:bg-green-300"
        >
          <FaFileExcel className="mr-2" />
          en Excel
        </button>
      </div>
    </div>
  );
};

export default LaunchHistory;
