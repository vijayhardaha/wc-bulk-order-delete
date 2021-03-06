/**
 * WordPress dependancies
 */
import { __ } from "@wordpress/i18n";
import { useState, useEffect } from "@wordpress/element";

/**
 * External dependancies
 */
import { FiTrash } from "react-icons/fi";

const DeleteButtonControl = ({ onButtonClick, isClicked = false }) => {
	const [clicked, setState] = useState(isClicked);

	// Keep state synced with props.
	useEffect(() => {
		setState(clicked);
	}, [isClicked]);

	return (
		<a
			className="button bod-ui__button is-destructive"
			type="button"
			onClick={() => {
				const isOpen = !clicked;
				setState(clicked);
				onButtonClick(isOpen);
			}}
		>
			<span className="icon">
				<FiTrash />
			</span>
			<span className="text">{__("Bulk Delete", "wc-bulk-order-delete")}</span>
		</a>
	);
};

export default DeleteButtonControl;
