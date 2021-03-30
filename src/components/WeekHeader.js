import React from 'react';

import { WeekDetails } from '../utils/calendar-util';

const WeekHeader = () => {
	return (
		<>
			{WeekDetails.map((day) => {
				return (
					<th className="react-full-year-calendar-week-name" key={day.key}>
						{day.label}
					</th>
				);
			})}
		</>
	);
};

export default WeekHeader;