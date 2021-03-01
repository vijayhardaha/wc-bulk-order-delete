/**
 * WordPress dependancies
 */
import { __, _n, sprintf } from "@wordpress/i18n";
import { useState, useEffect, useRef, RawHTML } from "@wordpress/element";
import { Button } from "@wordpress/components";

/**
 * External dependancies
 */
import { CgArrowLeft } from "react-icons/cg";

/**
 * Internal dependancies
 */
import { TEXT_DOMAIN } from "../../utils/constants";
import Notice from "../../controls/notice";

const DeleteStep = ({ loading, orders, reset, setLoading }) => {
	const [success, setSuccess] = useState("");
	const [current, setCurrent] = useState("");
	const [errors, setError] = useState([]);
	const [processed, setProcessed] = useState([]);
	const [items, setItem] = useState(orders.map((order) => order));
	const cancelled = useRef(false);

	const fx = (prop) =>
		new Promise((resolve) => setTimeout(resolve, 500, prop)).then((data) =>
			console.log(data)
		);

	const completed = () => Math.round((processed.length / orders.length) * 100);

	const deleteOrders = async () => {
		if (!items.length || cancelled.current) {
			//	setLoading(false);
			return;
		}

		setLoading(true);

		const order = items[0];
		setCurrent(order.id);

		await fx(order.id);

		setProcessed(() => {
			const updated = processed;
			updated.push(order);
			return updated;
		});

		setItem(() => {
			const remaining = items;
			remaining.shift();
			return remaining;
		});

		setSuccess(__(`Order #${order.id} delete successfully.`, TEXT_DOMAIN));

		deleteOrders();
	};

	useEffect(() => {
		deleteOrders();
	}, []);

	return loading ? (
		<div className="bod-ui__panel-body">
			<Notice type="warning">
				{__(
					"Bulk delete process is currently running. You need to keep this page open for the process to complete.",
					TEXT_DOMAIN
				)}
			</Notice>
			<div class="bod-ui__progress-wrapper">
				<div class="bod-ui__progress-block">
					<div class="bod-ui__progress">
						<span class="bod-ui__progress-icon" aria-hidden="true">
							<div class="bod-ui__spinner"></div>
						</span>
						<div class="bod-ui__progress-text">
							<span>{completed()}%</span>
						</div>
						<div class="bod-ui__progress-bar">
							<span style={{ width: `${completed()}%` }}></span>
						</div>
					</div>
					<Button
						className="bod-ui__progress-cancel"
						type="button"
						onClick={() => {
							cancelled.current = true;
						}}
					>
						{__("Cancel", TEXT_DOMAIN)}
					</Button>
				</div>
				<div class="bod-ui__progress-state">
					<span class="bod-ui__progress-state-item">
						<span>
							{__("Deleting", TEXT_DOMAIN)}:{" "}
							<span className="hightlight">{`#${current}`}</span>
						</span>
					</span>
					<span class="bod-ui__progress-state-text">
						<span>{processed.length}</span>/<span>{orders.length}</span>{" "}
						{__("orders deleted", TEXT_DOMAIN)}
					</span>
				</div>
			</div>
			{success ? <Notice type="success">{success}</Notice> : <></>}
			{errors.map((error) => {
				return <Notice type="error">{error}</Notice>;
			})}
		</div>
	) : (
		<>
			<div className="bod-ui__panel-body"></div>
			<div className="bod-ui__panel-footer">
				<Button className="bod-ui__button" onClick={() => reset()}>
					<span className="icon">
						<CgArrowLeft />
					</span>
					<span className="text">{__("Go to Search", TEXT_DOMAIN)}</span>
				</Button>
			</div>
		</>
	);
};

export default DeleteStep;
