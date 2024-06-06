<<<<<<< HEAD


=======
// components/header/header.jsx
>>>>>>> 1c662dde5f870066a76fe4ee80d0f8771fb71d8c
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserCircleIcon } from 'lucide-react';
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
      <div>
        <Link to="/profil">
          <UserCircleIcon className="h-6 w-6 text-gray-600" /> 
        </Link>      
      </div>
    </div>
  );
};

export default Header;
<<<<<<< HEAD

=======
>>>>>>> 1c662dde5f870066a76fe4ee80d0f8771fb71d8c
