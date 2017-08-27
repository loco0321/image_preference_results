/**
 * Created by leon on 5/8/17.
 */
$(document).ready(function () {
    $(window).resize(function () {
        var ellipses1 = $("#bc1 :nth-child(2)");
        if ($("#bc1 a:hidden").length > 0) {
            ellipses1.show()
        } else {
            ellipses1.hide()
        }

        var ellipses2 = $("#bc2 :nth-child(2)");
        if ($("#bc2 a:hidden").length > 0) {
            ellipses2.show()
        } else {
            ellipses2.hide()
        }
    })
});