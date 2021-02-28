/**
 * WordPress dependancies
 */
import apiFetch from "@wordpress/api-fetch";
import { addQueryArgs } from "@wordpress/url";

export const get_statuses = () => {
	return apiFetch({
		path: `/wc-bulk-order-delete/v1/statuses`,
	});
};

export const get_orders = (data) => {
	const path = addQueryArgs("/wc-bulk-order-delete/v1/orders", data);
	return apiFetch({
		path,
	});
};
