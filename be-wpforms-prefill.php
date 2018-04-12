<?php
/**
 * Plugin Name: BE WPForms Pre-Fill
 * Plugin URI:  https://github.com/billerickson/BE-WPForms-Pre-Fill
 * Description: Uses cookies to pre-fill a form a user has already filled out before
 * Author:      Bill Erickson
 * Author URI:  https://www.billerickson.net
 * Version:     1.0.0
 *
 * BE WPForms Pre-Fill is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * any later version.
 *
 * BE WPForms Pre-Fill is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with BE WPForms Pre-Fill. If not, see <http://www.gnu.org/licenses/>.
 *
 * @package    BE_WPForms_PreFill
 * @author     Bill Erickson
 * @since      1.0.0
 * @license    GPL-2.0+
 * @copyright  Copyright (c) 2017
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Main class
 *
 * @since 1.0.0
 * @package BE_WPFORMS_PREFILL
 */
final class BE_WPForms_PreFill {

	/**
	 * Instance of the class.
	 *
	 * @since 1.0.0
	 * @var object
	 */
	private static $instance;

	/**
	 * Plugin version.
	 *
	 * @since 1.0.0
	 * @var string
	 */
	private $version = '1.0.0';

	/**
	 * Settings
	 *
	 * @since 1.0.0
	 * @var array
	 */
	public $settings = array();

	/**
	 * Class Instance.
	 *
	 * @since 1.0.0
	 * @return BE_WPForms_PreFill
	 */
	public static function instance() {
		if ( ! isset( self::$instance ) && ! ( self::$instance instanceof BE_WPForms_PreFill ) ) {
			self::$instance = new BE_WPForms_PreFill;
			self::$instance->constants();
			self::$instance->load_textdomain();
			add_action( 'init', array( self::$instance, 'init' ) );
		}
		return self::$instance;
	}

	/**
	 * Constants
	 *
	 * @since 1.0.0
	 */
	function constants() {

		// Version
 		define( 'BE_WPFORMS_PREFILL_VERSION', $this->version );

 		// Directory URL
 		define( 'BE_WPFORMS_PREFILL_URL', plugin_dir_url( __FILE__ ) );
	}

	/**
	 * Load Textdomain for translations
	 *
	 * @since 1.1.0
	 */
	function load_textdomain() {

			 load_plugin_textdomain( 'be-wpforms-prefill', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );

	}


	/**
	 * Initialize
	 *
	 * @since 1.0.0
	 */
	function init() {

		add_action( 'wp_enqueue_scripts', array( $this, 'scripts' ) );
      	add_filter( 'wpforms_builder_settings_sections', array( $this, 'settings_section' ), 20, 2 );
        add_filter( 'wpforms_form_settings_panel_content', array( $this, 'settings_section_content' ), 20 );

	}


	/**
	 * Scripts
	 *
	 * @since 1.0.0
	 */
	function scripts() {

		wp_register_script( 'be-wpforms-prefill', BE_WPFORMS_PREFILL_URL . '/assets/js/be-wpforms-prefill-min.js', array( 'jquery' ), BE_WPFORMS_PREFILL_VERSION, true );
 		//wp_localize_script( 'be-like-content', 'BE_WPFORMS_PREFILL', array( 'url' => admin_url( 'admin-ajax.php' ) ) );

	}

   /**
     * Add Settings Section
     *
     */
    function settings_section( $sections, $form_data ) {
        $sections['be_wpforms_prefill'] = __( 'Pre-Fill', 'be-wpforms-prefill' );
        return $sections;
    }
    /**
     * ConvertKit Settings Content
     *
     */
    function settings_section_content( $instance ) {
        echo '<div class="wpforms-panel-content-section wpforms-panel-content-section-be_wpforms_prefill">';
        echo '<div class="wpforms-panel-content-section-title">' . __( 'Pre-Fill', 'be-wpforms-prefill' ) . '</div>';
		wpforms_panel_field(
			'checkbox',
			'settings',
			'be_wpforms_prefill',
			$instance->form_data,
			esc_html__( 'Pre-fill form with previous submission using cookie', 'wpforms' )
		);
        echo '</div>';
    }


	/**
	 * Load Assets
	 *
	 * @since 1.0.0
	 */
	function load_assets() {

		if( apply_filters( 'be_wpforms_prefill_load_assets', true ) ) {

			wp_enqueue_script( 'be-wpforms-prefill' );
		}

	}

}

/**
 * The function provides access to the class methods.
 *
 * Use this function like you would a global variable, except without needing
 * to declare the global.
 *
 * @since 1.0.0
 * @return object
 */
function be_wpforms_prefill() {
	return BE_WPForms_PreFill::instance();
}
be_wpforms_prefill();
