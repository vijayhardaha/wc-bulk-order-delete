<?php
/**
 * WooCommece Bulk Order Delete Admin
 *
 * @class WC_Bulk_Order_Delete_Admin
 * @package WC_Bulk_Order_Delete
 * @subpackage WC_Bulk_Order_Delete/Admin
 * @version 1.0.0
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

if ( class_exists( 'WC_Bulk_Order_Delete_Admin' ) ) {
	return new WC_Bulk_Order_Delete_Admin();
}

/**
 * WC_Bulk_Order_Delete_Admin class.
 */
class WC_Bulk_Order_Delete_Admin {

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_action( 'init', array( $this, 'init' ) );
	}

	/**
	 * Init Admin Class
	 */
	public function init() {
		if ( ! $this->is_allowed_to_delete_shop_order() ) {
			return;
		}

		$this->register_api();

		// Enqueue scripts.
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_scripts' ) );

		// Display button in filter area.
		add_action( 'restrict_manage_posts', array( $this, 'display_button' ), 999 );
	}

	/**
	 * Valid screen ids for plugin scripts & styles
	 *
	 * @return  array
	 */
	public function is_valid_screen() {
		$screen    = get_current_screen();
		$screen_id = $screen ? $screen->id : '';
		return 'edit-shop_order' === $screen_id;
	}

	/**
	 * Enqueue styles.
	 */
	public function enqueue_admin_scripts() {
		// Enqueue for wc_bulk_order_delete pages only.
		if ( $this->is_valid_screen() ) {
			$admin_asset = include wc_bulk_order_delete()->plugin_path() . '/dist/admin.asset.php';

			wp_enqueue_style( 'wc-bulk-order-delete-admin-styles', wc_bulk_order_delete()->plugin_url() . '/dist/admin.css', array( 'wp-components', 'wp-editor' ), $admin_asset['version'] );

			wp_enqueue_script( 'wc-bulk-order-delete-admin', wc_bulk_order_delete()->plugin_url() . '/dist/admin.js', $admin_asset['dependencies'], $admin_asset['version'], true );

			$params = array(
				'admin_url' => admin_url(),
				'ajax_url'  => admin_url( 'admin-ajax.php' ),
			);
			wp_localize_script( 'wc-bulk-order-delete-admin', 'wc_bulk_order_delete_params', $params );

			wp_set_script_translations( 'wc-bulk-order-delete-admin', 'wc-bulk-order-delete' );
		}
	}

	/**
	 * Display delete button.
	 */
	public function display_button() {
		// phpcs:ignore WordPress.Security.NonceVerification
		$post_type = isset( $_GET['post_type'] ) ? sanitize_key( $_GET['post_type'] ) : '';
		if ( 'shop_order' === $post_type ) {
			echo '<div id="wc-bulk-order-delete-root" class="wrap"></div>';
		}
	}

	/**
	 * Register REST API endpoints
	 */
	public function register_api() {
		if ( ! $this->is_allowed_to_delete_shop_order() ) {
			return;
		}
		add_action(
			'rest_api_init',
			function() {
				register_rest_route(
					'wc-bulk-order-delete/v1',
					'/(?P<id>[\d]+)',
					array(
						'methods'             => WP_REST_Server::READABLE,
						'callback'            => array( $this, 'delete_shop_order' ),
						'permission_callback' => array( $this, 'is_allowed_to_delete_shop_order' ),
						'args'                => array(
							'force' => array(
								'default'     => false,
								'type'        => 'boolean',
								'description' => __( 'Whether to bypass trash and force deletion.', 'wc-bulk-order-delete' ),
							),
						),
					)
				);
			}
		);

		add_action(
			'rest_api_init',
			function() {
				register_rest_route(
					'wc-bulk-order-delete/v1',
					'/statuses',
					array(
						'methods'             => WP_REST_Server::READABLE,
						'callback'            => array( $this, 'get_order_statuses' ),
						'permission_callback' => array( $this, 'is_allowed_to_delete_shop_order' ),
					)
				);
			}
		);

		add_action(
			'rest_api_init',
			function() {
				register_rest_route(
					'wc-bulk-order-delete/v1',
					'/orders',
					array(
						'methods'             => WP_REST_Server::CREATABLE,
						'callback'            => array( $this, 'get_orders' ),
						'permission_callback' => array( $this, 'is_allowed_to_delete_shop_order' ),
					)
				);
			}
		);
	}

	/**
	 * Check if has access to delete an shop order.
	 *
	 * @return bool
	 */
	public function is_allowed_to_delete_shop_order() {
		return current_user_can( 'delete_shop_orders' ) && current_user_can( 'delete_others_shop_orders' );
	}

	public function delete_shop_order( $request ) {
		return rest_ensure_response( 'Hello World, this is the WordPress REST API' );
	}

	/**
	 * Return order statuses
	 */
	public function get_order_statuses() {
		return rest_ensure_response( wc_get_order_statuses() );
	}

	/**
	 * Get a collection of orders.
	 *
	 * @param WP_REST_Request $request Full details about the request.
	 * @return WP_Error|WP_REST_Response
	 */
	public function get_orders( $request ) {
		$date_period = isset( $request['date_period'] ) ? $request['date_period'] : '';
		$date_after  = isset( $request['date_after'] ) ? $request['date_after'] : '';
		$date_before = isset( $request['date_before'] ) ? $request['date_before'] : '';

		$args = array(
			'limit'        => 100,
			'offset'       => isset( $request['offset'] ) ? absint( $request['offset'] ) : 0,
			'order'        => 'DESC',
			'orderby'      => 'date',
			'type'         => 'shop_order',
			'date_created' => $this->get_intervals( $date_period, $date_after, $date_before ),
		);

		if ( isset( $request['status'] ) && ! empty( $request['status'] ) ) {
			$args['status'] = (array) $request['status'];
		}

		$orders  = wc_get_orders( $args );
		$objects = array();
		foreach ( $orders as $object ) {
			$data      = array(
				'id'           => $object->get_id(),
				'date'         => $object->get_date_created() ? $object->get_date_created()->date( 'Y-m-d H:i:s' ) : '',
				'status'       => $object->get_status(),
				'status_label' => wc_get_order_status_name( $object->get_status() ),
			);
			$objects[] = $data;
		}

		$response = rest_ensure_response( $objects );

		return $response;
	}

	/**
	 * Returns start and end date interval from the period type
	 *
	 * @param string $type Peroid type.
	 * @param string $start Start date (Default : empty).
	 * @param string $end End date (Default : empty).
	 * @return string
	 */
	private function get_intervals( $type = 'custom-range', $start = '', $end = '' ) {
		$midnight  = strtotime( 'today midnight' );
		$postnight = $midnight + DAY_IN_SECONDS - 1;

		switch ( $type ) {
			case 'today':
				$start_time = $midnight;
				$end_time   = $postnight;
				break;
			case 'yesterday':
				$start_time = $midnight - DAY_IN_SECONDS;
				$end_time   = $start_time + DAY_IN_SECONDS - 1;
				break;
			case 'last-3-days':
				$start_time = $midnight - ( 3 * DAY_IN_SECONDS );
				$end_time   = $midnight - 1;
				break;
			case 'last-7-days':
				$start_time = $midnight - ( 7 * DAY_IN_SECONDS );
				$end_time   = $midnight - 1;
				break;
			case 'last-14-days':
				$start_time = $midnight - ( 14 * DAY_IN_SECONDS );
				$end_time   = $midnight - 1;
				break;
			case 'last-30-days':
				$start_time = $midnight - ( 30 * DAY_IN_SECONDS );
				$end_time   = $midnight - 1;
				break;
			case 'this-month':
				$start_time = strtotime( 'midnight', strtotime( 'first day of this month' ) );
				$end_time   = strtotime( 'midnight', strtotime( 'last day of this month' ) ) + DAY_IN_SECONDS - 1;
				break;
			case 'last-month':
				$start_time = strtotime( 'midnight', strtotime( 'first day of last month' ) );
				$end_time   = strtotime( 'midnight', strtotime( 'last day of last month' ) ) + DAY_IN_SECONDS - 1;
				break;
			case 'last-3-months':
				$start_time = strtotime( 'midnight', strtotime( 'first day of -3 month' ) );
				$end_time   = strtotime( 'midnight', strtotime( 'last day of last month' ) ) + DAY_IN_SECONDS - 1;
				break;
			case 'last-6-months':
				$start_time = strtotime( 'midnight', strtotime( 'first day of -6 month' ) );
				$end_time   = strtotime( 'midnight', strtotime( 'last day of last month' ) ) + DAY_IN_SECONDS - 1;
				break;
			case 'last-12-months':
				$start_time = strtotime( 'midnight', strtotime( 'first day of -12 month' ) );
				$end_time   = strtotime( 'midnight', strtotime( 'last day of last month' ) ) + DAY_IN_SECONDS - 1;
				break;
			case 'this-year':
				$start_time = strtotime( 'midnight', strtotime( gmdate( 'Y-01-01' ) ) );
				$end_time   = strtotime( 'midnight', strtotime( gmdate( 'Y-12-31' ) ) ) + DAY_IN_SECONDS - 1;
				break;
			case 'last-year':
				$last_year  = gmdate( 'Y' ) - 1;
				$start_time = strtotime( 'midnight', strtotime( gmdate( $last_year . '-01-01' ) ) );
				$end_time   = strtotime( 'midnight', strtotime( gmdate( $last_year . '-12-31' ) ) ) + DAY_IN_SECONDS - 1;
				break;
			case 'custom-range':
			default:
				if ( empty( $start ) || empty( $end ) ) {
					$start_time = $midnight;
					$end_time   = $postnight;
				} else {
					$start_time = strtotime( 'midnight', strtotime( $start ) );
					$end_time   = strtotime( 'midnight', strtotime( $end ) ) + DAY_IN_SECONDS - 1;
				}
				break;
		}

		return $start_time . '...' . $end_time;
	}
}

return new WC_Bulk_Order_Delete_Admin();
