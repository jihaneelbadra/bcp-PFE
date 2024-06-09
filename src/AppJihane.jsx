// AppJihane.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import SidebarManager from './components/sidebar/sidebarManager';
import Header from './components/header/header';
import Dashboard from './components/dashboard/dashboard';
import Treatments from './components/executorTreatments/treatments';
import LaunchHistory from './components/launchHistory/launchHistory';
import AdminTreatments from './components/adminTreatments/adminTreatments';
import TreatmentsForm from './components/adminTreatments/treatmentsForm';
import Login from './components/authentication/Login';
import User from './components/users/user';
import AuthProvider, { useAuth } from './components/authentication/authContext'; // Import de useAuth
import PrivateRoute from './components/authentication/privateRoute';
import Interfaces from './components/adminInterfaces/adminInterfaces';
import InterfaceForm from './components/adminInterfaces/interfacesForm'; 

const App = () => {
  const [currentDate, setCurrentDate] = useState(null);

  return (
    <Router>
      <AuthProvider>
        <MainContent currentDate={currentDate} onDateChange={setCurrentDate} />
      </AuthProvider>
    </Router>
  );
};

const MainContent = ({ currentDate, onDateChange }) => {
  const { role } = useAuth(); // Utilisation de useAuth pour obtenir le rôle

  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isDashboard = location.pathname === '/dashboard';

  return (
    <div className={`flex flex-col min-h-screen ${isDashboard ? 'bg-[#F5F5F5]' : ''}`}>
      <div className="flex flex-1">
        {!isLoginPage && <SidebarManager role={role} />}
        <div className="flex flex-col w-full">
          {!isLoginPage && <Header onDateChange={onDateChange} />}
          <div className={`flex-grow ${isLoginPage ? '' : 'p-4'}`}>
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<PrivateRoute roles={['ADMIN', 'EXECUTOR']}><Dashboard currentDate={currentDate} /></PrivateRoute>} />
              <Route path="/treatments" element={<PrivateRoute roles={['EXECUTOR']}><Treatments /></PrivateRoute>} />
              <Route path="/history" element={<PrivateRoute roles={['EXECUTOR', 'ADMIN']}><LaunchHistory /></PrivateRoute>} />
              <Route path="/admin/*" element={<PrivateRoute roles={['ADMIN']}><Admin /></PrivateRoute>} />
              <Route path="/user" element={<PrivateRoute roles={['ADMIN']}><User /></PrivateRoute>} />
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
      <Route path="interfaces" element={<Interfaces />} /> {/* Route pour afficher les interfaces */}
      <Route path="interfaces/add" element={<InterfaceForm />} /> {/* Route pour ajouter une interface */}
      <Route path="interfaces/:id/edit" element={<InterfaceForm />} /> {/* Route pour modifier une interface */}
    </Routes>
  );
};

export default App;
