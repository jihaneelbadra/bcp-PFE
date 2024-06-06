import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import SidebarManager from './components/sidebar/sidebarManager';
import Header from './components/header/header';
import Dashboard from './components/dashboard/dashboard';
import Treatments from './components/executorTreatments/treatments';
import LaunchHistory from './components/launchHistory/launchHistory';
import AdminTreatments from './components/adminTreatments/adminTreatments';
import TreatmentsForm from './components/adminTreatments/treatmentsForm'; // Importez le composant TreatmentsForm

const App = () => {
  const userRole = 'executor';
  const [currentDate, setCurrentDate] = useState(null);

  console.log('Rendering App with userRole:', userRole);

  return (
    <Router>
      <MainContent userRole={userRole} currentDate={currentDate} onDateChange={setCurrentDate} />
    </Router>
  );
};

const MainContent = ({ userRole, currentDate, onDateChange }) => {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  return (
    <div className={`flex flex-col min-h-screen ${isDashboard ? 'bg-[#F5F5F5]' : ''}`}>
      <div className="flex flex-1">
        <SidebarManager role={userRole} />
        <div className="flex flex-col w-full">
          <Header onDateChange={onDateChange} />
          <div className="flex-grow p-4">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard currentDate={currentDate} />} />
              <Route path="/treatments" element={<Treatments />} />
              <Route path="/history" element={<LaunchHistory />} />
              <Route path="/admin/*" element={<Admin />} /> {/* Nouvelle route pour l'administration */}
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

const Admin = () => {
  const location = useLocation();
  console.log('Rendering Admin with location:', location.pathname);
  
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/treatments" />} />
      <Route path="treatments" element={<AdminTreatments />} /> {/* Route pour afficher les traitements */}
      <Route path="treatments/add" element={<TreatmentsForm />} /> {/* Route pour ajouter un traitement */}
      <Route path="treatments/:id/edit" element={<TreatmentsForm />} /> {/* Route pour modifier un traitement */}
    </Routes>
  );
};

export default App;
