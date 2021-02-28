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
import { TEXT_DOMAIN, DEFAULT_DATA } from "../utils/constants";
import { formatStatusList } from "../utils/utils";
import { getOrderStatusList, getOrders } from "../services/api";

import PanelHeader from "./panel-header";
import PanelFooter from "./panel-footer";

import FilterStep from "./steps/filter";
import ReviewStep from "./steps/review";

/**
 * Panel Component.
 */
const Panel = ({ isPanelOpen, closePanel }) => {
	const ref = useRef();

	const [{ datePeriod, dateAfter, dateBefore, orders }, setData] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		DEFAULT_DATA
	);

	const [step, setStep] = useState(1);
	const [loading, setLoading] = useState(true);
	const [statuses, setStatuses] = useState([]);

	const classNames = classnames("wc-bulk-delete__panel-wrapper", {
		"is-open": isPanelOpen,
	});

	const handleClickOutside = (e) => {
		if (!ref || ref.current === false) return;

		if (ref.current.contains(e.target)) return;

		resetFilters();
		closePanel();
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
		await getOrderStatusList().then((data) => {
			setStatuses(formatStatusList(data));
			setLoading(false);
		});
	}, []);

	const resetFilters = () => {
		if (loading) return;

		setData(DEFAULT_DATA);

		setStatuses(
			statuses.map((status) => {
				status.checked = false;
				return status;
			})
		);
	};

	const fetchOrders = async () => {
		let complete = false;
		let offset = 0;
		let data = [];

		setData(data);
		setStep(2);
		setLoading(true);

		const apiData = {
			offset: 0,
			date_period: datePeriod,
			date_after: dateAfter,
			date_before: dateBefore,
			status: statuses.filter((s) => s.checked).map((s) => s.key),
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
		setLoading(false);
	};

	const filterProps = {
		loading,
		datePeriod,
		dateAfter,
		dateBefore,
		statuses,
		setData,
		setStatuses,
	};

	const reviewProps = {
		loading,
		orders,
		setData,
	};

	const getCurrentStep = () => {
		const steps = {
			1: <FilterStep {...filterProps} />,
			2: <ReviewStep {...reviewProps} />,
			3: <FilterStep {...filterProps} />,
			4: <FilterStep {...filterProps} />,
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
				aria-label={__("Bulk Order Delete", TEXT_DOMAIN)}
			>
				{isPanelOpen ? (
					<>
						{/*Panel Content */}
						<div className="wc-bulk-delete__panel-content">
							{/*Panel Header */}
							<PanelHeader step={step} />
							<div className="wc-bulk-delete__panel-body">{getCurrentStep()}</div>
							{/*Panel Footer */}
							<PanelFooter
								filterOrders={fetchOrders}
								resetFilters={resetFilters}
							/>
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
