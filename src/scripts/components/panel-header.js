/**
 * WordPress dependancies
 */
import { __ } from "@wordpress/i18n";

/**
 * Internal dependancies
 */
import { STEPS } from "../utils/constants";

/**
 * External dependancies
 */
import classnames from "classnames";
import { HiCheck } from "react-icons/hi";

const PanelHeader = ({ step }) => {
	const count = STEPS.reduce((c, x) => c + 1, 0);
	const styles = {
		width: step <= 1 ? `0%` : ((step - 1) / (count - 1)) * 100 + "%",
	};

	return (
		<>
			<div className="wc-bulk-delete__panel-header">
				<div className="wc-bulk-delete__steps">
					<div className="wc-bulk-delete__bar">
						<div className="wc-bulk-delete__bar-fill" style={styles}></div>
					</div>
					{STEPS.map(({ number, label }, i) => {
						const classNames = classnames("wc-bulk-delete__point", {
							"wc-bulk-delete__point-complete": step > number,
							"wc-bulk-delete__point-active": step == number,
						});

						const bullet = step > number ? <HiCheck /> : number;

						return (
							<div key={`wc-bulk-delete__point-${i}-${number}`} className={classNames}>
								<div className="wc-bulk-delete__bullet">{bullet}</div>
								<label className="wc-bulk-delete__label">{label}</label>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default PanelHeader;
