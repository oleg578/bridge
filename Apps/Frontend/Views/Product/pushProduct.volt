{% if psfound %}
<div layout-padding>
    <h4 class="orange-color">Push Products</h4>
    <div class="alert alert-danger" role="alert"><h4>PUSH is in progress now...</h4></div>
</div>
{% endif %}
{% if cafound %}
<div layout-padding>
    <h4 class="orange-color">Push Products</h4>
    <div class="alert alert-danger" role="alert"><h4>Import from CA is in progress now... PUSH can't be run...</h4></div>
</div>
{% endif %}
{% if not (psfound or cafound) %}
<div class="main-container" layout-padding ng-controller="PushCtrl" ng-cloak>
    <div layout-fill layout="row" layout-align="start end">
        <md-button id="upload_btn" class="md-raised md-primary" ng-click="startPush()" ng-disabled="PushProcessActive">Push to Channel Advisor</md-button>
    </div>
    <div class="alert alert-danger push-progress-msg-box" role="alert" ng-show="PushProcessActiveMsg">
        <span id="push-progress-msg"></span>
    </div>
    <div class="container-fluid info-box">
        <md-subheader class="md-primary">Progress</md-subheader>
        <div layout="row" layout-align="start center" layout-margin layout-padding>
            <div class="push-progress-box">
                <div class="push-progress-box-back"><span id="push-progress"></span></div>
            </div>
            <span id="push-progress-info">0%</span>
        </div>
    </div>
    <div layout="column" layout-align="center center" class="push-info">
        <div class="panel panel-primary hook-apply-progress-panel push-hooks-panel">
          <div class="panel-heading">
            <h3 class="panel-title">Hook apply progress</h3>
          </div>
        </div>
        <div class="alert alert-info" role="alert" ng-show="prepareProcess"><p>Prepare file to push...</p></div>
        <div class="alert alert-success" role="alert" ng-show="CAConnected"><p>Channel Advisor connected...</p></div>
        <div class="alert alert-success" role="alert" ng-show="SendSuccess"><p>Data successfully pushed...</p></div>
        <div class="alert alert-danger" role="alert" ng-show="FtpError"><p>Error! <span id="errorftp"></span></p></div>
    </div>
</div>
{% endif %}
