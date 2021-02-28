/**
 * WordPress dependancies
 */
import { __, _n, sprintf } from "@wordpress/i18n";
import { RawHTML } from "@wordpress/element";

/**
 * Internal dependancies
 */
import { TEXT_DOMAIN } from "../../utils/constants";
import Notice from "../../controls/notice";

const ReviewStep = ({ loading, orders, setData }) => {
	const groupOrders = orders.reduce((order, current) => {
		if (!order[current.status])
			order[current.status] = { label: current.status_label, items: [] };
		order[current.status].items.push(current);
		return order;
	}, {});

	return loading ? (
		<>
			<Notice status="info" type="outline" loading="true">
				{__(
					"Please wait, while we are matching shop orders from your selected filters. This processs may take few minutes to complete, based on your selected filters.",
					TEXT_DOMAIN
				)}
			</Notice>
		</>
	) : (
		<>
			{orders.length ? (
				<>
					<Notice status="success" type="filled">
						<RawHTML>
							{__(
								`We have found <strong>${
									orders.length
								}</strong> shop orders with your select filters. here is small summary of orders by order status. Now you can delete the matched orders by click <strong>${__(
									`"Delete Orders"`,
									TEXT_DOMAIN
								)}</strong> button below.`,
								TEXT_DOMAIN
							)}
						</RawHTML>
					</Notice>
					<ul className="wc-bulk-delete__orders-summary">
						{Object.keys(groupOrders).map((key) => {
							const item = groupOrders[key];
							return (
								<li key={`order-list-status-${key}`}>
									<span className="list-label">{item.label}</span>
									<span className="list-status">
										{sprintf(
											_n(
												"%d order",
												"%d orders",
												item.items.length,
												TEXT_DOMAIN
											),
											item.items.length
										)}
									</span>
								</li>
							);
						})}
					</ul>
				</>
			) : (
				<Notice status="error" type="filled">
					<p>
						{__(
							"Sorry, we didn't any found any matched shop orders with your selected filters.",
							TEXT_DOMAIN
						)}
					</p>
				</Notice>
			)}
		</>
	);
};

export default ReviewStep;
