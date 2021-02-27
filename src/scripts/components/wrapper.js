/**
 * WordPress dependancies
 */
import { useState } from "@wordpress/element";

/**
 * Internal dependancies
 */
import DeleteButtonControl from "../controls/delete-button";
import Panel from "./panel";

const Wrapper = () => {
	const [isPanelOpen, setIsPanelOpen] = useState(false);

	const togglePanel = (isButtonClicked) => {
		setIsPanelOpen(isButtonClicked);
	};

	const closePanel = () => {
		setIsPanelOpen(false);
	};

	return (
		<>
			<DeleteButtonControl
				isClicked={isPanelOpen}
				onButtonClick={(clicked) => {
					togglePanel(clicked);
				}}
			/>
			<Panel isPanelOpen={isPanelOpen} closePanel={() => closePanel()} />
		</>
	);
};

export default Wrapper;
