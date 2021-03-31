import React from "react";

import { WeekDetails } from "../utils/calendar-util";

const WeekHeader = () => {
  return (
    <>
      {WeekDetails.map((day,dayVal) => {
        return (
          <th className={`react-full-year-calendar-week-name ${[0, 6].includes(dayVal % 7) ? "weekend" : ""}`} key={day.key}>
            {day.label}
          </th>
        );
      })}
    </>
  );
};

export default WeekHeader;
