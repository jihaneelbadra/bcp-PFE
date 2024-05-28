export function isHoliday(date) {
    const holidays = [
      new Date(date.getFullYear(), 0, 1),   // Nouvel An
      new Date(date.getFullYear(), 0, 11),  // Manifeste de l'Indépendance
      new Date(date.getFullYear(), 4, 1),   // Fête du Travail
      new Date(date.getFullYear(), 6, 30),  // Fête du Trône
      new Date(date.getFullYear(), 7, 14),  // Allégeance Oued Eddahab
      new Date(date.getFullYear(), 7, 20),  // Fête de la Révolution du Roi et du Peuple
      new Date(date.getFullYear(), 7, 21),  // Fête de la Jeunesse
      new Date(date.getFullYear(), 10, 18), // Fête de l'Indépendance
      new Date(date.getFullYear(), 10, 6), // Anniversaire de la Marche Verte
    ]; 
    return holidays.some(holiday => isSameDay(date, holiday)); 
  }
  export function isWeekend(date) {
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6; 
  }
  
  function isSameDay(date1, date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
  