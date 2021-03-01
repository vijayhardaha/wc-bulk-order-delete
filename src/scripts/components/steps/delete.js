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
import { deleteOrder } from "../../services/api";

const DeleteStep = ({ loading, orders, reset, setLoading }) => {
	const [success, setSuccess] = useState("");
	const [current, setCurrent] = useState("");
	const [errors, setError] = useState([]);
	const [processed, setProcessed] = useState([]);
	const [items, setItem] = useState(orders.map((order) => order));
	const cancelled = useRef(false);

	const completed = () => Math.round((processed.length / orders.length) * 100);

	const deleteOrders = async () => {
		if (!items.length || cancelled.current) {
			setLoading(false);
			return;
		}

		setLoading(true);

		const order = items[0];
		setCurrent(order.id);

		await deleteOrder(order.id)
			.then((response) => {
				if (response.success) {
					setSuccess(
						__(`Order #${order.id} delete successfully.`, TEXT_DOMAIN)
					);
				} else {
					setError(() => {
						const _errors = errors;
						_errors.push(__(`Order #${order.id} delete failed.`, TEXT_DOMAIN));
						return _errors;
					});
				}
			})
			.catch((error) => {
				setError(() => {
					const _errors = errors;
					_errors.push(
						__(`Order #${order.id} : ${error.message}`, TEXT_DOMAIN)
					);
					return _errors;
				});
			});

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
			<div className="bod-ui__panel-body">
				<Notice type="success">
					{__(
						"Process completed. Please reload the current page to see the new orders data in orders table.",
						TEXT_DOMAIN
					)}
				</Notice>
				<ul className="bod-ui__orders-summary">
					<li>
						<span className="list-label">
							{__("Total orders", TEXT_DOMAIN)}
						</span>
						<span className="list-status">{orders.length}</span>
					</li>
					<li>
						<span className="list-label">{__("Processed", TEXT_DOMAIN)}</span>
						<span className="list-status">{processed.length}</span>
					</li>
					<li>
						<span className="list-label">
							{__("Successfully deleted", TEXT_DOMAIN)}
						</span>
						<span className="list-status">
							{processed.length - errors.length}
						</span>
					</li>
					<li>
						<span className="list-label">
							{__("Failed to delete", TEXT_DOMAIN)}
						</span>
						<span className="list-status">{errors.length}</span>
					</li>
				</ul>
			</div>
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
