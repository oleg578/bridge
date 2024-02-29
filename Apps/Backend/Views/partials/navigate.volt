<div class="nav" ng-controller="AdminNavCtrl" ng-cloak>
    <md-toolbar layout="row" layout-align="space-between center">
        <md-button class="md-icon-button md-primary" aria-label="Menu" ng-click="toggleNav()">
            <md-icon md-svg-icon="/assets/img/icons/ic_menu_36px_white.svg"></md-icon>
        </md-button>
        <h2 class="md-toolbar-tools">
                <a class="main-url" ng-href="/">Bridge</a>
        </h2>
        <section class="user-area" layout="row" layout-align="end center">
            <p class="user-area-email" layout-margin>{{user_nick}}</p>
            <p layout-margin>
                <md-icon md-svg-src="/assets/img/icons/ic_person_48px.svg" aria-label="User" ng-click="login()"></md-icon>
            </p>
        </section>
    </md-toolbar>
    <action-menu></action-menu>
</div>
<div class="user-panel unvisible">
    <md-whiteframe class="md-whiteframe-z1" layout layout-align="center center">
        {%  if user_email %}
        <md-button class="md-primary" ng-href="/session/logout">Log out</md-button>
        {% else %}
            <md-button class="md-primary" ng-href="/session/login">Log in</md-button>
        {% endif %}
    </md-whiteframe>
</div>
