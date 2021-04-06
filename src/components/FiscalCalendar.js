import React, { useState, useEffect } from "react";
import "../styles/App.scss";
import { Months } from "../utils/calendar-util";
import WeekHeader from "./WeekHeader";
import PropTypes from 'prop-types';

function FiscalCalendar({ year, quarterMonth, quarterDays=[] }) {
  const [FiscalCalendarData, setFiscalCalendarData] = useState([]);
  const [calendarPeriod, setCalendarPeriod] = useState('');

  useEffect(() => {
    if(quarterDays.length>0){
      getCalendarByquarterDays();
    }else{
      getCalendar();
    }
  }, [quarterDays]);

  const getMonthOrder = (startMonth=quarterMonth) => {
    let orderMonth = [];
    let tempMonths = [];
    let ind = 0;
    let startDay = 1;
    Months.forEach((val, i) => {
      if (startMonth === val || ind > 0) {
        if(quarterDays.length>0 && ind===0){
          startDay = new Date(quarterDays[0].ST_DT).getDate();
        }
        ind++;
        orderMonth.push({ month: val, i, year: year, startDay:startDay });
        startDay = 1;
        return orderMonth;
      } else {
        startDay = 1;
        return tempMonths.push({ month: val, i, year: year + 1, startDay:startDay });
      }
    });
    return orderMonth = [...orderMonth, ...tempMonths];
  }

  const setCalendarData = (getMonthOrders) => {
    let calendarArr = [];
    getMonthOrders.map((val) => {
      let startDate = new Date(val["year"], val["i"], val["startDay"]);
      let endDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth() + 1,
        0
      );
      const dateArr = [];
      let getWeek = "";

      while (startDate <= endDate) {
        let date = new Date(startDate);
        !getWeek && (getWeek = date);
        dateArr.push(
          `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        );
        startDate = new Date(date.setDate(date.getDate() + 1));
      }
 
      let tempArr =
        getWeek.getDay() !== 0
          ? getWeek.getDay() - 1 === 0
            ? []
            : Array(getWeek.getDay() - 1)
                .join(".")
                .split(".")
          : Array(6).join(".").split(".");

      dateArr.splice(0, 0, ...tempArr);

      let addNElementsToEnd =
        dateArr.length % 7 !== 0
          ? Array(7 - (dateArr.length % 7))
              .join(".")
              .split(".")
          : [];
      dateArr.splice(dateArr.length, 0, ...addNElementsToEnd);
      return calendarArr.push({
        label: Months[val["i"]],
        days: dateArr,
        startDay: getWeek.getDay(),
        year: val["year"],
      });
    });
    setFiscalCalendarData(calendarArr);
    setCalendarPeriod(`
        ${calendarArr[0].label} - ${calendarArr[0].year} to
        ${calendarArr[11].label} - ${calendarArr[11].year}`
    );
  }

  const getCalendarByquarterDays = () => {
    if(quarterDays.length === 4){
      let sortData = quarterDays.sort((a,b) => a.Q_ID - b.Q_ID);
      let flag = true;
      sortData.reduce((accumulator,currentValue,currentIndex) => {
        if(new Date(currentValue['ED_DT']) > new Date(currentValue['ST_DT'])){
          return currentIndex > 0 ? (accumulator && new Date(accumulator['ED_DT']) < new Date(currentValue['ST_DT']) ? currentValue : flag = false): currentValue;
        }else{
          return flag = false;
        }
      },[]);
      if(Boolean(flag)){
        let getMonth = new Date(quarterDays[0].ST_DT).toLocaleString('default', { month: 'long' });
        const getMonthOrders = getMonthOrder(getMonth.toUpperCase());
        setCalendarData(getMonthOrders);
      }else{
        throw new Error('Please provide a valid ST_DT and ED_DT for 4 quarters');  
      }
    }else{
      throw new Error('Please provide ST_DT and ED_DT for 4 quarters');
    }
  };

  const getCalendar = () => {
    const getMonthOrders = getMonthOrder();
    setCalendarData(getMonthOrders);
  };

  return (
    <>
      <h2>
        {calendarPeriod}
      </h2>
      <div className="react-fiscal-year-calendar-container">
        {FiscalCalendarData.map((month) => {
          return (
            <table className="react-fiscal-year-calendar-month" key={month.label}>
              <thead key={`${month.label}-head`}>
                <tr>
                  <th colSpan={7}>{`${month["label"]} - ${month["year"]}`}</th>
                </tr>
                <tr>
                  <WeekHeader />
                </tr>
              </thead>
              <tbody key={`${month.label}`}>
                {month.days
                  .reduce(
                    (acc, e, i) => (
                      i % 7 ? acc[acc.length - 1].push(e) : acc.push([e]), acc
                    ),
                    []
                  )
                  .map((set, monthVal) => {
                    return (
                      <tr key={`${month.label}-${monthVal}`}>
                        {set.map((day, dayVal) => {
                          return (
                            <td
                              key={dayVal}
                              className={
                                [0, 6].includes(dayVal % 7) ? "grey" : ""
                              }
                            >
                              {day.split("-")[2]}
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
