<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 *
 * @see craft\config\GeneralConfig
 */

return [
    // Global settings
    '*' => [
        'defaultWeekStartDay' => 0,
        'enableCsrfProtection' => true,
        'omitScriptNameInUrls' => true,
        'cpTrigger' => 'admin',
        'securityKey' => getenv('SECURITY_KEY'),
    ],
    'dev' => [
        'siteUrl' => null,
        'devMode' => true,
    ],
    'staging' => [
        'siteUrl' => null,
    ],
    'production' => [
        'siteUrl' => null,
    ],
];
