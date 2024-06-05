import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SidebarManager from './components/sidebar/sidebarManager';
import Header from './components/header/header';
import Dashboard from './components/dashboard/dashboard';
import Login from './components/authentication/Login';
import User from './components/users/user';


const App = () => {
  
  // Remplacez ceci par votre logique de vérification de connexion

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-1">
          {<SidebarManager role={'admin'} />}
          <div className="flex flex-col w-full">
            { <Header />}
            <div className="flex-grow p-4">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard /> } />
                <Route path="/user" element={<User /> } />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
