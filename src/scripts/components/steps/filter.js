/**
 * WordPress dependancies
 */
import { __ } from "@wordpress/i18n";
import { SelectControl } from "@wordpress/components";

/**
 * External dependancies
 */
import DatePicker from "react-datepicker";

/**
 * Internal dependancies
 */
import { TEXT_DOMAIN, DATE_PERIODS } from "../../utils/constants";

import Placeholder from "../../controls/placeholder";
import FormRow from "../../controls/form-row";
import FormField from "../../controls/form-field";
import DatePickerHeaderControl from "../../controls/date-picker-header";
import OrderStatusListControl from "../../controls/status-list";

const FilterStep = ({
	loading,
	datePeriod,
	dateAfter,
	dateBefore,
	statuses,
	setData,
	setStatuses,
}) => {
	return loading ? (
		<Placeholder />
	) : (
		<>
			<div className="wc-bulk-delete__filter-settings">
				<FormRow id="date-period-row">
					<FormField
						id="date-period"
						label={__("Date Period", TEXT_DOMAIN)}
						desc={__(
							"Choose a date period within the orders should be deleted.",
							TEXT_DOMAIN
						)}
					>
						<SelectControl
							id="wc-bulk-delete__date-period"
							value={datePeriod}
							options={DATE_PERIODS}
							onChange={(period) => setData({ datePeriod: period })}
						/>
					</FormField>
				</FormRow>

				{datePeriod === "custom-range" ? (
					<FormRow id="custom-date-range-row">
						<FormField id="date-after" label={__("Date After", TEXT_DOMAIN)}>
							<DatePicker
								id="wc-bulk-delete__date-after"
								selected={dateAfter}
								dateFormat="yyyy-MM-dd"
								renderCustomHeader={DatePickerHeaderControl}
								onChange={(date) => setData({ dateAfter: date })}
							/>
						</FormField>

						<FormField id="date-before" label={__("Date Before", TEXT_DOMAIN)}>
							<DatePicker
								id="wc-bulk-delete__date-before"
								selected={dateBefore}
								dateFormat="yyyy-MM-dd"
								renderCustomHeader={DatePickerHeaderControl}
								onChange={(date) => setData({ dateBefore: date })}
								renderCustomHeader={DatePickerHeaderControl}
							/>
						</FormField>
					</FormRow>
				) : (
					<></>
				)}

				<FormRow id="order-status-row">
					<FormField
						id="order-status"
						label={__("Order Status", TEXT_DOMAIN)}
						desc={__(
							"Choose order statuses to delete orders from selected statuses, Leave all unchecked if you want to delete within all order statuses.",
							TEXT_DOMAIN
						)}
					>
						<OrderStatusListControl options={statuses} onChange={setStatuses} />
					</FormField>
				</FormRow>
			</div>
		</>
	);
};

export default FilterStep;
