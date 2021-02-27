<?php
/**
 * Plugin Name: WooCommece Bulk Order Delete
 * Plugin URI: https://example.com
 * Description: This is a short description of what the plugin does. It's displayed in the WordPress admin area.
 * Version: 1.0.0
 * Author: Vijay Hardaha
 * Author URI: https://example.com
 * License: GPL-3.0+
 * License URI: http://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: wc-bulk-order-delete
 * Domain Path: /languages/
 *
 * @package WC_Bulk_Order_Delete
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

if ( ! defined( 'WC_BULK_ORDER_DELETE_PLUGIN_FILE' ) ) {
	define( 'WC_BULK_ORDER_DELETE_PLUGIN_FILE', __FILE__ );
}

// Include the main WC_Bulk_Order_Delete class.
if ( ! class_exists( 'WC_Bulk_Order_Delete', false ) ) {
	include_once dirname( __FILE__ ) . '/includes/class-wc-bulk-order-delete.php';
}

/**
 * Returns the main instance of WC_Bulk_Order_Delete.
 *
 * @since  1.0.0
 * @return WC_Bulk_Order_Delete
 */
function wc_bulk_order_delete() {
	return WC_Bulk_Order_Delete::instance();
}

// Global for backwards compatibility.
$GLOBALS['wc_bulk_order_delete'] = wc_bulk_order_delete();
