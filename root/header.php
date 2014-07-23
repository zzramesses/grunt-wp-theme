<?php
/**
 * The template for displaying the header.
 *
 * @package {%= title %}
 * @since 0.1.0
 */
 ?>
 <!DOCTYPE html>
<head>
	<meta charset="<?php bloginfo('charset'); ?>">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<title><?php bloginfo('name'); ?> <?php wp_title('-',true); ?></title>
	<link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/images/favicon.png" />
		<?php wp_head(); ?>
</head>
<body <?php body_class();?>>