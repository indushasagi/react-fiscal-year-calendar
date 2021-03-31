[![npm version](https://badge.fury.io/js/react-fiscal-year-calendar.svg)](https://badge.fury.io/js/react-fiscal-year-calendar)
[![Code Quality: Javascript](https://img.shields.io/lgtm/grade/javascript/g/indushasagi/react-fiscal-year-calendar.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/indushasagi/react-fiscal-year-calendar/context:javascript)
[![Downloads](https://img.shields.io/npm/dm/react-fiscal-year-calendar.svg)](https://npmjs.org/package/react-fiscal-year-calendar)
[![Total Alerts](https://img.shields.io/lgtm/alerts/g/indushasagi/react-fiscal-year-calendar.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/indushasagi/react-fiscal-year-calendar/alerts)

# react-fiscal-year-calendar

fiscal year calendar component in React JS

### Demo

[Demo](https://react-fiscal-year-calendar.vercel.app/)

### Installation

**npm**

```bash
npm install react-fiscal-year-calendar --save
```

**yarn**

```bash
yarn add react-fiscal-year-calendar
```

### Props

react-fiscal-year-calendar component accepts a mandatory prop - year, quarterMonth (Q1 Starting month)

### Example

```js
import FiscalCalendar from "react-fiscal-year-calendar";

export default function SimpleCalendar() {
  return <FiscalCalendar year={2021} quarterMonth={"APRIL"} />;
}
```
