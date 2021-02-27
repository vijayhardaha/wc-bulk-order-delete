<?php

/**
 * Remove SKU data from print
 *
 * @param array $fields Extra fields array.
 * @return array
 */
function pizza_express_wcdn_additional_product_fields( $fields ) {
	if ( isset( $fields['sku'] ) ) {
		unset( $fields['sku'] );
	}

	return $fields;
}
add_filter( 'wcdn_order_item_fields', 'pizza_express_wcdn_additional_product_fields', 20 );