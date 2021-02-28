/**
 * External dependancies
 */
import classnames from "classnames";

const FormRow = ({ className, id, children }) => {
	const uniqueID = id ? `wc-bulk-delete__${id}` : "";
	const classNames = classnames("wc-bulk-delete__form-row", uniqueID, className);
	return (
		<div className={classNames} id={uniqueID}>
			{children}
		</div>
	);
};

export default FormRow;
