import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import SidebarManager from './components/sidebar/sidebarManager';
import Header from './components/header/header';
import Dashboard from './components/dashboard/dashboard';

const App = () => {
  const userRole = 'admin';
  console.log('Rendering App with userRole:', userRole);

  return (
    <Router>
      <MainContent userRole={userRole} />
    </Router>
  );
};

const MainContent = ({ userRole }) => {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  return (
    <div className={`flex flex-col min-h-screen ${isDashboard ? 'bg-[#F5F5F5]' : ''}`}>
      <div className="flex flex-1 ">
        <SidebarManager role={userRole} />
        <div className="flex flex-col w-full">
          <Header />
          <div className="flex-grow p-4">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/treatments" element={<Treatments />} />
              <Route path="/admin/interfaces" element={<Interfaces />} />
              <Route path="/users" element={<Users />} />
              <Route path="/treatments" element={<Treatments />} />
              <Route path="/history" element={<History />} />
              {/* <Route path="/profil" element={<Profil />}  /> */}
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

const Admin = () => <div>Gestionnaire d'administration</div>;
const Users = () => <div>Gestion d'utilisateurs</div>;
const Treatments = () => <div>Traitements</div>;
const Interfaces = () => <div>Interfaces</div>;
const History = () => <div>Historique des traitements</div>;

export default App;