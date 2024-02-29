{{ flashSession.output() }}
<section class="md-whiteframe-z2 login-panel">
    {{ form('session/login', 'method': 'post') }}
    <input type="hidden" name="{{ security.getTokenKey() }}" value="{{ security.getToken() }}">
    <md-content layout-padding layout="column">
        <span class="md-title">Login</span>
        <md-input-container flex>
            <label>Email</label>
            <input name="email">
        </md-input-container>
        <md-input-container flex>
            <label>Password</label>
            <input type="password" name="password">
        </md-input-container>
    </md-content>
    <md-content layout-padding layout-margin layout="column" layout-align="center center">
        <md-button class="md-raised md-primary login-btn" type="submit">Log in</md-button>
    </md-content>
    </form>
</section>
<script type="text/javascript">
    var ShowLogin = setTimeout(function() {
        document.querySelector('.login-panel').classList.add('login-panel-show');
        clearTimeout(ShowLogin);
    }, 500);
</script>
