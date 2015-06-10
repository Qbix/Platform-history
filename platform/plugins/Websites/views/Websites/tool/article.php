<div class="Websites_side_column">
	<?php echo Q::tool('Streams/image/preview', array(
		'publisherId' => $article->publisherId,
		'streamName' => $article->name,
		'creatable' => array(
			'clickable' => false
		),
		'imagepicker' => array(
			'showSize' => '200x',
			'saveSizeName' => array(
				'40' => '40',
				'50' => '50',
				'200x' => '200x'
			)
		),
		'actions' => null
	), 'article') ?>
	<?php if ($getintouch and ($edit or $article->getintouch)): ?>
		<?php echo Q::tool('Users/getintouch', $getintouch) ?>
	<?php endif; ?>
	<?php if ($edit): ?>
		<?php echo Q_Html::form(Q_Request::baseUrl('action.php').'/Websites/article', 'put',
			array('class' => 'Websites_getintouch')
		) ?>
			<?php echo Q::view('Websites/tool/getintouch.php', compact('article', 'getintouch')) ?>
		</form>
	<?php endif; ?>
</div>
<?php echo Q::tool("Streams/html", array_merge(array(
	'publisherId' => $article->publisherId,
	'streamName' => $article->name,
	'field' => 'article',
	'placeholder' => 'Enter content here'
), $html), 'article') ?>