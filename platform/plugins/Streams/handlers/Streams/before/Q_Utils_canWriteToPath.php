<?php

function Streams_before_Q_Utils_canWriteToPath($params, &$result)
{
	extract($params);
	/**
	 * @var $path
	 * @var $throw_if_not_writeable
	 * @var $mkdir_if_missing
	 */
	
	// Assume that Users/before/Q/Utils/canWriteToPath already executed

	$user = Users::loggedInUser();
	$userId = $user ? $user->id : "";
	$app = Q_Config::expect('Q', 'app');
	$len = strlen(APP_DIR);
	if (substr($path, 0, $len) === APP_DIR) {
		$sp = str_replace(DS, '/', substr($path, $len+1));
		if (substr($sp, -1) === '/') {
			$sp = substr($sp, 0, strlen($sp)-1);
		}
		$prefix = "files/$app/uploads/Streams/";
		$len = strlen($prefix);
		if (substr($sp, 0, $len) === $prefix) {
			$parts = explode('/', substr($sp, $len));
			$c = count($parts);
			if ($c >= 3) {
				$publisherId = $parts[0];
				$l = 0;
				for ($i=$c-1; $i>=1; --$i) {
					$l = $i;
					if ($parts[$i] === 'icon') break;
				}
				$name = implode('/', array_slice($parts, 1, $l-1));
				if ($stream = Streams::fetchOne($userId, $publisherId, $name)) {
					$result = $stream->testWriteLevel('edit');
					Streams::$cache['canWriteToStream'] = $stream;
				}
			}
		}
	}
	if (!$result and $throw_if_not_writeable) {
		throw new Q_Exception_CantWriteToPath();
	}
}
