/**
 * WordPress dependancies
 */
import { __ } from "@wordpress/i18n";
import { useState, useEffect, useReducer, useRef } from "@wordpress/element";

/**
 * External dependancies
 */
import classnames from "classnames";

/**
 * Internal dependancies
 */
import { DEFAULT_DATA } from "../utils/constants";
import { getStatuses, getOrders } from "../services/api";

import PanelHeader from "./panel-header";
import SearchStep from "./steps/search";
import ReviewStep from "./steps/review";
import DeleteStep from "./steps/delete";

/**
 * Panel Component.
 */
const Panel = ({ isPanelOpen, closePanel }) => {
	const ref = useRef();
	const processing = useRef(true);

	const [{ datePeriod, dateAfter, dateBefore, orders }, setData] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		DEFAULT_DATA
	);

	const [step, setStep] = useState(1);
	const [loading, setLoading] = useState(true);
	const [status, setStatus] = useState([]);

	const classNames = classnames("bod-ui__panel-wrapper", {
		"is-open": isPanelOpen,
		"is-loading": loading,
	});

	const handleClickOutside = (e) => {
		if (!ref || ref.current === false) return;

		if (ref.current.contains(e.target)) return;

		if (processing.current) return;

		reset();
		closePanel();
	};

	const updateLoading = (state) => {
		setLoading(state);
		processing.current = state;
	};

	useEffect(() => {
		if (isPanelOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isPanelOpen]);

	useEffect(async () => {
		updateLoading(true);

		await getStatuses().then((data) => {
			setStatus(
				Object.keys(data).map((id) => {
					return {
						key: id,
						value: data[id],
						checked: false,
					};
				})
			);
			updateLoading(false);
		});
	}, []);

	const reset = () => {
		if (loading) return;

		setData(DEFAULT_DATA);
		setStep(1);

		setStatus(
			status.map((m) => {
				m.checked = false;
				return m;
			})
		);
	};

	const findOrders = async () => {
		let complete = false;
		let offset = 0;
		let data = [];

		setData(data);
		setStep(2);
		updateLoading(true);

		const apiData = {
			offset: 0,
			date_period: datePeriod,
			date_after: dateAfter,
			date_before: dateBefore,
			status: status.filter((s) => s.checked).map((s) => s.key),
		};

		while (!complete) {
			apiData.offset = offset;
			data = await getOrders(apiData).then((response) => {
				if (response.length) {
					data = [...data, ...response];
				} else {
					complete = true;
				}
				return data;
			});
			offset += 100;
		}

		setData({ orders: data });
		updateLoading(false);
	};

	const searchProps = {
		step,
		loading,
		datePeriod,
		dateAfter,
		dateBefore,
		status,
		reset,
		findOrders,
		setData,
		setStatus,
	};

	const reviewProps = {
		step,
		loading,
		orders,
		setData,
		setStep,
	};

	const deleteProps = {
		loading,
		orders,
		reset,
		updateLoading,
	};

	const getCurrentStep = () => {
		const steps = {
			1: <SearchStep {...searchProps} />,
			2: <ReviewStep {...reviewProps} />,
			3: <DeleteStep {...deleteProps} />,
		};

		return steps[step];
	};

	return (
		<>
			{/*Panel Wrapper*/}
			<div
				className={classNames}
				tabIndex={0}
				role="tabpanel"
				ref={ref}
				aria-label={__("Bulk Order Delete", "wc-bulk-order-delete")}
			>
				{isPanelOpen ? (
					<>
						{/*Panel Content */}
						<div className="bod-ui__panel-content">
							{/*Panel Header */}
							<PanelHeader step={step} />

							{/*Panel Body */}
							{getCurrentStep()}
						</div>
					</>
				) : (
					<></>
				)}
			</div>
		</>
	);
};

export default Panel;
