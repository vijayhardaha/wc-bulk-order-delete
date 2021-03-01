/**
 * WordPress dependancies
 */
import { __, _n, sprintf } from "@wordpress/i18n";
import { RawHTML } from "@wordpress/element";
import { Button } from "@wordpress/components";

/**
 * External dependancies
 */
import { CgArrowLeft, CgTrashEmpty } from "react-icons/cg";

/**
 * Internal dependancies
 */
import { TEXT_DOMAIN } from "../../utils/constants";
import Notice from "../../controls/notice";

const ReviewStep = ({ step, loading, orders, setData, setStep }) => {
	const groupOrders = orders.reduce((order, current) => {
		if (!order[current.status])
			order[current.status] = { label: current.status_label, items: [] };
		order[current.status].items.push(current);
		return order;
	}, {});

	return loading ? (
		<div className="bod-ui__panel-body">
			<Notice type="info" loading="true">
				{__(
					"Please wait, while we are finding shop orders from your selected filters. This processs may take few minutes to complete, based on your selected filters.",
					TEXT_DOMAIN
				)}
			</Notice>
		</div>
	) : (
		<>
			<div className="bod-ui__panel-body">
				{orders.length ? (
					<>
						<Notice type="success">
							<RawHTML>
								{__(
									`<strong>${sprintf(
										_n(
											"%d shop order",
											"%d shop orders",
											orders.length,
											TEXT_DOMAIN
										),
										orders.length
									)}</strong> found from with your select filters. Short summary of orders by order status is given below. Please review and proceed to delete found orders by clicking <strong>${__(
										`"Delete Orders"`,
										TEXT_DOMAIN
									)}</strong> button below.`,
									TEXT_DOMAIN
								)}
							</RawHTML>
						</Notice>
						<ul className="bod-ui__orders-summary">
							{Object.keys(groupOrders)
								.sort()
								.map((key) => {
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
					<Notice type="error">
						<p>
							{__(
								"Sorry, no shop orders found from your selected filters.",
								TEXT_DOMAIN
							)}
						</p>
					</Notice>
				)}
			</div>
			<div className="bod-ui__panel-footer">
				<Button className="bod-ui__button" onClick={() => setStep(1)}>
					<span className="icon">
						<CgArrowLeft />
					</span>
					<span className="text">{__("Go Back", TEXT_DOMAIN)}</span>
				</Button>
				{orders.length ? (
					<Button className="bod-ui__button" isDestructive onClick={() => setStep(3)}>
						<span className="icon">
							<CgTrashEmpty />
						</span>
						<span class="text">{__("Delete Orders", TEXT_DOMAIN)}</span>
					</Button>
				) : (
					<></>
				)}
			</div>
		</>
	);
};

export default ReviewStep;
