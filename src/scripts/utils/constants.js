/**
 * WordPress dependancies
 */
import { __ } from "@wordpress/i18n";

/**
 * Internal dependancies
 */
import { addDays } from "./utils";

export const DATE_PERIODS = [
	{
		label: __("Custom Date Range", "wc-bulk-order-delete"),
		value: "custom-range",
	},
	{ label: __("Today Orders", "wc-bulk-order-delete"), value: "today" },
	{ label: __("Yesterday Orders", "wc-bulk-order-delete"), value: "yesterday" },
	{
		label: __("Last 3 Days Orders (excluding today)", "wc-bulk-order-delete"),
		value: "last-3-days",
	},
	{
		label: __("Last 7 Days Orders (excluding today)", "wc-bulk-order-delete"),
		value: "last-7-days",
	},
	{
		label: __("Last 14 Days Orders (excluding today)", "wc-bulk-order-delete"),
		value: "last-14-days",
	},
	{
		label: __("Last 30 Days Orders (excluding today)", "wc-bulk-order-delete"),
		value: "last-30-days",
	},
	{
		label: __("This Month Orders (including today)", "wc-bulk-order-delete"),
		value: "this-month",
	},
	{
		label: __("Last Month Orders", "wc-bulk-order-delete"),
		value: "last-month",
	},
	{
		label: __(
			"Last 3 Months Orders (excluding current month)",
			"wc-bulk-order-delete"
		),
		value: "last-3-months",
	},
	{
		label: __(
			"Last 6 Months Orders (excluding current month)",
			"wc-bulk-order-delete"
		),
		value: "last-6-months",
	},
	{
		label: __(
			"Last 12 Months Orders (excluding current month)",
			"wc-bulk-order-delete"
		),
		value: "last-12-months",
	},
	{ label: __("This Year Orders", "wc-bulk-order-delete"), value: "this-year" },
	{ label: __("Last Year Orders", "wc-bulk-order-delete"), value: "last-year" },
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
		label: __("Search", "wc-bulk-order-delete"),
	},
	{
		number: 2,
		label: __("Review", "wc-bulk-order-delete"),
	},
	{
		number: 3,
		label: __("Delete", "wc-bulk-order-delete"),
	},
];
