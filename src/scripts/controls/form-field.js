/**
 * External dependancies
 */
import classnames from "classnames";

const FormField = ({ label, className, id, desc, children }) => {
	const uniqueID = id ? `wcbod__${id}` : "";
	const classNames = classnames("wcbod__form-field", uniqueID, className);
	return (
		<div className={classNames} id={uniqueID}>
			{label ? <label htmlFor={uniqueID}>{label}</label> : <></>}
			{desc ? <p className="wcbod__desc">{desc}</p> : <></>}
			{children}
		</div>
	);
};

export default FormField;
