/**
 * External dependancies
 */
import classnames from "classnames";

const FormRow = ({ className, id, children }) => {
	const uniqueID = id ? `bod-ui__${id}` : "";
	const classNames = classnames("bod-ui__form-row", uniqueID, className);
	return (
		<div className={classNames} id={uniqueID}>
			{children}
		</div>
	);
};

export default FormRow;
