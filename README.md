# react-fiscal-year-calendar

fiscal year calendar component in React JS

## Documentation

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
