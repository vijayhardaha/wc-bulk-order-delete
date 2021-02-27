/**
 * WordPress Dependancies
 */
import { getPath } from "@wordpress/url";

/**
 * External Dependancies
 */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

/**
 * Internal dependancies
 */
import Wrapper from "./components/Wrapper";

const App = () => {
	return (
		<Router basename={getPath(wc_bulk_order_delete_params.admin_url)}>
			<Wrapper />
		</Router>
	);
};

ReactDOM.render(<App />, document.getElementById("wc-bulk-order-delete-root"));
