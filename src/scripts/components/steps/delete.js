/**
 * WordPress dependancies
 */
import { __, _n, sprintf } from "@wordpress/i18n";
import { Button } from "@wordpress/components";
import { useEffect, RawHTML } from "@wordpress/element";

/**
 * External dependancies
 */
import { CgArrowLeft } from "react-icons/cg";

/**
 * Internal dependancies
 */
import { TEXT_DOMAIN } from "../../utils/constants";
import Notice from "../../controls/notice";

const DeleteStep = ({ loading, orders, reset, setLoading }) => {
	const deleteOrders = async () => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 5000);
	};

	useEffect(() => {
		deleteOrders();
	}, []);

	return loading ? (
		<div className="bod-ui__panel-body">
			<Notice status="warning" type="filled">
				{__(
					"Bulk delete process is currently running. You need to keep this page open for the process to complete.",
					TEXT_DOMAIN
				)}
			</Notice>
			<div class="bod-ui__progress-wrapper">
				<div class="bod-ui__progress-block">
					<div class="bod-ui__progress">
						<span class="bod-ui__progress-icon" aria-hidden="true">
							<div class="bod-ui__spinner colored"></div>
						</span>
						<div class="bod-ui__progress-text">
							<span>100%</span>
						</div>
						<div class="bod-ui__progress-bar">
							<span></span>
						</div>
					</div>
					<Button className="bod-ui__progress-close" type="button">
						{__("Cancel", TEXT_DOMAIN)}
					</Button>
				</div>
				<div class="bod-ui__progress-state">
					<span class="bod-ui__progress-state-item">
						<span>Deleting: #10001</span>
					</span>
					<span class="bod-ui__progress-state-text">
						<span>2</span>/<span>2</span> orders deleted.
					</span>
				</div>
			</div>
		</div>
	) : (
		<>
			<div className="bod-ui__panel-body"></div>
			<div className="bod-ui__panel-footer">
				<Button onClick={() => reset()}>
					<span className="icon">
						<CgArrowLeft />
					</span>
					<span className="text">{__("Go to Search", TEXT_DOMAIN)}</span>
				</Button>
			</div>
		</>
	);
};

export default DeleteStep;
