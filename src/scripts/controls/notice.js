/**
 * WordPress dependancies
 */
import { Spinner } from "@wordpress/components";

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
		"wcbod__notice",
		`wcbod__notice-${type}-${status}`,
		{
			"has-icon": icon,
		}
	);

	const iconControl = loading ? <Spinner /> : icons[status];

	return (
		<div className={classNames}>
			<div className="wcbod__notice-inner">
				{icon == true ? (
					<div className="wcbod__notice-icon">{iconControl}</div>
				) : (
					<></>
				)}
				<div className="wcbod__notice-content">{children}</div>
			</div>
		</div>
	);
};

export default Notice;
