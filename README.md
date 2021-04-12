[![npm version](https://badge.fury.io/js/react-fiscal-year-calendar.svg)](https://badge.fury.io/js/react-fiscal-year-calendar)
[![Code Quality: Javascript](https://img.shields.io/lgtm/grade/javascript/g/indushasagi/react-fiscal-year-calendar.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/indushasagi/react-fiscal-year-calendar/context:javascript)
[![Downloads](https://img.shields.io/npm/dm/react-fiscal-year-calendar.svg)](https://npmjs.org/package/react-fiscal-year-calendar)
[![Total Alerts](https://img.shields.io/lgtm/alerts/g/indushasagi/react-fiscal-year-calendar.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/indushasagi/react-fiscal-year-calendar/alerts)

# react-fiscal-year-calendar

Fiscal year calendar component in React JS

## Demo

[Demo](https://react-fiscal-year-calendar.vercel.app/)

## Installation

**npm**

```bash
npm install react-fiscal-year-calendar --save
```

**yarn**

```bash
yarn add react-fiscal-year-calendar
```

## Props

react-fiscal-year-calendar component accepts props as mentioned below.

### Type 1
Both year and quarter month should be passed as mandator props. 
- `year` - Number - Fiscal Year
- `quarterMonth` - String - Fiscal Year Start Month

or
### Type 2
If the fiscal month start and end dates differ.
- `quarterDays` - Array of Objects - Mentioning the start and end dates of each quarter ( considering 3 months)

## Examples:

### Example 1

```js
import FiscalCalendar from "react-fiscal-year-calendar";

export default function SimpleCalendar() {
  return <FiscalCalendar year={2021} quarterMonth={"APRIL"} />;
}
```

### Example 2

```js
import FiscalCalendar from "react-fiscal-year-calendar";

export default function SimpleCalendar() {
  return (
    <FiscalCalendar
      quarterDays={[
        {
          Q_ID: "1",
          ST_DT: "2018-09-23",
          ED_DT: "2018-12-23",
        },
        {
          Q_ID: "2",
          ST_DT: "2018-12-24",
          ED_DT: "2019-03-24",
        },
        {
          Q_ID: "3",
          ST_DT: "2019-03-25",
          ED_DT: "2019-06-25",
        },
        {
          Q_ID: "4",
          ST_DT: "2019-06-26",
          ED_DT: "2019-09-22",
        },
      ]}
    />
  );
}
```
