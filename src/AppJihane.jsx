import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SidebarManager from './components/sidebar/sidebarManager';
import Header from './components/header/header';
import Treatments from './components/admin/treatments';
import Dashboard from './components/dashboard/dashboard';


const treatmentData = [
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

const App = () => {
  const userRole = 'admin'; 
  console.log('Rendering App with userRole:', userRole); 

  return (
    <Router>
      <div className="flex flex-col h-screen">
        <div className="flex">
          <SidebarManager role={userRole} />
          <div className="flex flex-col w-full">
            <Header />
            <div className="flex-grow p-4">
              <Routes>
                <Route path="/" element={<Navigate to="/admin/treatments" />} />
                <Route path="/admin/treatments" element={<Treatments treatmentData={treatmentData} />} />
                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="*" element={<Navigate to="/admin/treatments" />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
