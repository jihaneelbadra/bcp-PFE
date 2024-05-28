import React from 'react';
import Sidebar from './sidebar';
import { HomeIcon, SettingsIcon, UsersIcon, FileTextIcon } from 'lucide-react';


const SidebarManager = ({ role }) => {
  const adminMenu = [
    { name: 'Tableau de bord', path: '/dashboard', icon: <HomeIcon /> },
    { 
      name: 'Gestion d\'administration', 
      path: '/admin', 
      icon: <SettingsIcon />, 
      submenu: [
        { name: 'Traitements', path: '/admin/treatments' },
        { name: 'Interfaces', path: '/admin/interfaces' }
      ] 
    },
    { name: 'Gestion des utilisateurs', path: '/users', icon: <UsersIcon /> },
  ];

  const executorMenu = [
    { name: 'Tableau de bord', path: '/dashboard', icon: <HomeIcon /> },
    { name: 'Traitements', path: '/treatments', icon: <SettingsIcon /> },
    { name: 'Historique des traitements', path: '/history', icon: <FileTextIcon /> },
  ];

  const menu = role === 'admin' ? adminMenu : executorMenu;

  return <Sidebar menu={menu} />;
};

export default SidebarManager;
