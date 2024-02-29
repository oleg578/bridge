<!DOCTYPE html>
<html lang="en" ng-app="Admin">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- Add to homescreen for Chrome on Android -->
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui">
    <title>Bridge Admin Panel</title>
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
    {{ assets.outputJs('footer_js') }}
</body>

</html>
