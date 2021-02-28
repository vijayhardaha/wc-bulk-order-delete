/**
 * External dependancies
 */
import classnames from "classnames";

const FormField = ({ label, className, id, desc, children }) => {
	const uniqueID = id ? `wc-bulk-delete__${id}` : "";
	const classNames = classnames("wc-bulk-delete__form-field", uniqueID, className);
	return (
		<div className={classNames} id={uniqueID}>
			{label ? <label htmlFor={uniqueID}>{label}</label> : <></>}
			{desc ? <p className="wc-bulk-delete__desc">{desc}</p> : <></>}
			{children}
		</div>
	);
};

export default FormField;
