$(document).ready(function () {
    'use strict';

    $(this).scannerDetection({
        timeBeforeScanTest: 200, // wait for the next character for upto 200ms
        startChar: [120], // Prefix character for the cabled scanner (OPL6845R)
        endChar: [13], // be sure the scan is complete if key 13 (enter) is detected
        avgTimeByChar: 40, // it's not a barcode if a character takes longer than 40ms
        onComplete: function(barcode, qty) {
            $('#id_barcode').val(barcode);
        } // main callback function
    });
    $('#remove_id_barcode').click(function (event) {
        event.preventDefault();
        $('#id_barcode').val('');
    })
});
