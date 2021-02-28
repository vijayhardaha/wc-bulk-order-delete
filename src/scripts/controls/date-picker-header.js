/**
 * WordPress dependancies
 */
import { __ } from "@wordpress/i18n";

/**
 * External dependancies
 */
import { CgArrowLeft, CgArrowRight } from "react-icons/cg";

/**
 * Internal dependancies
 */
import { TEXT_DOMAIN } from "../utils/constants";
import {
	getMonthName,
	getDatePickerMonths as months,
	getDatePickerYears as years,
} from "../utils/Utils";

const DatePickerHeaderControl = ({
	date,
	changeYear,
	changeMonth,
	decreaseMonth,
	increaseMonth,
	prevMonthButtonDisabled,
	nextMonthButtonDisabled,
}) => {
	return (
		<div className="react-datepicker__header-inner">
			<button
				type="button"
				aria-label={__("Previous Month", TEXT_DOMAIN)}
				className="react-datepicker__nav react-datepicker__nav--previous"
				onClick={decreaseMonth}
				disabled={prevMonthButtonDisabled}
			>
				<CgArrowLeft />
			</button>

			<select
				className="react-datepicker__month-select"
				value={getMonthName(date.getMonth())}
				onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
			>
				{months().map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>

			<select
				className="react-datepicker__year-select"
				value={date.getYear()}
				onChange={({ target: { value } }) => changeYear(value)}
			>
				{years().map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>

			<button
				type="button"
				aria-label={__("Next Month", TEXT_DOMAIN)}
				className="react-datepicker__nav react-datepicker__nav--next"
				onClick={increaseMonth}
				disabled={nextMonthButtonDisabled}
			>
				<CgArrowRight />
			</button>
		</div>
	);
};
export default DatePickerHeaderControl;
