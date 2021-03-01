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
import Notice from "../../controls/notice";
import { deleteOrder } from "../../services/api";

const DeleteStep = ({ loading, orders, reset, updateLoading }) => {
	const [success, setSuccess] = useState("");
	const [current, setCurrent] = useState("");
	const [errors, setError] = useState([]);
	const [processed, setProcessed] = useState([]);
	const [items, setItem] = useState(orders.map((order) => order));
	const [timer, setTimer] = useState(0);

	const cancelled = useRef(false);

	const completed = () => Math.round((processed.length / orders.length) * 100);

	const deleteOrders = async () => {
		if (!items.length || cancelled.current) {
			updateLoading(false);
			return;
		}

		const startTime = Date.now();
		const order = items[0];

		updateLoading(true);
		setCurrent(order.id);

		await deleteOrder(order.id)
			.then((response) => {
				if (response.success) {
					setSuccess(
						__(
							`Order #${order.id} delete successfully.`,
							"wc-bulk-order-delete"
						)
					);
				} else {
					setError(() => {
						const _errors = errors;
						_errors.push(
							__(`Order #${order.id} delete failed.`, "wc-bulk-order-delete")
						);
						return _errors;
					});
				}
			})
			.catch((error) => {
				setError(() => {
					const _errors = errors;
					_errors.push(
						__(`Order #${order.id} : ${error.message}`, "wc-bulk-order-delete")
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

		const endTime = Date.now();
		const estimate = endTime - startTime;
		setTimer(items.length * estimate);

		deleteOrders();
	};

	const displayTime = () => {
		let duration = timer;
		let portions = [];
		console.log(duration);
		const MICRCO_SECONDS_IN_HOUR = 1000 * 60 * 60;
		const hours = Math.trunc(duration / MICRCO_SECONDS_IN_HOUR);
		if (hours > 0) {
			portions.push(hours + "h");
			duration = duration - hours * MICRCO_SECONDS_IN_HOUR;
		}

		const MICRCO_SECONDS_IN_MINUTE = 1000 * 60;
		const minutes = Math.trunc(duration / MICRCO_SECONDS_IN_MINUTE);
		if (minutes > 0) {
			portions.push(minutes + "m");
			duration = duration - minutes * MICRCO_SECONDS_IN_MINUTE;
		}

		const seconds = Math.trunc(duration / 1000);
		if (seconds > 0) {
			portions.push(seconds + "s");
		}

		return portions.join(" ");
	};

	useEffect(() => {
		deleteOrders();
	}, []);

	return loading ? (
		<div className="bod-ui__panel-body">
			<Notice type="warning">
				{__(
					"Bulk delete process is currently running. You need to keep this page open for the process to complete.",
					"wc-bulk-order-delete"
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
						{__("Cancel", "wc-bulk-order-delete")}
					</Button>
				</div>
				<div class="bod-ui__progress-state">
					<span class="bod-ui__progress-state-item">
						<span>
							{__("Deleting", "wc-bulk-order-delete")}:{" "}
							<span className="hightlight">{`#${current}`}</span>
						</span>
					</span>
					<span class="bod-ui__progress-state-text">
						<span>{processed.length}</span>/<span>{orders.length}</span>{" "}
						{__("orders deleted", "wc-bulk-order-delete")}
					</span>
				</div>
				{timer > 0 ? (
					<div class="bod-ui__progress-state">
						<span class="bod-ui__progress-state-item">
							<span>
								{__("Estimated Time", "wc-bulk-order-delete")}:{" "}
								<span className="hightlight">{displayTime()}</span>
							</span>
						</span>
					</div>
				) : (
					<></>
				)}
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
						"wc-bulk-order-delete"
					)}
				</Notice>
				<ul className="bod-ui__orders-summary">
					<li>
						<span className="list-label">
							{__("Total orders", "wc-bulk-order-delete")}
						</span>
						<span className="list-status">{orders.length}</span>
					</li>
					<li>
						<span className="list-label">
							{__("Processed", "wc-bulk-order-delete")}
						</span>
						<span className="list-status">{processed.length}</span>
					</li>
					<li>
						<span className="list-label">
							{__("Successfully deleted", "wc-bulk-order-delete")}
						</span>
						<span className="list-status">
							{processed.length - errors.length}
						</span>
					</li>
					<li>
						<span className="list-label">
							{__("Failed to delete", "wc-bulk-order-delete")}
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
					<span className="text">
						{__("Go to Search", "wc-bulk-order-delete")}
					</span>
				</Button>
			</div>
		</>
	);
};

export default DeleteStep;
