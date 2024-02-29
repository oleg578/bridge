<div layout-padding>
    <h4 class="orange-color">Import Orders</h4>
    <div layout-fill layout="row" layout-align="start end">
        <label for="filechoose" class="input-file-label">
            Choose file
        </label>
        <input name="userfile" id="filechoose" class="input-file" type="file" onchange="inspectInput(event)">
        <span class="input-file-choose"></span>
        <md-button id="upload_btn" class="md-raised md-primary" onclick="startChunk()" disabled>Upload</md-button>
    </div>
    <div class="md-whiteframe-z1">
        <md-content>
            <md-subheader class="md-primary">Upload meter</md-subheader>
            <div id="progress-panel" class="progress-panel" layout="row" layout-padding layout-margin>
            </div>
        </md-content>
    </div>
    <div class="container-fluid info-box">
        <div class="row">
            <div class="col-xs-4">
                <md-subheader class="md-primary">Process Info</md-subheader>
                <div class="alert alert-info process-info-panel" layout="column" layout-padding layout-margin></div>
            </div>
            <div class="col-xs-8">
                <md-subheader class="md-primary">Progress</md-subheader>
                <div class="progress-info-panel" layout="column"></div>
            </div>
        </div>
    </div>
</div>
<div class="orders-error-wrapper ng-hide">
    <div class="alert alert-danger alert-dismissible orders-dir-error" role="alert">
        <button type="button" class="close" id="orders-error-btn"><span aria-hidden="true">&times;</span></button>
        <strong>Error!</strong> Source file is not valid!
    </div>
</div>
<div class="orders-dir-error-wrapper ng-hide">
    <div class="alert alert-danger alert-dismissible orders-error" role="alert">
        <button type="button" class="close" id="orders-dir-error-btn"><span aria-hidden="true">&times;</span></button>
        <strong>Error!</strong> Can't create work dir...
    </div>
</div>
