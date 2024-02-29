{% if psfound %}
<div layout-padding>
    <h4 class="orange-color">Import Products</h4>
    <div class="alert alert-danger" role="alert">
        <h4>CAPARSER is in progress now...</h4>
    </div>
</div>
{% endif %} {% if pushfound %}
<div layout-padding>
    <h4 class="orange-color">Import Products</h4>
    <div class="alert alert-danger" role="alert">
        <h4>PUSH is in progress now... Import cannot be run...</h4>
    </div>
</div>
{% endif %} {% if not (psfound or pushfound) %}
<div layout-padding>
    <h4 class="orange-color">Import Products</h4>
    <div layout-fill layout="row" layout-align="start end">
        <label for="filechoose" class="input-file-label">
            Choose file
        </label>
        <input name="userfile" id="filechoose" class="input-file" type="file" onchange="inspectInput(event)">
        <span class="input-file-choose"></span>
        <md-button id="upload_btn" class="md-raised md-primary" onclick="startChunk()" disabled>Upload</md-button>
    </div>
    <div class="container-fluid">
        <div class="md-whiteframe-z1">
            <md-content>
                <md-subheader class="md-primary">Upload meter</md-subheader>
                <div id="progress-panel" class="progress-panel" layout="row" layout-padding layout-margin>
                </div>
            </md-content>
        </div>
    </div>
    <!-- alert error -->
    <div class="container-fluid">
        <div class="alert alert-danger alert-dismissible ng-hide" role="alert" id="alert-box-container">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <span id="alert-box"></span>
        </div>
    </div>
    <!-- alert error -->
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
{% endif %}
<div class="zip-bundle-error-wrapper ng-hide">
    <div class="alert alert-danger alert-dismissible zip-bundle-dir-error" role="alert">
        <button type="button" class="close" id="zip-bundle-error-btn">
            <span aria-hidden="true">&times;</span>
        </button>
        <strong>Error!</strong> ZIP file is not valid!
    </div>
</div>
<div class="zip-bundle-dir-error-wrapper ng-hide">
    <div class="alert alert-danger alert-dismissible zip-bundle-error" role="alert">
        <button type="button" class="close" id="zip-bundle-dir-error-btn">
            <span aria-hidden="true">&times;</span>
        </button>
        <strong>Error!</strong>
        <span>&nbsp;</span>
        <span id="caparser-errmsg">Can't create work dir...</span>
    </div>
</div>