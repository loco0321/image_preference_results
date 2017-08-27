$(document).ready(function () {
    load_datatable('#table_extra_transaction', {
        '#id_user': 0,
        '#id_product': 1
    });
    $('#table_extra_transaction_filter').addClass('hide');
});