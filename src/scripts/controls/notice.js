/**
 * WordPress dependancies
 */

/**
 * External dependancies
 */
import classnames from "classnames";
import {
	MdDone,
	MdClose,
	MdChatBubbleOutline,
	MdErrorOutline,
} from "react-icons/md";

const Notice = ({
	type = "filled",
	status = "info",
	icon = true,
	loading = false,
	children,
}) => {
	const types = ["filled", "outline", "semi-filled", "simple"];
	const statuses = ["error", "info", "success", "warning", "default"];

	const icons = {
		error: <MdClose />,
		info: <MdChatBubbleOutline />,
		default: <MdChatBubbleOutline />,
		success: <MdDone />,
		warning: <MdErrorOutline />,
	};

	status = statuses.includes(status) ? status : "info";
	type = types.includes(type) ? type : "filled";
	icon = loading ? true : icon;

	const classNames = classnames(
		"bod-ui__notice",
		`bod-ui__notice-${type}-${status}`,
		{
			"has-icon": icon,
		}
	);

	const iconControl = loading ? (
		<div class="bod-ui__spinner"></div>
	) : (
		icons[status]
	);

	return (
		<div className={classNames}>
			{icon == true ? (
				<div className="bod-ui__notice-icon">{iconControl}</div>
			) : (
				<></>
			)}
			<div className="bod-ui__notice-content">{children}</div>
		</div>
	);
};

export default Notice;
