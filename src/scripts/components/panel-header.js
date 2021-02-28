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
			<div className="bod-ui__panel-header">
				<div className="bod-ui__steps">
					<div className="bod-ui__bar">
						<div className="bod-ui__bar-fill" style={styles}></div>
					</div>
					{STEPS.map(({ number, label }, i) => {
						const classNames = classnames("bod-ui__point", {
							"bod-ui__point-complete": step > number,
							"bod-ui__point-active": step == number,
						});

						const bullet = step > number ? <HiCheck /> : number;

						return (
							<div key={`bod-ui__point-${i}-${number}`} className={classNames}>
								<div className="bod-ui__bullet">{bullet}</div>
								<label className="bod-ui__label">{label}</label>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default PanelHeader;
