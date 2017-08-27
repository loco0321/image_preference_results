$(document).ready(function () {
    'use strict';

    // Set formset animation.
    $('.purchase_item_form').formset({
        addText: '',
        deleteText: '',
        animateForms: true,
        added: function (row) {
            $('.section_breaks_formset').find('.delete-row').empty().addClass('button').append('<span class="glyphicon glyphicon-minus fa-2x"></span>');
            $(row).find('input[name$="-free_quantity"]').val(0);
        }
    });

    $('.add-row').addClass('button');
    $('.add-row').removeClass('pull-right');
    $('.add-row').append('<span class="glyphicon glyphicon-plus fa-2x"></span>');

    $('.delete-row').addClass('button').append('<span class="glyphicon glyphicon-minus"></span>');

    $('#id_supplier').on('select2:selecting', function (evt) {
        var data = evt.params.args.data;
        if (data.create_id !== true)
            return;
        evt.preventDefault();
        $('#squarespaceModal').modal('show');
        $(this).select2('close');
        $('#id_name').val(data.id);
    });

    $('#supplier_form').submit(function (evt) {
        evt.preventDefault();
        var select = $('#id_supplier');
        $.post(select.attr('data-autocomplete-light-url'), $(this).serialize(), function (data) {
            if (data.form) {
                $('#supplier_form_body').html(data.form);
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

    $(this).scannerDetection({
        timeBeforeScanTest: 200, // wait for the next character for upto 200ms
        startChar: [120], // Prefix character for the cabled scanner (OPL6845R)
        endChar: [13], // be sure the scan is complete if key 13 (enter) is detected
        avgTimeByChar: 40, // it's not a barcode if a character takes longer than 40ms
        onComplete: function(barcode, qty){
            var last_form = $('.purchase_item_form').last();
            var last_select = last_form.find('select[name$="-product"]');
            var url = last_select.data('autocomplete-light-url');
            $.get(url, {q: barcode}, function(data) {
                if (data.results.length == 0)
                    return
                // Validate if the item exists in the list
                var add = true;
                $('select[name$="-product"]').each(function (idx, element) {
                    if ($(element).val() == data.results[0].id) {
                        add = false;
                    }
                });
                if (add == true) {
                    var last_form = $('.purchase_item_form').last();
                    var last_select = last_form.find('select[name$="-product"]');
                    if ($(last_select).val()) {
                        $('.add-row').click();
                    }
                    var last_form = $('.purchase_item_form').last();
                    var last_select = last_form.find('select[name$="-product"]');
                    last_select.append(
                        $('<option>', {value: data.results[0].id, text: data.results[0].text, selected: true})
                    );
                }
            });
        } // main callback function
    });
});
