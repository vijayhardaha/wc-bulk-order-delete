/**
 * WordPress dependancies
 */
import { __ } from "@wordpress/i18n";

/**
 * Internal dependancies
 */
import { addDays } from "./utils";

export const PLUGIN_SLUG = "wc-bulk-order-delete";

export const TEXT_DOMAIN = "wc-bulk-order-delete";

export const PLUGIN_NAME = __("WooCommece Bulk Order Delete", TEXT_DOMAIN);

export const DATE_PERIODS = [
	{ label: __("Custom Date Range", TEXT_DOMAIN), value: "custom-range" },
	{ label: __("Today Orders", TEXT_DOMAIN), value: "today" },
	{ label: __("Yesterday Orders", TEXT_DOMAIN), value: "yesterday" },
	{ label: __("Last 3 Days Orders", TEXT_DOMAIN), value: "last-3-days" },
	{ label: __("Last 7 Days Orders", TEXT_DOMAIN), value: "last-7-days" },
	{ label: __("Last 14 Days Orders", TEXT_DOMAIN), value: "last-14-days" },
	{ label: __("Last 30 Days Orders", TEXT_DOMAIN), value: "last-30-days" },
	{ label: __("This Month Orders", TEXT_DOMAIN), value: "this-month" },
	{ label: __("Last Month Orders", TEXT_DOMAIN), value: "last-month" },
	{ label: __("Last 3 Months Orders", TEXT_DOMAIN), value: "last-3-months" },
	{ label: __("Last 6 Months Orders", TEXT_DOMAIN), value: "last-6-months" },
	{ label: __("Last 12 Months Orders", TEXT_DOMAIN), value: "last-12-months" },
	{ label: __("This Year Orders", TEXT_DOMAIN), value: "this-year" },
	{ label: __("Last Year Orders", TEXT_DOMAIN), value: "last-year" },
];

export const MONTH_NAMES = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export const TODAY = new Date();

export const DEFAULT_DATA = {
	datePeriod: "custom-range",
	dateAfter: addDays(TODAY, -30),
	dateBefore: TODAY,
	orders: [],
};

export const STEPS = [
	{
		number: 1,
		label: __("Filter", TEXT_DOMAIN),
	},
	{
		number: 2,
		label: __("Review", TEXT_DOMAIN),
	},
	{
		number: 3,
		label: __("Delete", TEXT_DOMAIN),
	},
	{
		number: 4,
		label: __("Complete", TEXT_DOMAIN),
	},
];
