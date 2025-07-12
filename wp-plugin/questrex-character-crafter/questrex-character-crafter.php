<?php
/**
 * Plugin Name: QuestRex Character Crafter
 * Plugin URI: https://citizenfitz.com
 * Description: Character Crafter application for QuestRex RPG
 * Version: 1.0.0
 * Author: CitizenFitz
 * Author URI: https://citizenfitz.com
 * Text Domain: questrex-character-crafter
 */

// If this file is called directly, abort.
if (!defined('WPINC')) {
    die;
}

// Define plugin constants
define('QUESTREX_VERSION', '1.0.0');
define('QUESTREX_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('QUESTREX_PLUGIN_URL', plugin_dir_url(__FILE__));

// Define environment
define('QUESTREX_IS_LOCAL', 
    (!empty($_SERVER['HTTP_HOST']) && strpos($_SERVER['HTTP_HOST'], 'localhost') !== false) || 
    (!empty($_SERVER['SERVER_NAME']) && strpos($_SERVER['SERVER_NAME'], 'localhost') !== false)
);

/**
 * Initialize plugin
 */
function questrex_init() {
    add_shortcode('questrex-character-crafter', 'questrex_shortcode');
    add_action('wp_enqueue_scripts', 'questrex_enqueue_assets');
}

/**
 * Register shortcode
 */
function questrex_shortcode() {
    return '<div id="questrex-root"></div>';
}

/**
 * Enqueue scripts and styles
 */
function questrex_enqueue_assets() {
    if (!is_admin()) {
        wp_enqueue_script('wp-element');
        
        // Get manifest
        $manifest_path = QUESTREX_PLUGIN_DIR . 'assets/build/asset-manifest.json';
        if (file_exists($manifest_path)) {
            $manifest = json_decode(file_get_contents($manifest_path), true);
            
            // Enqueue CSS
            if (isset($manifest['files']['main.css'])) {
                wp_enqueue_style(
                    'questrex-character-crafter',
                    QUESTREX_PLUGIN_URL . 'assets/build/' . ltrim($manifest['files']['main.css'], '/'),
                    array(),
                    QUESTREX_VERSION
                );
            }
            
            // Enqueue JS
            if (isset($manifest['files']['main.js'])) {
                wp_enqueue_script(
                    'questrex-character-crafter',
                    QUESTREX_PLUGIN_URL . 'assets/build/' . ltrim($manifest['files']['main.js'], '/'),
                    array('wp-element'),
                    QUESTREX_VERSION,
                    true
                );
            }
        }
    }
}

// Initialize
add_action('init', 'questrex_init'); 