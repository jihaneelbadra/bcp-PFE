import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SidebarManager from './components/sidebar/sidebarManager';
import Header from './components/header/header';
import Dashboard from './components/dashboard/dashboard';
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
    </Router>
  );
};

const Admin = () => <div>Gestionnaire d'administration</div>;
const Users = () => <div>Gestion d'utilisateurs</div>;
const Treatments = () => <div>Traitements</div>;
const Interfaces = () => <div>Interfaces</div>;
const History = () => <div>Historique des traitements</div>;

export default App;
