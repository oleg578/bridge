<div class="main-container" layout-padding ng-controller="AttrSpec" ng-cloak>
    <h4 class="orange-color">Special Attributes Set</h4>
    <md-button class="md-raised md-primary" ng-click="StartProcess()" ng-disabled="JobStarted">Process</md-button>
    <md-whiteframe class="md-whiteframe-3dp" layout layout-align="start center" layout-margin>
        <h4 class="color-red">The next attributes will be created or updated</h4>
    </md-whiteframe>
    <div ng-show="JobStarted">
        <attributes-progress-panel></attributes-progress-panel>
    </div>
    <div class="alert alert-success" role="alert" ng-show="JobFinished" layout layout-padding layout-margin>Process finished</div>
    <div layout layout-padding>
        <table class="table table-bordered table-condensed">
            <thead>
                <tr>
                    <th>NAME</th>
                    <th>DEFAULT VALUE</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>C_COST_SHIP_AVERAGE</td>
                    <td>AVERAGE SHIPPING COST</td>
                </tr>
                <tr>
                    <td>C_PRICE_EBAY_BREAKEVEN</td>
                    <td>PRICE EBAY BREAKEVEN</td>
                </tr>
                <tr>
                    <td>C_PRICE_FMT</td>
                    <td>PRICEMODULE SALEPRICE</td>
                </tr>
                <tr>
                    <td>C_PRICE_FMT_BREAKEVEN</td>
                    <td>INVENTORY BREAKEVEN</td>
                </tr>
                <tr>
                    <td>C_PRICE_MAP</td>
                    <td>PRICEMODULE PRICE MAP</td>
                </tr>
                <tr>
                    <td>C_PRICE_MAPENABLED</td>
                    <td>PRICEMODULE MAP ENABLED</td>
                </tr>
                <tr>
                    <td>C_PRICE_MSRP</td>
                    <td>INVENTORY MSRP</td>
                </tr>
                <tr>
                    <td>D_MFG_TITLE</td>
                    <td>INVENTORY TITLE</td>
                </tr>
                <tr>
                    <td>C_KIT_OR_SINGLE</td>
                    <td>SET ATTRIBUTE TO 'Single Part' OR 'Kit'</td>
                </tr>
                <tr>
                    <td>C_KIT_INCLUDES</td>
                    <td>SET INCLUDES FOR KIT</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
