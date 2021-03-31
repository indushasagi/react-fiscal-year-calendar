import React from 'react';
import ReactDOM from 'react-dom';
import FiscalCalendar from './components/FiscalCalendar';

//export default FiscalCalendar;
ReactDOM.render(
  <React.StrictMode>
    <FiscalCalendar year={2021} quarterMonth={'FEBRUARY'}/>
  </React.StrictMode>,
  document.getElementById('root')
);
