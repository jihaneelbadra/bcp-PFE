import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import SidebarManager from './components/sidebar/sidebarManager';
import Header from './components/header/header';
import Dashboard from './components/dashboard/dashboard';
import Treatments from './components/executorTreatments/treatments';
import LaunchHistory from './components/launchHistory/launchHistory';

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
              {/* <Route path="/admin" element={<Admin />} />
              <Route path="/admin/treatments" element={<Treatments />} />
              <Route path="/admin/interfaces" element={<Interfaces />} /> */}
              <Route path="/users" element={<Users />} />
              <Route path="/treatments" element={<Treatments />} />
              <Route path="/history" element={<LaunchHistory />} /> {/* Remplacement de History par LaunchHistory */}
              {/* <Route path="/profil" element={<Profil />} /> */}
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

const Admin = () => <div>Gestionnaire d'administration</div>;
const Users = () => <div>Gestion d'utilisateurs</div>;
// const Treatments = () => <div>Traitements</div>;
const Interfaces = () => <div>Interfaces</div>;
// const History = () => <div>Historique des traitements</div>;

export default App;
