import React, { useState, useEffect } from 'react';
import '../styles/App.scss';
import { Months } from '../utils/calendar-util';
import WeekHeader from './WeekHeader';

function FiscalCalendar({year, quarterMonth}) {
  const [FiscalCalendarData, setFiscalCalendarData] = useState([]);

  useEffect(() => {
		getCalendar(quarterMonth);
	}, [quarterMonth]);

  const getCalendar = (quarterMonth) => {
   let calendarArr = [];
   let orderMonth = [];
   let tempArr = [];
   let ind = 0;
   Months.map((val,i) => {
     if(quarterMonth === val || ind > 0){
        ind++;
        return orderMonth.push({month:val,i,year:year});
     }else{
        return tempArr.push({month:val,i, year:year+1})
     }
   });
   orderMonth = [...orderMonth, ...tempArr];
   console.log(orderMonth);
   orderMonth.map((val) => {
    let startDate = new Date(val['year'], val['i'], 1);
    let endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
    const dateArr = [] ;
    let getWeek = '';

    while (startDate <= endDate) {
      let date = new Date(startDate);
      !getWeek && (getWeek = date);
      dateArr.push(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
      startDate = new Date(date.setDate(date.getDate() + 1));
    }
    
    let tempArr =
				getWeek.getDay() !== 0
					? getWeek.getDay() - 1 === 0
						? []
						: Array(getWeek.getDay() - 1)
								.join('.')
								.split('.')
					: Array(6).join('.').split('.');

    dateArr.splice(0, 0, ...tempArr);

    let addNElementsToEnd =
      dateArr.length % 7 !== 0
        ? Array(7 - (dateArr.length % 7))
            .join('.')
            .split('.')
        : [];
    dateArr.splice(dateArr.length, 0, ...addNElementsToEnd);
    return calendarArr.push({ label: Months[val['i']], days: dateArr, startDay: getWeek.getDay(), year: val['year'] });
   });
   setFiscalCalendarData(calendarArr);
   console.log(calendarArr); 
  }

  return (
    <>
    <div className="react-full-year-calendar-container">
      {FiscalCalendarData.map((month) => {
        return (
          <table className="react-full-year-calendar-month" key={month.label}>
            <thead key={`${month.label}-head`}>
              <tr>
                <th colSpan={7}>{`${month['label']} - ${month['year']}`}</th>
              </tr>
              <tr>
                <WeekHeader />
              </tr>
            </thead>
            <tbody key={`${month.label}`}>
              {month.days
                .reduce(
                  (acc, e, i) => (i % 7 ? acc[acc.length - 1].push(e) : acc.push([e]), acc),
                  []
                )
                .map((set, monthVal) => {
                  return (
                    <tr key={`${month.label}-${monthVal}`}>
                      {set.map((day, dayVal) => {
                        return (
                          <td
                            key={dayVal}
                            className={[0, 6].includes(dayVal % 7) ? 'grey' : ''}
                          >
                            {day.split('-')[2]}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        );
      })}
    </div>
  </>
  );
}

export default FiscalCalendar;
