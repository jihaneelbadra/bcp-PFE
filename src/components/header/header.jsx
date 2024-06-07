import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LogOutIcon } from 'lucide-react';
import { isWeekend, isHoliday } from '../../utils/dateUtils';

const Header = ({ onDateChange }) => {
  const [currentDate, setCurrentDate] = useState(null);

  useEffect(() => {
    const fetchCurrentDate = async () => {
      const today = new Date();
      let nextWorkingDay = today;

      while (isWeekend(nextWorkingDay) || isHoliday(nextWorkingDay)) {
        nextWorkingDay = new Date(nextWorkingDay);
        nextWorkingDay.setDate(nextWorkingDay.getDate() + 1);
      }

      setCurrentDate(nextWorkingDay);
      if (onDateChange) {
        onDateChange(nextWorkingDay);
      }
    };

    fetchCurrentDate();
  }, [onDateChange]);

  return (
    <div className="p-3 flex justify-between items-center"> 
      <div>
        <p className="text-sm">Journée comptable : {currentDate ? currentDate.toLocaleDateString() : 'Chargement...'}</p>
        <hr className="border-t border-gray-300 mt-2" />
      </div>
      <div className="relative group">
        <Link to="/" className="flex items-center focus:outline-none">
          <LogOutIcon className="h-6 w-6 text-gray-600 translate-x-[100px] group-hover:translate-x-0 transition-transform" />
          <span className="ml-2 text-gray-600 opacity-0 group-hover:opacity-100 text-red-600 transition-opacity">Se déconnecter</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;