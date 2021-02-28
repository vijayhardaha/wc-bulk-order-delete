/**
 * External dependancies
 */
import Skeleton from "react-loading-skeleton";

const Placeholder = () => {
	return (
		<>
			<div class="bod-ui__filter-settings bod-ui__skeleton">
				<div class="bod-ui__form-row bod-ui__date-period-row">
					<div class="bod-ui__form-field bod-ui__date-period">
						<div>
							<Skeleton height={18} width={120} />
						</div>
						<div>
							<Skeleton height={12} width={276} />
						</div>
						<div>
							<Skeleton height={30} width={276} style={{ marginTop: 8 }} />
						</div>
					</div>
				</div>
				<div class="bod-ui__form-row bod-ui__custom-date-range-row">
					<div class="bod-ui__form-field bod-ui__date-after">
						<div>
							<Skeleton height={18} width={54} />
						</div>
						<div>
							<Skeleton height={30} width={144} style={{ marginTop: 8 }} />
						</div>
					</div>
					<div class="bod-ui__form-field bod-ui__date-before">
						<div>
							<Skeleton height={18} width={54} />
						</div>
						<div>
							<Skeleton height={30} width={144} style={{ marginTop: 8 }} />
						</div>
					</div>
				</div>
				<div class="bod-ui__form-row bod-ui__order-status-row">
					<div class="bod-ui__form-field bod-ui__order-status">
						<div>
							<Skeleton height={18} width={68} />
						</div>
						<div>
							<Skeleton height={12} />
						</div>
						<div>
							<Skeleton height={12} width={144} />
						</div>
						<ul class="bod-ui__checkbox-group">
							<li>
								<Skeleton height={16} width={16} style={{ marginRight: 5 }} />
								<Skeleton height={12} width={93} />
							</li>
							<li>
								<Skeleton height={16} width={16} style={{ marginRight: 5 }} />
								<Skeleton height={12} width={80} />
							</li>
							<li>
								<Skeleton height={16} width={16} style={{ marginRight: 5 }} />
								<Skeleton height={12} width={70} />
							</li>
							<li>
								<Skeleton height={16} width={16} style={{ marginRight: 5 }} />
								<Skeleton height={12} width={98} />
							</li>
							<li>
								<Skeleton height={16} width={16} style={{ marginRight: 5 }} />
								<Skeleton height={12} width={68} />
							</li>
							<li>
								<Skeleton height={16} width={16} style={{ marginRight: 5 }} />
								<Skeleton height={12} width={76} />
							</li>
							<li>
								<Skeleton height={16} width={16} style={{ marginRight: 5 }} />
								<Skeleton height={12} width={90} />
							</li>
							<li>
								<Skeleton height={16} width={16} style={{ marginRight: 5 }} />
								<Skeleton height={12} width={86} />
							</li>
							<li>
								<Skeleton height={16} width={16} style={{ marginRight: 5 }} />
								<Skeleton height={12} width={80} />
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};

export default Placeholder;
