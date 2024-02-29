<div layout="column" layout-padding>
    <div layout="row" layout-align="space-between center">
        <h4 class="orange-color">Pricefile Orphans Report</h4>
        <md-button class="md-primary" href="/report/nosourcepricefile/csv" target="_blank">Get CSV report</md-button>
    </div>
    <table class="table table-striped table-bordered table-condensed">
            <thead>
                <tr>
                    <th>SKU</th>
                    <th>SKUType</th>
                </tr>
            </thead>
            <tbody>
                {% for row in sales %}
                <tr>
                    <td>{{row.Sku}}</td>
                    <td>{{row.SKUType}}</td>
                </tr>
                {% endfor %}
            </tbody>
    </table>
    <div layout="row" layout-align="start center" class="paginator">
        <nav>
  <ul class="pagination">
    {% if currentpage > 1 %}
        <li>
            <a href="/report/nosourcepricefile/1" aria-label="First">
                <span aria-hidden="true">&Ll;</span>
            </a>
        </li>
        <li>
            <a href="/report/nosourcepricefile/{{previouspage}}" aria-label="Previous">
                <span aria-hidden="true">&Lt;</span>
            </a>
        </li>
        <li class="disabled">
            <a href="" aria-label="fantom">
                <span aria-hidden="true">&hellip;</span>
            </a>
        </li>
    {% endif %}
    <li class="active"><a href="/report/nosourcepricefile/{{currentpage}}">{{currentpage}}</a></li>
    {% if currentpage < lastpage %}
        <li class="disabled">
            <a href="" aria-label="fantom">
                <span aria-hidden="true">&hellip;</span>
            </a>
        </li>
        <li>
            <a href="/report/nosourcepricefile/{{nextpage}}" aria-label="Next">
                <span aria-hidden="true">&Gt;</span>
            </a>
        </li>
        <li>
            <a href="/report/nosourcepricefile/{{lastpage}}" aria-label="Next">
                <span aria-hidden="true">&Gg;</span>
            </a>
        </li>
    {% endif %}
  </ul>
</nav>
    </div>
</div>
