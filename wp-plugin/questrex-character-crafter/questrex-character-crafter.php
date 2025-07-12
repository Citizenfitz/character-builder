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
 * Clean asset path by removing any double dots or slashes
 */
function questrex_clean_asset_path($path) {
    // Remove the leading ./ if present
    $path = preg_replace('/^\.\//', '', $path);
    // Remove any double slashes
    $path = preg_replace('#/+#', '/', $path);
    // Ensure path starts with a single slash
    $path = '/' . ltrim($path, '/');
    return $path;
}

/**
 * Get the appropriate base URL for assets based on environment
 */
function questrex_get_asset_base_url() {
    if (QUESTREX_IS_LOCAL) {
        return 'http://localhost:3000';
    }
    return QUESTREX_PLUGIN_URL . 'assets/build';
}

/**
 * Enqueue scripts and styles for the character crafter
 */
function questrex_enqueue_assets() {
    // Only load assets when the shortcode is present
    global $post;
    if (!is_null($post) && has_shortcode($post->post_content, 'questrex-character-crafter')) {
        // Debug output
        error_log('Environment: ' . (QUESTREX_IS_LOCAL ? 'Local Development' : 'WordPress Plugin'));
        error_log('Asset Base URL: ' . questrex_get_asset_base_url());
        
        // Ensure React is loaded
        wp_enqueue_script('wp-element');
        
        // Get the build directory manifest
        $manifest_path = QUESTREX_PLUGIN_DIR . 'assets/build/asset-manifest.json';
        
        if (file_exists($manifest_path)) {
            $manifest = json_decode(file_get_contents($manifest_path), true);
            
            // Create an array to store all chunk handles
            $chunk_handles = array();
            
            // Enqueue all chunk files first
            if (isset($manifest['files']) && is_array($manifest['files'])) {
                foreach ($manifest['files'] as $file => $path) {
                    if (strpos($file, 'chunk.js') !== false) {
                        $handle = 'questrex-chunk-' . basename($file);
                        $chunk_handles[] = $handle;
                        $full_url = questrex_get_asset_base_url() . questrex_clean_asset_path($path);
                        wp_enqueue_script(
                            $handle,
                            $full_url,
                            array('wp-element'),
                            QUESTREX_VERSION,
                            true
                        );
                    }
                }
            }
            
            // Enqueue main CSS
            if (isset($manifest['files']['main.css'])) {
                $css_url = questrex_get_asset_base_url() . questrex_clean_asset_path($manifest['files']['main.css']);
                wp_enqueue_style(
                    'questrex-character-crafter',
                    $css_url,
                    array(),
                    QUESTREX_VERSION
                );
            }
            
            // Enqueue main JS after all chunks
            if (isset($manifest['files']['main.js'])) {
                $js_url = questrex_get_asset_base_url() . questrex_clean_asset_path($manifest['files']['main.js']);
                wp_enqueue_script(
                    'questrex-character-crafter',
                    $js_url,
                    array_merge(array('wp-element'), $chunk_handles),
                    QUESTREX_VERSION,
                    true
                );
                
                // Localize script with necessary data
                wp_localize_script(
                    'questrex-character-crafter',
                    'questRexData',
                    array(
                        'ajaxUrl' => admin_url('admin-ajax.php'),
                        'nonce' => wp_create_nonce('questrex-nonce'),
                        'pluginUrl' => QUESTREX_PLUGIN_URL,
                        'isLocal' => QUESTREX_IS_LOCAL,
                        'isLoggedIn' => is_user_logged_in()
                    )
                );
            }
        } else {
            error_log('Error: Manifest file not found at: ' . $manifest_path);
            if (QUESTREX_IS_LOCAL) {
                error_log('In local development, make sure your React dev server is running on port 3000');
            }
        }
    }
}

/**
 * Register shortcode
 */
function questrex_shortcode() {
    // Ensure assets are loaded
    questrex_enqueue_assets();
    
    ob_start();
    ?>
    <div class="character-crafter-wrapper">
        <div id="questrex-root">
            <div id="questrex-modal-container"></div>
        </div>
    </div>
    <?php
    return ob_get_clean();
}

/**
 * Initialize plugin
 */
function questrex_init() {
    add_shortcode('questrex-character-crafter', 'questrex_shortcode');
    add_action('wp_enqueue_scripts', 'questrex_enqueue_assets');
}

// Initialize
add_action('init', 'questrex_init'); 