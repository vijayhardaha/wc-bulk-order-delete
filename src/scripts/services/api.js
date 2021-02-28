/**
 * WordPress dependancies
 */
import apiFetch from "@wordpress/api-fetch";

export const getStatuses = () => {
	return apiFetch({
		path: `/wc-bulk-order-delete/v1/statuses`,
	});
};

export const getOrders = (data) => {
	return apiFetch({
		path: `/wc-bulk-order-delete/v1/orders`,
		method: "POST",
		data,
	});
};
