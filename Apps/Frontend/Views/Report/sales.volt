<div layout="column" layout-padding>
    <div layout="row" layout-align="space-between center">
        <h4 class="orange-color">General Sales Report</h4>
        <md-button class="md-primary" href="/report/sales/csv" target="_blank">Get CSV report</md-button>
    </div>
    <table class="table table-striped table-bordered table-condensed">
            <thead>
                <tr>
                    <th>Order Id</th>
                    <th>Site Name</th>
                    <th>Buyer Email Address</th>
                    <th>Buyer First Name</th>
                    <th>Buyer Last Name</th>
                    <th>Buyer Company</th>
                    <th>Shipping Date</th>
                    <th>Tracking Number</th>
                </tr>
            </thead>
            <tbody>
                {% for row in sales %}
                <tr>
                    <td>{{row.orderid}}</td>
                    <td>{{row.sitename}}</td>
                    <td>{{row.buyeremailaddress}}</td>
                    <td>{{row.buyerfirstname}}</td>
                    <td>{{row.buyerlastname}}</td>
                    <td>{{row.buyercompany}}</td>
                    <td>{{row.shippingdate}}</td>
                    <td>{{row.trackingnumber}}</td>
                </tr>
                {% endfor %}
            </tbody>
    </table>
    <div layout="row" layout-align="start center" class="paginator">
        <nav>
  <ul class="pagination">
    {% if currentpage > 1 %}
        <li>
            <a href="/report/sales/1" aria-label="First">
                <span aria-hidden="true">&Ll;</span>
            </a>
        </li>
        <li>
            <a href="/report/sales/{{previouspage}}" aria-label="Previous">
                <span aria-hidden="true">&Lt;</span>
            </a>
        </li>
        <li class="disabled">
            <a href="" aria-label="fantom">
                <span aria-hidden="true">&hellip;</span>
            </a>
        </li>
    {% endif %}
    <li class="active"><a href="/report/sales/{{currentpage}}">{{currentpage}}</a></li>
    {% if currentpage < lastpage %}
        <li class="disabled">
            <a href="" aria-label="fantom">
                <span aria-hidden="true">&hellip;</span>
            </a>
        </li>
        <li>
            <a href="/report/sales/{{nextpage}}" aria-label="Next">
                <span aria-hidden="true">&Gt;</span>
            </a>
        </li>
        <li>
            <a href="/report/sales/{{lastpage}}" aria-label="Next">
                <span aria-hidden="true">&Gg;</span>
            </a>
        </li>
    {% endif %}
  </ul>
</nav>
    </div>
</div>
