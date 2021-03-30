import React from 'react';
import ReactDOM from 'react-dom';
import FiscalCalendar from './components/Calendar';

//export default FiscalCalendar;
ReactDOM.render(
  <React.StrictMode>
    <FiscalCalendar year={2021} quarterMonth={'OCTOBER'}/>
  </React.StrictMode>,
  document.getElementById('root')
);
