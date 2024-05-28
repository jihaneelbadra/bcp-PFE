import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const Sidebar = ({ menu }) => {
  const [activeMenu, setActiveMenu] = useState('');
  const menuRef = useRef(null);

  const handleSubMenuToggle = (menuName) => {
    setActiveMenu(activeMenu === menuName ? '' : menuName);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setActiveMenu('');
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-[#FAD7A0] h-screen flex flex-col w-64">
      <div className="text-center mb-8 p-4">
        <img src="src\assets\1280px-Logo_BCP.svg.png" alt="Logo de l'entreprise" 
        className="mx-auto w-28 h-auto" />
      </div>
      <div className="flex-1 overflow-y-auto" ref={menuRef}>
        <ul>
          {menu.map((item, index) => (
            <li key={index} className="mb-2 px-3">
              {item.submenu ? (
                <div>
                  <div onClick={() => handleSubMenuToggle(item.name)} className={`
                    relative flex items-center py-2 px-1.5 my-1 
                    text-sm text-gray-600 rounded-md cursor-pointer 
                    transition-colors group 
                    ${activeMenu === item.name ? "bg-gradient-to-tr from-[#E2B68D] to-[#E2B68D] text-gray-800 font-medium" : "hover:font-medium"}
                  `}>
                    {React.cloneElement(item.icon, { className: "h-4 w-5" })}
                    <span className="ml-1">{item.name}</span>
                  </div>
                  {activeMenu === item.name && (
                    <ul>
                      {item.submenu.map((submenuItem, subIndex) => (
                        <li key={subIndex} className="my-5">
                          <NavLink
                            to={submenuItem.path}
                            className={({ isActive }) => `
                              ml-6 py-3 px-10 my-1  text-gray-600 
                              text-sm rounded-md cursor-pointer transition-colors group 
                              ${isActive ? "bg-gradient-to-tr from-[#E2B68D] to-[#E2B68D] text-gray-800 font-medium" : "hover:font-medium"}
                            `}
                          >
                            {submenuItem.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `
                    relative flex items-center py-2 px-2 my-1
                    text-sm text-gray-600 rounded-md cursor-pointer
                    transition-colors group
                    ${isActive ? "bg-gradient-to-tr from-[#E2B68D] to-[#E2B68D] text-gray-800 font-medium" : "hover:font-medium"}
                  `}
                  onClick={() => setActiveMenu('')}
                >
                  {React.cloneElement(item.icon, { className: "h-5 w-4" })}
                  <span className="ml-1">{item.name}</span>
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  menu: PropTypes.array.isRequired,
};

export default Sidebar;
