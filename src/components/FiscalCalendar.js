import React, { useState, useEffect } from "react";
import "../styles/App.scss";
import { Months } from "../utils/calendar-util";
import WeekHeader from "./WeekHeader";

function FiscalCalendar({ year, quarterMonth, quarterDays = [] }) {
  const [FiscalCalendarData, setFiscalCalendarData] = useState([]);
  const [calendarPeriod, setCalendarPeriod] = useState("");

  useEffect(() => {
    quarterDays.length > 0 ? getCalendarByQuarterDays() : getCalendar();
  }, []);

  const getMonthOrder = (startMonth = quarterMonth) => {
    if (!quarterMonth) {
      let months = [];
      quarterDays.length > 0 &&
        quarterDays.forEach((q) => {
          const date1 = new Date(q.ST_DT);
          const date2 = new Date(q.ED_DT);
          const diffTime = Math.abs(date2 - date1);
          const qDiffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

          let qStartDate;
          let qStartMonth;
          let qStartYear;
          let uStartDate = date1;
          let dCount = 0;

          for (let i = 0; i < 3; i++) {
            dCount = i === 2 ? qDiffDays - 60 : 30;

            qStartDate = uStartDate.getDate();
            qStartMonth = uStartDate.getMonth();
            qStartYear = uStartDate.getFullYear();

            months.push({
              month: Months[qStartMonth === 12 ? 0 : Number(qStartMonth)],
              monthIndex: qStartMonth,
              year: qStartMonth === 12 ? qStartYear + 1 : qStartYear,
              startDay: qStartDate,
              daysCount: dCount,
            });
            uStartDate = new Date(
              uStartDate.setDate(uStartDate.getDate() + dCount)
            );
          }
        });
      return months;
    } else {
      let orderMonth = [];
      let tempMonths = [];
      let ind = 0;
      let startDay = 1;
      let startDate;
      let endDay;
      let qDiffDays;
      Months.forEach((val, i) => {
        startDate = new Date(year, i, 1);
        endDay = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);

        let diffTime = Math.abs(endDay - startDate);
        qDiffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        if (startMonth === val || ind > 0) {
          ind++;
          orderMonth.push({
            month: val,
            monthIndex: i,
            year: year,
            startDay: startDay,
            daysCount: qDiffDays,
          });
          startDay = 1;
          return orderMonth;
        } else {
          startDay = 1;
          return tempMonths.push({
            month: val,
            monthIndex: i,
            year: year + 1,
            startDay: startDay,
            daysCount: qDiffDays,
          });
        }
      });
      return (orderMonth = [...orderMonth, ...tempMonths]);
    }
  };

  // [[{},{},{}],[],[],[]]
  const setCalendarData = (getMonthOrders) => {
    let calendarArr = [];
    getMonthOrders.map((val) => {
      let startDate = new Date(val["year"], val["monthIndex"], val["startDay"]);
      let endDate = new Date(val["year"], val["monthIndex"], val["startDay"]);
      endDate.setDate(startDate.getDate() + (val["daysCount"] - 1));
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
        label: !quarterMonth
          ? Months[val["monthIndex"] === 11 ? 0 : val["monthIndex"] + 1]
          : Months[val["monthIndex"]],
        days: dateArr,
        year: val["year"],
      });
    });
    setFiscalCalendarData(calendarArr);
    setCalendarPeriod(`
        ${calendarArr[0].label} - ${calendarArr[0].year} to
        ${calendarArr[11].label} - ${calendarArr[11].year}`);
  };

  const getCalendarByQuarterDays = () => {
    if (quarterDays.length === 4) {
      let sortData = quarterDays.sort((a, b) => a.Q_ID - b.Q_ID);
      let flag = true;
      sortData.reduce((accumulator, currentValue, currentIndex) => {
        if (new Date(currentValue["ED_DT"]) > new Date(currentValue["ST_DT"])) {
          return currentIndex > 0
            ? accumulator &&
              new Date(accumulator["ED_DT"]) < new Date(currentValue["ST_DT"])
              ? currentValue
              : (flag = false)
            : currentValue;
        } else {
          return (flag = false);
        }
      }, []);
      if (Boolean(flag)) {
        let getMonth = new Date(quarterDays[0].ST_DT).toLocaleString(
          "default",
          { month: "long" }
        );
        const getMonthOrders = getMonthOrder(getMonth.toUpperCase());
        setCalendarData(getMonthOrders);
      } else {
        throw new Error(
          "Please provide a valid ST_DT and ED_DT for 4 quarters"
        );
      }
    } else {
      throw new Error("Please provide ST_DT and ED_DT for 4 quarters");
    }
  };

  const getCalendar = () => {
    const getMonthOrders = getMonthOrder();
    setCalendarData(getMonthOrders);
  };

  return (
    <>
      <h2>{calendarPeriod}</h2>
      <div className="react-fiscal-year-calendar-container">
        {FiscalCalendarData.reduce(
          (acc, e, i) => (
            i % 3 ? acc[acc.length - 1].push(e) : acc.push([e]), acc
          ),
          []
        ).map((quarter, qId) => {
          return (
            <div className="react-fiscal-year-calendar-quarter" key={qId}>
              <h3>{`Quarter - ${qId + 1}`}</h3>
              {quarter.map((month) => {
                return (
                  <table
                    className="react-fiscal-year-calendar-month"
                    key={month.label}
                  >
                    <thead key={`${month.label}-head`}>
                      <tr>
                        <th
                          colSpan={7}
                        >{`${month["label"]} - ${month["year"]}`}</th>
                      </tr>
                      <tr>
                        <WeekHeader />
                      </tr>
                    </thead>
                    <tbody key={`${month.label}`}>
                      {month.days
                        .reduce(
                          (acc, e, i) => (
                            i % 7 ? acc[acc.length - 1].push(e) : acc.push([e]),
                            acc
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
          );
        })}
      </div>
    </>
  );
}

export default FiscalCalendar;
