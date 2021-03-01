/**
 * WordPress dependancies
 */

/**
 * External dependancies
 */
import classnames from "classnames";
import { FiCheckCircle, FiAlertCircle, FiInfo } from "react-icons/fi";

const Notice = ({ type = "", loading = false, children }) => {
	const types = ["error", "info", "success", "warning"];

	const icons = {
		error: <FiAlertCircle />,
		info: <FiInfo />,
		success: <FiCheckCircle />,
		warning: <FiInfo />,
	};

	const typeClass = types.includes(type) ? `bod-ui__notice-${type}` : "";
	const classNames = classnames("bod-ui__notice", typeClass);

	const iconControl = loading ? (
		<div class="bod-ui__spinner"></div>
	) : typeof icons[type] !== undefined ? (
		icons[type]
	) : (
		<FiInfo />
	);

	return (
		<div className={classNames}>
			<div className="bod-ui__notice-icon">{iconControl}</div>
			<div className="bod-ui__notice-content">{children}</div>
		</div>
	);
};

export default Notice;
