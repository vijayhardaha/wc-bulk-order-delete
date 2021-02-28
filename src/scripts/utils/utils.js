/**
 * Internal dependancies
 */
import { MONTH_NAMES } from "./constants";

export const range = (start, end) => {
	var ans = [];
	for (let i = start; i <= end; i++) {
		ans.push(i);
	}
	return ans;
};

export const addDays = (date, days) => {
	const copy = new Date(Number(date));
	copy.setDate(date.getDate() + days);
	return copy;
};

export const getMonthName = (month) => MONTH_NAMES[month];

export const getDatePickerYears = () => {
	const currentDate = new Date();
	return range(currentDate.getFullYear() - 10, currentDate.getFullYear());
};

export const getDatePickerMonths = () => MONTH_NAMES;
