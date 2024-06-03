import React from 'react';
import Treatments from './treatments'; // Assurez-vous que le nom de fichier et d'import correspond

const TreatmentData = () => {
  const traitementData = [
    {
      traitement: "Génération du flux XML de mouvements",
      interfaces: "interface A",
      sensDuFlux: "Entrant",
      modeDeLancement: "manuel",
      etat: "échoué"
    },
    {
      traitement: "Génération du flux XML de Solde",
      interfaces: "interface A",
      sensDuFlux: "sortant",
      modeDeLancement: "automatique",
      etat: "en cours"
    },
    {
      traitement: "Intégration du flux XML de transaction",
      interfaces: "interface A",
      sensDuFlux: "entrant",
      modeDeLancement: "manuel",
      etat: "réussi"
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gestion d'administration</h1>
      <Treatments data={traitementData} />
    </div>
  );
};

export default TreatmentData;
