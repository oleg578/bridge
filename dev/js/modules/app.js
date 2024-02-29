var Bridge = angular.module('Bridge', [
    'angular-loading-bar',
    'ngMaterial',
    'ngMessages',
    'Bridge.NavModule',
    'Bridge.ProductModule',
    'Bridge.AttributeModule',
    'Bridge.LabelModule',
    'Bridge.BundleModule',
    'Bridge.OrderModule'
]);
Bridge.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
}]);
Bridge.filter('merge', function() {
        return function(input) {
            var out;
            input = input || null;
            if (input) {
                out = input.replace(/\s+/g, "").trim().toLowerCase();
            }
            return out;
        };
    });
