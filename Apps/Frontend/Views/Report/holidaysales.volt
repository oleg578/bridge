<div layout="column" layout-padding>
    <h4 class="orange-color">Holiday Sales</h4>
    <form method="post" action="/report/holidaysales" layout="row" layout-align="space-between center" id="holidaysales-form">
        <input type="hidden" name="{{ security.getTokenKey() }}" value="{{ security.getToken() }}">
        <span>Choose Location ID</span>
        <label class="radio-inline">
            <input type="radio" name="location" value="1" checked> 1
        </label>
        <label class="radio-inline">
            <input type="radio" name="location" value="2"> 2
        </label>
        <button class="btn btn-primary genbtn" type="submit">Build CSV</button>
    </form>
    <div id="infobox">
        {{ flashSession.output() }}
    </div>
</div>
