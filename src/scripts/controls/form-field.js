/**
 * External dependancies
 */
import classnames from "classnames";

const FormField = ({ label, className, id, desc, children }) => {
	const uniqueID = id ? `bod-ui__${id}` : "";
	const classNames = classnames("bod-ui__form-field", uniqueID, className);
	return (
		<div className={classNames} id={uniqueID}>
			{label ? <label htmlFor={uniqueID}>{label}</label> : <></>}
			{desc ? <p className="bod-ui__desc">{desc}</p> : <></>}
			{children}
		</div>
	);
};

export default FormField;
