/**
 * WordPress dependancies
 */
import { __ } from "@wordpress/i18n";
import { Button, SelectControl } from "@wordpress/components";

/**
 * External dependancies
 */
import DatePicker from "react-datepicker";
import { FiFilter, FiArrowLeft, FiX } from "react-icons/fi";

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
	step,
	loading,
	datePeriod,
	dateAfter,
	dateBefore,
	status,
	reset,
	getOrders,
	setData,
	setStatus,
}) => {
	return loading ? (
		<div className="wc-bulk-delete__panel-body">
			<Placeholder />
		</div>
	) : (
		<>
			<div className="wc-bulk-delete__panel-body">
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

							<FormField
								id="date-before"
								label={__("Date Before", TEXT_DOMAIN)}
							>
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
								"Choose order status to delete orders from selected status, Leave all unchecked if you want to delete within all order status.",
								TEXT_DOMAIN
							)}
						>
							<OrderStatusListControl options={status} onChange={setStatus} />
						</FormField>
					</FormRow>
				</div>
			</div>
			<div className="wc-bulk-delete__panel-footer">
				<Button onClick={() => getOrders()}>
					<span className="icon">
						<FiFilter />
					</span>
					<span class="text">{__("Filter Orders", TEXT_DOMAIN)}</span>
				</Button>
				<Button className="alt" onClick={() => reset()}>
					<span className="icon">
						<FiX />
					</span>
					<span className="text">{__("Reset", TEXT_DOMAIN)}</span>
				</Button>
			</div>
		</>
	);
};

export default FilterStep;
