/**
 * External dependancies
 */
import classnames from "classnames";

const FormRow = ({ className, id, children }) => {
	const uniqueID = id ? `wcbod__${id}` : "";
	const classNames = classnames("wcbod__form-row", uniqueID, className);
	return (
		<div className={classNames} id={uniqueID}>
			{children}
		</div>
	);
};

export default FormRow;
