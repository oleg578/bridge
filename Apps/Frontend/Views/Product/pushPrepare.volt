<div class="main-container" layout-padding ng-controller="PushPrepCtrl" ng-cloak>
    <h4 class="orange-color">Product fields &amp; attributes set</h4>
    <div layout-fill layout="row" layout-align="start end">
        <md-button class="md-raised md-primary" ng-click="Save()">Save</md-button>
    </div>
    <div class="set-container" layout="row" layout-align="start start" layout-padding>
        <md-whiteframe class="md-whiteframe-1dp product-fields-box">
            <md-subheader class="md-primary">Product fields</md-subheader>
            <product-fields></product-fields>
        </md-whiteframe>
        <md-whiteframe class="md-whiteframe-1dp attributes-fields-box">
            <md-subheader class="md-primary">Attributes</md-subheader>
            <attributes-fields></attributes-fields>
        </md-whiteframe>
    </div>
    <div layout-fill layout="row" layout-align="start end">
        <md-button class="md-raised md-primary" ng-click="Save()">Save</md-button>
    </div>
</div>
