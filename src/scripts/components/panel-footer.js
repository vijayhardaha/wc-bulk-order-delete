/**
 * WordPress dependancies
 */
import { __ } from "@wordpress/i18n";
import { Button } from "@wordpress/components";

/**
 * Internal dependancies
 */
import { TEXT_DOMAIN } from "../utils/constants";

/**
 * External dependancies
 */
import { FiFilter, FiArrowLeft, FiX } from "react-icons/fi";

const PanelFooter = ({ filterOrders, resetFilters }) => {
	return (
		<>
			<div className="wcbod__panel-footer">
				<Button onClick={() => filterOrders()}>
					<span className="icon">
						<FiFilter />
					</span>
					<span class="text">{__("Filter Orders", TEXT_DOMAIN)}</span>
				</Button>
				<Button className="alt" onClick={() => resetFilters()}>
					<span className="icon">
						<FiX />
					</span>
					<span className="text">{__("Reset Filters", TEXT_DOMAIN)}</span>
				</Button>
			</div>
		</>
	);
};

export default PanelFooter;
