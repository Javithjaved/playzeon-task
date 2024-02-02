// import React, { useState } from 'react';
// import { format } from 'date-fns'; 

// function DateRangePicker() {
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);

//   const handleStartDateChange = (e) => {
//     setStartDate(new Date(e.target.value));
//   };

//   const handleEndDateChange = (e) => {
//     setEndDate(new Date(e.target.value));
//   };

//   return (
//     <div>
//       <label>Start Date: </label>
//       <input type="date" className='from-control' onChange={handleStartDateChange} />
//       {startDate && <span>{format(startDate, 'eee')}</span>}
//       <br />
//       <label>End Date: </label>
//       <input type="date" onChange={handleEndDateChange} />
//       {endDate && <span>{format(endDate, 'eee')}</span>}                    
//     </div>
//   );
// }

// export default DateRangePicker;
import React, { useState } from 'react';
import { format } from 'date-fns'; 

function DateRangePicker() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (e) => {
    setStartDate(new Date(e.target.value));
  };

  const handleEndDateChange = (e) => {
    setEndDate(new Date(e.target.value));
  };
  console.log(startDate);
  console.log(endDate);
  

  return (
    <div>
      <label>Start Date: </label>
      <input type="date"className='form-control' onChange={handleStartDateChange} />
      {startDate && <p>{format(startDate, 'eeee')}</p>}
     
      <label>End Date: </label>
      <input type="date" className='form-control' onChange={handleEndDateChange} />
      {endDate && <p>{format(endDate, 'eeee')}</p>}
    </div>
  );
}

export default DateRangePicker;
