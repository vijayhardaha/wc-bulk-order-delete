/**
 * WordPress dependancies
 */
import apiFetch from "@wordpress/api-fetch";
import { addQueryArgs } from "@wordpress/url";

export const getOrderStatusList = () => {
	return apiFetch({
		path: `/wc-bulk-order-delete/v1/statuses`,
	});
};

export const getOrders = (data) => {
	const path = addQueryArgs("/wc-bulk-order-delete/v1/orders", data);
	return apiFetch({
		path,
	});
};
