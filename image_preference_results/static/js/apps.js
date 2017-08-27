/**
 * Created by leon on 5/6/17.
 */
$(document).ready(function () {
    var LANGUAGE_CODE = $('html').attr('lang');
    $('.input-file-img').fileinput({
        maxFileSize: 10000,
        showPreview: false,
        showUpload: false,
        uploadAsync: true,
        allowedFileExtensions: ["png", "jpg"],
        browseClass: "btn btn-primary",
        removeClass: "btn btn-danger",
        uploadClass: "btn btn-success",
        language: LANGUAGE_CODE
    });

    var date_input = $('input[name="date"], input[name="start_date"], input[name="end_date"]'); //our date input has the name "date"
    var container = $('.bootstrap-iso form').length > 0 ? $('.bootstrap-iso form').parent() : "body";
    var options = {
        language: LANGUAGE_CODE,
        container: container,
        todayHighlight: true,
        autoclose: true
    };
    date_input.datepicker(options);
});
