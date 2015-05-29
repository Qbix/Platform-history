<?php

/**
 * Q Tools
 * @module Q-tools
 * @main Q-tools
 */
	
/**
 * Tool for admins to edit the url, title, keywords, description of the current page
 * @class Websites seo
 * @constructor
 * @param {Object} [options] Options for the tool
 * @param {String} [options.skipIfNotAuthorized=true] Whether to skip rendering the contents of the tool if the logged-in user is not authorized to edit the SEO information for this page.
 */
function Websites_seo_tool($options)
{
	$hideIfNotAuthorized = Q::ifset($options, 'skipIfNotAuthorized', true);
	if ($hideIfNotAuthorized) {
		$websitesUserId = Q_Config::expect("Websites", "user", "id");
		$sha1 = sha1(Q_Dispatcher::uri());
		$seoStreamName = "Websites/seo/$sha1";
		$stream = Streams::fetchOne(null, $websitesUserId, $seoStreamName);
		if (!$stream or !$stream->testWriteLevel('suggest')) {
			$options['skip'] = true;
		}
	}
	
	Q_Response::addStylesheet('plugins/Websites/css/Websites.css');
	Q_Response::addScript("plugins/Websites/js/Websites.js");
	Q_Response::setToolOptions($options);
}