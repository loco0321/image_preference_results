$(document).ready(function () {
    'use strict';

    // Set formset animation.
    $('.sale_item_form').formset({
        addText: '',
        deleteText: '',
        animateForms: true,
        added: function (row) {
            $('.section_breaks_formset').find('.delete-row').empty().addClass('button').append('<span class="glyphicon glyphicon-minus fa-2x"></span>');
        }
    });

    $('.add-row').addClass('button');
    $('.add-row').removeClass('pull-right');
    $('.add-row').append('<span class="glyphicon glyphicon-plus fa-2x"></span>');

    $('.delete-row').addClass('button').append('<span class="glyphicon glyphicon-minus"></span>');

    $('#id_customer').on('select2:selecting', function (evt) {
        var data = evt.params.args.data;
        if (data.create_id !== true)
            return;
        evt.preventDefault();
        $('#squarespaceModal').modal('show');
        $(this).select2('close');
        $('#id_identification_number').val(data.id);
    });

    $('#customer_form').submit(function (evt) {
        evt.preventDefault();
        var select = $('#id_customer');
        $.post(select.attr('data-autocomplete-light-url'), $(this).serialize(), function (data) {
            if (data.form) {
                $('#customer_form_body').html(data.form);
            } else {
                select.append(
                    $('<option>', {value: data.id, text: data.text, selected: true})
                );
                select.trigger('change');
                select.select2('close');
                $('#squarespaceModal').modal('hide');
            }
        });
    });

    $('#form-sale').on('select2:selecting', 'select[name$="-product"]', function (evt) {
        var data = evt.params.args.data;
        // Reset Quantity
        $(this).closest('.sale_item_form').find('input[name$="-quantity"]').val(0);
        // Update data item
        update_item($(this).closest('.sale_item_form'), data);
        if (data.create_id !== true)
            return;
        evt.preventDefault();
    });

    function update_item(item_form, data) {
        item_form.find('.stock').html('(' + data.stock + ')');
        item_form.find('input[name$="-quantity"]').attr('max', data.stock);

        var quantity_field = item_form.find('input[name$="quantity"]');
        var quantity = 0;
        if (quantity_field.val()) {
            quantity = parseInt(quantity_field.val());
        }
        quantity += 1;
        quantity_field.val(quantity);
        item_form.find('input[name="unit_price"]').val(data.unit_price);
        item_form.find('input[name$="-quantity"]').trigger('change');
    }

    $(this).scannerDetection({
        timeBeforeScanTest: 200, // wait for the next character for upto 200ms
        startChar: [120], // Prefix character for the cabled scanner (OPL6845R)
        endChar: [13], // be sure the scan is complete if key 13 (enter) is detected
        avgTimeByChar: 40, // it's not a barcode if a character takes longer than 40ms
        onComplete: function(barcode, qty){
            var last_form = $('.sale_item_form').last();
            var last_select = last_form.find('select[name$="-product"]');
            var url = last_select.data('autocomplete-light-url');
            $.get(url, {q: barcode}, function(data) {
                if (data.results.length == 0)
                    return
                data = data.results[0];
                // Validate if the item exists in the list
                var add = true;
                $('select[name$="-product"]').each(function (idx, element) {
                    if ($(element).val() == data.id) {
                        add = false;
                        last_form = $(this).closest('.sale_item_form');
                        return update_item(last_form, data);
                    }
                });
                if (add == true) {
                    var last_form = $('.sale_item_form').last();
                    var last_select = last_form.find('select[name$="-product"]');
                    if ($(last_select).val()) {
                        $('.add-row').click();
                    }
                    var last_form = $('.sale_item_form').last();
                    var last_select = last_form.find('select[name$="-product"]');
                    last_select.append(
                        $('<option>', {value: data.id, text: data.text, selected: true})
                    );
                    return update_item(last_form, data);
                }
            });
        } // main callback function
    });

    function get_total_price() {
        var total_price = 0;
        $('input[name="total_price"]').each(function (idx, element) {
            total_price += parseFloat($(element).val());
        });
        $('#id_total_price').val(total_price);
    }

    $('#form-sale').on('change', 'input[name$="-quantity"]', function () {
        var last_form = $(this).closest('.sale_item_form');
        var total_price = parseFloat(last_form.find('input[name="unit_price"]').val()) * parseFloat($(this).val());
        last_form.find('input[name="total_price"]').val(total_price);
        get_total_price();
    });
});
