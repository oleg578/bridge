<!DOCTYPE html>
<html lang="en" ng-app="Bridge">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv='x-dns-prefetch-control' content='on'>
    <link rel='dns-prefetch' href='https://fonts.googleapis.com'>
    <link rel='dns-prefetch' href='https://fonts.gstatic.com'>
    <link rel='dns-prefetch' href='https://maxcdn.bootstrapcdn.com'>
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui">
    <title>Bridge Service</title>
    <link rel="icon" type="image/png" href="/assets/img/favicon.png">
    <script src="https://use.fontawesome.com/c21388e313.js"></script>
    {{ assets.outputCss('external') }}
    {{ assets.outputCss('styles') }}
</head>
<body ng-cloak>
    <main layout="column" data-user-role="{{user_role}}">
        {{ partial("partials/navigate") }}
        {{ content() }}
    </main>
    <footer layout="column" layout-align="center center">
        <a ng-href="/">Bridge Service</a>
    </footer>
    {{ assets.outputJs('footer_js') }}
</body>
</html>
