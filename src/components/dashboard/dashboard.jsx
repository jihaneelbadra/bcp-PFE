import React from 'react';
import InterfacesTable from './interfacesTable';

const Dashboard = () => {
  const interfacesData = [
    {
      traitement: "Génération du flux XML de mouvements",
      sensDuFlux: "sortant",
      modeDeLancement: "manuel",
      etat: "échoué"
    },
    {
      traitement: "Génération du flux XML de Solde ",
      sensDuFlux: "sortant",
      modeDeLancement: "automatique",
      etat: "en cours"
    },
    {
      traitement: "Intégration du flux XML de transaction",
      sensDuFlux: "entrant",
      modeDeLancement: "manuel",
      etat: "réussi"
    }
  ];
  const anomaliesPercentage = (interfacesData.filter(item => item.etat === 'échoué').length / interfacesData.length) * 100;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tableau de bord</h1>
      <InterfacesTable data={interfacesData} />
      {/* <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Pourcentage d'anomalies</h2>
        <AnomaliesPercentageChart anomaliesPercentage={anomaliesPercentage} />
      </div> */}
    </div>
  );
};

export default Dashboard;
