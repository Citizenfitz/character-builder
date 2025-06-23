<?php
/**
 * Plugin Name: QuestRex Character Builder
 * Plugin URI: https://citizenfitz.com
 * Description: Character builder application for QuestRex RPG
 * Version: 1.0.0
 * Author: CitizenFitz
 * Author URI: https://citizenfitz.com
 * Text Domain: questrex-character-builder
 */

// If this file is called directly, abort.
if (!defined('WPINC')) {
    die;
}

// Define plugin constants
define('QUESTREX_VERSION', '1.0.0');
define('QUESTREX_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('QUESTREX_PLUGIN_URL', plugin_dir_url(__FILE__));

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
    // Debug output
    error_log('Cleaning asset path: ' . $path);
    return $path;
}

/**
 * Enqueue scripts and styles for the character builder
 */
function questrex_enqueue_assets() {
    // Only load assets when the shortcode is present
    global $post;
    if (!is_null($post) && has_shortcode($post->post_content, 'questrex-character-builder')) {
        // Debug output
        error_log('Plugin URL: ' . QUESTREX_PLUGIN_URL);
        error_log('Plugin Dir: ' . QUESTREX_PLUGIN_DIR);
        
        // Ensure React is loaded
        wp_enqueue_script('wp-element');
        
        // Get the build directory manifest
        $manifest_path = QUESTREX_PLUGIN_DIR . 'assets/build/asset-manifest.json';
        error_log('Manifest path: ' . $manifest_path);
        
        if (file_exists($manifest_path)) {
            $manifest = json_decode(file_get_contents($manifest_path), true);
            error_log('Manifest loaded: ' . print_r($manifest, true));
            
            // Create an array to store all chunk handles
            $chunk_handles = array();
            
            // Enqueue all chunk files first
            foreach ($manifest['files'] as $file => $path) {
                if (strpos($file, 'chunk.js') !== false) {
                    $handle = 'questrex-chunk-' . basename($file);
                    $chunk_handles[] = $handle;
                    $full_url = QUESTREX_PLUGIN_URL . 'assets/build' . questrex_clean_asset_path($path);
                    error_log('Enqueuing chunk: ' . $full_url);
                    wp_enqueue_script(
                        $handle,
                        $full_url,
                        array('wp-element'),
                        QUESTREX_VERSION,
                        true
                    );
                }
            }
            
            // Enqueue main CSS
            if (isset($manifest['files']['main.css'])) {
                $css_url = QUESTREX_PLUGIN_URL . 'assets/build' . questrex_clean_asset_path($manifest['files']['main.css']);
                error_log('Enqueuing CSS: ' . $css_url);
                wp_enqueue_style(
                    'questrex-character-builder',
                    $css_url,
                    array(),
                    QUESTREX_VERSION
                );
            }
            
            // Enqueue main JS after all chunks
            if (isset($manifest['files']['main.js'])) {
                $js_url = QUESTREX_PLUGIN_URL . 'assets/build' . questrex_clean_asset_path($manifest['files']['main.js']);
                error_log('Enqueuing main JS: ' . $js_url);
                wp_enqueue_script(
                    'questrex-character-builder',
                    $js_url,
                    array_merge(array('wp-element'), $chunk_handles),
                    QUESTREX_VERSION,
                    true
                );
                
                // Localize script with necessary data
                wp_localize_script(
                    'questrex-character-builder',
                    'questRexData',
                    array(
                        'ajaxUrl' => admin_url('admin-ajax.php'),
                        'nonce' => wp_create_nonce('questrex-nonce'),
                        'pluginUrl' => QUESTREX_PLUGIN_URL,
                        'isLoggedIn' => is_user_logged_in()
                    )
                );
            }
        } else {
            error_log('Manifest file not found at: ' . $manifest_path);
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
    <div class="character-builder-wrapper">
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
    add_shortcode('questrex-character-builder', 'questrex_shortcode');
    add_action('wp_enqueue_scripts', 'questrex_enqueue_assets');
}

// Initialize
add_action('init', 'questrex_init'); 