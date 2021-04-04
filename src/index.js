import React from 'react';
import ReactDOM from 'react-dom';
import FiscalCalendar from './components/FiscalCalendar';

//export default FiscalCalendar;
ReactDOM.render(
  <React.StrictMode>
    
    <FiscalCalendar year={2018} quarterMonth={'FEBRUARY'} quarterDays={
      [
        {
          "Q_ID":"1",
          "ST_DT":"2018-09-20",
          "ED_DT":"2018-12-29"
        },
        {
          "Q_ID":"2",
          "ST_DT":"2018-12-30",
          "ED_DT":"2019-03-30"
        },
        {
          "Q_ID":"3",
          "ST_DT":"2019-03-31",
          "ED_DT":"2019-06-29"
        },
        {
          "Q_ID":"4",
          "ST_DT":"2019-06-30",
          "ED_DT":"2019-09-28"
        }
      ]} />
  </React.StrictMode>,
  document.getElementById('root')
);
