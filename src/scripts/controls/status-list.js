/**
 * WordPress dependancies
 */
import { CheckboxControl } from "@wordpress/components";

const OrderStatusListControl = ({ options, onChange }) => {
	return (
		<ul className="wcbod__checkbox-group">
			{options.map(({ key, value, checked }, i) => {
				return (
					<li key={`${i}-${key}`}>
						<CheckboxControl
							label={value}
							checked={checked ? true : false}
							onChange={(checked) => {
								const updatedStatuses = [...options];
								updatedStatuses[i].checked = checked;
								onChange(updatedStatuses);
							}}
						/>
					</li>
				);
			})}
		</ul>
	);
};

export default OrderStatusListControl;
