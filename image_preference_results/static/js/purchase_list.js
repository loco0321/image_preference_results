$(document).ready(function () {
    'use strict';

    $('.filter-form').on('changeDate', '.datepicker', function () {
        var $date_range = $('#id_date_range');
        $date_range.val($('#id_start_date').val() + '|' + $('#id_end_date').val());
        $date_range.trigger('change');
    });

    load_datatable('#table_purchase', {
        '#id_date_range': 2,
        '#id_supplier': 3
    });
});
