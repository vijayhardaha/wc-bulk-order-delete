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
			<div className="wcbod__panel-header">
				<div className="wcbod__steps">
					<div className="wcbod__bar">
						<div className="wcbod__bar-fill" style={styles}></div>
					</div>
					{STEPS.map(({ number, label }, i) => {
						const classNames = classnames("wcbod__point", {
							"wcbod__point-complete": step > number,
							"wcbod__point-active": step == number,
						});

						const bullet = step > number ? <HiCheck /> : number;

						return (
							<div key={`wcbod__point-${i}-${number}`} className={classNames}>
								<div className="wcbod__bullet">{bullet}</div>
								<label className="wcbod__label">{label}</label>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default PanelHeader;
