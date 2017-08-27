/**
 * Created by diego on 7/25/17.
 */

$(document).ready(function () {
    load_datatable('#table_sales', {
        '#id_seller_name': 1,
        '#id_customer_name': 3
    });
    $('#table_sales_filter').hide();
});
