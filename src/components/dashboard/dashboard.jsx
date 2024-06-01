import React from 'react';
import InterfacesTable from './interfacesTable';
import AnomaliesCount from './anomaliesChart';
import AverageExecutionTimeChart from './executionTimeChart'; 

const Dashboard = () => {
  const interfacesData = [
    {
      traitement: "Génération du flux XML de mouvements",
      sensDuFlux: "sortant",
      modeDeLancement: "manuel",
      etat: "échoué",
      dateDebut: "2024-05-31T09:00:00", // Exemple de date de début
      dateFin: "2024-05-31T09:05:00" // Exemple de date de fin
    },
    {
      traitement: "Génération du flux XML de Solde",
      sensDuFlux: "sortant",
      modeDeLancement: "automatique",
      etat: "en cours",
      dateDebut: "2024-05-31T09:30:00", // Exemple de date de début
      dateFin: "2024-05-31T09:55:00" // Exemple de date de fin
    },
    {
      traitement: "Intégration du flux XML de transaction",
      sensDuFlux: "entrant",
      modeDeLancement: "manuel",
      etat: "réussi",
      dateDebut: "2024-05-31T10:00:00", // Exemple de date de début
      dateFin: "2024-05-31T10:10:00" // Exemple de date de fin
    }
  ];
  const anomaliesPercentage = (interfacesData.filter(item => item.etat === 'échoué').length / interfacesData.length) * 100;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tableau de bord</h1>
      <InterfacesTable data={interfacesData} />
      <div className="flex flex-row ">
          <div className="mt-4 mr-6">
            <AnomaliesCount anomaliesPercentage={anomaliesPercentage} />
          </div>
          <div className="mt-4 w-1/2">
            <AverageExecutionTimeChart data={interfacesData} />
          </div>
      </div>

    </div>
  );
};

export default Dashboard;