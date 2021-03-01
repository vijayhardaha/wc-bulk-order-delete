/**
 * WordPress dependancies
 */
import { __ } from "@wordpress/i18n";
import { Button, SelectControl } from "@wordpress/components";

/**
 * External dependancies
 */
import DatePicker from "react-datepicker";
import { CgSearch, CgClose } from "react-icons/cg";

/**
 * Internal dependancies
 */
import { DATE_PERIODS } from "../../utils/constants";
import Placeholder from "../../controls/placeholder";
import FormRow from "../../controls/form-row";
import FormField from "../../controls/form-field";
import DatePickerHeaderControl from "../../controls/date-picker-header";
import OrderStatusListControl from "../../controls/status-list";

const SearchStep = ({
	step,
	loading,
	datePeriod,
	dateAfter,
	dateBefore,
	status,
	reset,
	findOrders,
	setData,
	setStatus,
}) => {
	return loading ? (
		<div className="bod-ui__panel-body">
			<Placeholder />
		</div>
	) : (
		<>
			<div className="bod-ui__panel-body">
				<div className="bod-ui__filter-settings">
					<FormRow id="date-period-row">
						<FormField
							id="date-period"
							label={__("Date Period", "wc-bulk-order-delete")}
							desc={__(
								"Choose a date period within the orders should be deleted.",
								"wc-bulk-order-delete"
							)}
						>
							<SelectControl
								id="bod-ui__date-period"
								value={datePeriod}
								options={DATE_PERIODS}
								onChange={(period) => setData({ datePeriod: period })}
							/>
						</FormField>
					</FormRow>

					{datePeriod === "custom-range" ? (
						<FormRow id="custom-date-range-row">
							<FormField
								id="date-after"
								label={__("Date After", "wc-bulk-order-delete")}
							>
								<DatePicker
									id="bod-ui__date-after"
									selected={dateAfter}
									dateFormat="yyyy-MM-dd"
									renderCustomHeader={DatePickerHeaderControl}
									onChange={(date) => {
										if (date !== null && date !== "") {
											setData({ dateAfter: date });
										}
									}}
								/>
							</FormField>

							<FormField
								id="date-before"
								label={__("Date Before", "wc-bulk-order-delete")}
							>
								<DatePicker
									id="bod-ui__date-before"
									selected={dateBefore}
									dateFormat="yyyy-MM-dd"
									renderCustomHeader={DatePickerHeaderControl}
									onChange={(date) => {
										if (date !== null && date !== "") {
											setData({ dateBefore: date });
										}
									}}
									renderCustomHeader={DatePickerHeaderControl}
								/>
							</FormField>
						</FormRow>
					) : (
						<></>
					)}

					{status.length ? (
						<>
							<FormRow id="order-status-row">
								<FormField
									id="order-status"
									label={__("Order Status", "wc-bulk-order-delete")}
									desc={__(
										"Choose order status to delete orders from selected status, Leave all unchecked if you want to delete within all order status.",
										"wc-bulk-order-delete"
									)}
								>
									<OrderStatusListControl
										options={status}
										onChange={setStatus}
									/>
								</FormField>
							</FormRow>
						</>
					) : (
						<></>
					)}
				</div>
			</div>
			<div className="bod-ui__panel-footer">
				<Button
					className="bod-ui__button"
					isPrimary
					onClick={() => findOrders()}
				>
					<span className="icon">
						<CgSearch />
					</span>
					<span class="text">{__("Find Orders", "wc-bulk-order-delete")}</span>
				</Button>
				<Button className="bod-ui__button" onClick={() => reset()}>
					<span className="icon">
						<CgClose />
					</span>
					<span className="text">{__("Reset", "wc-bulk-order-delete")}</span>
				</Button>
			</div>
		</>
	);
};

export default SearchStep;
