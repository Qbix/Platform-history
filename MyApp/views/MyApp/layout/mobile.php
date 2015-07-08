<!DOCTYPE html>
<html <?php echo Q_Response::htmlAttributes() ?>>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<?php echo Q_Response::metas(true, "\n\t") ?>
	<meta name="HandheldFriendly" content="True" />
	<meta name="viewport" content="minimal-ui, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0<?php if (Q_Request::platform() == 'android'): ?>, target-densitydpi=medium-dpi<?php endif ?>" />
	<meta name="mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-title" content="Groups">
	<meta name="mobile-web-app-capable" content="yes">
	<?php if (Q_Request::platform() !== 'android'): ?>
	<link rel="apple-touch-icon-precomposed" sizes="76x76" href="<?php echo Q_Html::themedUrl('img/icon/76.png') ?>" />
	<link rel="apple-touch-icon-precomposed" sizes="120x120" href="<?php echo Q_Html::themedUrl('img/icon/120.png') ?>" />
	<link rel="apple-touch-icon-precomposed" sizes="152x152" href="<?php echo Q_Html::themedUrl('img/icon/152.png') ?>" />
	<link rel="apple-touch-icon-precomposed" sizes="180x180" href="<?php echo Q_Html::themedUrl('img/icon/180.png') ?>" />
	<?php endif; ?>
	<link rel="shortcut icon" sizes="196x196" href="<?php echo Q_Html::themedUrl('img/icon/196.png') ?>" />
	<?php if (Q_Request::platform() === 'android'): ?>
		<?php foreach (array(36, 48, 72, 96, 144, 192) as $size): ?>
			<link rel="icon" sizes="<?php echo $size.'x'.$size ?>" href="<?php echo Q_Html::themedUrl("img/icon/android-icon-{$size}x{$size}.png") ?>" />
		<?php endforeach; ?>
	<?php endif; ?>
	<meta name="msapplication-square70x70logo" content="<?php echo Q_Html::themedUrl('img/icon/70.png') ?>">
	<meta name="msapplication-square150x150logo" content="<?php echo Q_Html::themedUrl('img/icon/150.png') ?>">
	<meta name="msapplication-square310x310logo" content="<?php echo Q_Html::themedUrl('img/icon/150.png') ?>">
	<meta name="msapplication-TileColor" content="#ffffff">
	<meta name="msapplication-TileImage" content="<?php echo Q_Html::themedUrl('img/icon/144.png') ?>">

	<title><?php echo $title; ?></title>
	<link rel="shortcut icon" href="<?php echo Q_Request::baseUrl() ?>/favicon.ico" type="image/x-icon">
	
	<script type="text/javascript">
		document.getElementsByTagName('html')[0].className += ' Q_js'; // better than noscript
	</script>

	<!-- scripts have been moved to the bottom of the body -->
	<?php echo Q_Response::stylesheets(true, "\n\t") ?> 
	<?php echo Q_Response::styles(true, "\n\t") ?> 
</head>
<body>
	<div id="dashboard_slot">
<!-- - - - - - - - - - - - - begin dashboard slot- - - - - - - - - - - - - - - - -->
<?php echo $dashboard ?> 
<!-- - - - - - - - - - - - - - end dashboard slot- - - - - - - - - - - - - - - - -->
	</div>
	<div id="page">
		<div id="notices_slot">
<!-- - - - - - - - - - - - - - begin notices slot- - - - - - - - - - - - - - - - -->
<?php echo $notices ?> 
<!-- - - - - - - - - - - - - - end dashboard_slot- - - - - - - - - - - - - - - - -->
		</div>
		<div id="content_slot">
<!-- - - - - - - - - - - - - - begin content slot- - - - - - - - - - - - - - - - -->
<?php echo $content; ?> 
<!-- - - - - - - - - - - - - - - end content slot- - - - - - - - - - - - - - - - -->
		</div>
		<div id="dialogs_slot">
<!-- - - - - - - - - - - - - - begin dialogs slot- - - - - - - - - - - - - - - - -->
<?php echo $dialogs; ?> 
<!-- - - - - - - - - - - - - - - end dialogs slot- - - - - - - - - - - - - - - - -->
		</div>
	</div>
	<?php echo Q_Response::scripts(true, "\n\t") ?> 
	<?php echo Q_Response::templates(true, "\n\t") ?> 
	<?php echo Q_Response::scriptLines(true) ?> 
</body>
</html>
