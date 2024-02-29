<?php

namespace Apps;

define('DS', DIRECTORY_SEPARATOR);

/*
 * Register an autoloader
 */
$loader = new \Phalcon\Loader();

$loader->registerNamespaces([
    'Apps' => \dirname(__DIR__).DS.'Apps'.DS,
]);

$loader->registerDirs([
    \dirname(__DIR__).DS.'Apps'.DS.'Config'.DS,
]);

$loader->register();
try {
    $application = new App();
    echo $application->main()->handle()->getContent();
} catch (\Exception $e) {
    echo get_class($e), " : <br><span style='color:red'>";
    echo $e->getMessage(), '</span><br><hr>';
    echo ' File : ', $e->getFile(), '<br>';
    echo ' Line : ', $e->getLine(), "<br><pre style='color:blue'>";
    echo $e->getTraceAsString(), '</pre>';
}
