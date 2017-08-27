$(document).ready(function () {
    var PRODUCT_TRANSACTION_URL = $('#table_product').data('url_product_transaction');
    var EXTRA_TRANSACTION_URL = $('#table_product').data('url_extra_transaction');

    load_datatable('#table_product', {
        '#id_name': 0,
        '#id_factory': 2,
        '#id_categories': 3
    });
    $('#table_product_filter').addClass('hide');
    $('#table_product').on('click', '.to-store', function (event) {
        var product_id = $(this).data('product-id');
        $('.form-errors').html('');
        $.get(PRODUCT_TRANSACTION_URL, {product_id: product_id}, function (data, status) {
            $('#product-name').html(data.product_name);
            for (var name in data) {
                var query_name = '[name=' + name + ']';
                $('#product-transaction-form').find(query_name).val(data[name])
            }
            $('#modal-to-store').modal('show');
        });
    });
    $('#product-transaction-form').submit(function (evt) {
        evt.preventDefault();
        $.post(PRODUCT_TRANSACTION_URL, $(this).serialize(), function (data, status) {
            if (data.form) {
                $('#product-transaction-form-body').html(data.form);
            } else {
                $('#django-messages-panel').html(data.message);
                $('#modal-to-store').modal('hide');
                $('#store-product-id-' + data.product).html(data.store_quantity);
                $('#warehouse-product-id-' + data.product).html(data.warehouse_quantity);
            }
        });
    });

    var extra_transaction = null;
    $('#table_product').on('click', '.extra-transaction', function (event) {
        extra_transaction = $(this);
        $('.form-errors').html('');
        var GET = {
            product_id: $(this).data('extra-product-id'),
            origin_id: $(this).data('origin-id'),
            content_type_id: $(this).data('content-type-id')
        };
        $.get(EXTRA_TRANSACTION_URL, GET, function (data, status) {
            $('#extra-product-name').html(data.product_name);
            for (var name in data) {
                var query_name = '[name=' + name + ']';
                $('#extra-transaction-form').find(query_name).val(data[name])
            }
            $('#modal-extra-transaction').modal('show');
        });
    });
    $('#extra-transaction-form').submit(function (evt) {
        evt.preventDefault();
        $.post(EXTRA_TRANSACTION_URL, $(this).serialize(), function (data, status) {
            if (data.form) {
                $('#extra-transaction-form-body').html(data.form);
            } else {
                $('#django-messages-panel').html(data.message);
                var current_color = extra_transaction.closest('tr').css('background-color');
                extra_transaction.closest('tr').css('background-color', '#dff0d8');
                setTimeout(function () {
                    extra_transaction.closest('tr').css('background-color', current_color)
                }, 3000);
                if (data.stock_quantity == 0) {
                    extra_transaction.parent().html('0');
                } else {
                    extra_transaction.closest('td').find('.quantity').html(data.stock_quantity);
                }
                $('#modal-extra-transaction').modal('hide');
            }
        });
    });
});