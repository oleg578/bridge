<!DOCTYPE html>
<html lang="en" ng-app="Bridge">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- Add to homescreen for Chrome on Android -->
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui">
    <title>Bridge</title>
    <link rel="icon" type="image/png" href="/favicon.png">
    {{ assets.outputCss('external') }}
    {{ assets.outputCss('styles') }}
</head>

<body ng-cloak>
    <main layout="column" layout-align="center center" layout-fill>
        {{ content() }}
    </main>
    {{ assets.outputJs('footer_js') }}
</body>
</html>
