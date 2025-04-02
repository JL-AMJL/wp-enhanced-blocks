<?php
/**
 * Plugin Name: Custom Block Enhancer
 * Description: Fügt Core-Blöcken wie Gruppe Position & Z-Index-Einstellungen hinzu.
 * Version: 1.0
 */

function cbe_enqueue_block_editor_assets() {
    wp_enqueue_script(
        'cbe-editor-script',
        plugin_dir_url(__FILE__) . 'build/position-control.js',
        [ 'wp-blocks', 'wp-element', 'wp-components', 'wp-compose', 'wp-editor', 'wp-edit-post', 'wp-block-editor' ],
        filemtime(plugin_dir_path(__FILE__) . 'build/position-control.js'),
        true
    );
    
    wp_enqueue_style(
        'wp-enhanced-blocks-editor-style',
        plugins_url( 'editor.css', __FILE__ ),
        array(),
        filemtime( plugin_dir_path( __FILE__ ) . 'editor.css' )
    );
    
}
add_action('enqueue_block_editor_assets', 'cbe_enqueue_block_editor_assets');

function cbe_enqueue_block_styles() {
    wp_enqueue_style(
        'cbe-block-style',
        plugin_dir_url(__FILE__) . 'css/block-style.css'
    );
}
add_action('enqueue_block_assets', 'cbe_enqueue_block_styles');
