$(document).ready(function() {
    var originalBuildPicker = $.fn.datetimepicker.Constructor.prototype._buildPicker;
    $.fn.datetimepicker.Constructor.prototype._buildPicker = function() {
      originalBuildPicker.apply(this, arguments);
      this.picker.find('.datetimepicker-minutes').remove();
    };
});
$(function() {
    let dateStart = $('#time_start').datetimepicker({
        language: "zh-CN",
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1,
        todayHighlight: 0,
        format: "yyyy-mm-dd HH时",
        minuteStepping: 60,
    });
    let dateEnd = $('#date_end').datetimepicker({
        language: "zh-CN",
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1,
        todayHighlight: 0,
        format: "yyyy-mm-dd HH时",
        minuteStepping: 60,
    });
    dateStart.on('dp.change', function(e) {
        dateEnd.data('DateTimePicker').minDate(e.date);
    });
});

$(document).ready(function() {
    $('#btn_search').click(function() {
        let cookies = document.cookie.split(',');
        let pattern = /csrftoken=(.*)/m;
        for (let j = 0; j < cookies.length; j++) {
            if (pattern.test(cookies[j])) {
                var csrf = pattern.exec(cookies[j])[1];
            }
        }
        $.ajax({
            url: '/main-opinion-analysis/',
            type: 'POST',
            data: {csrfmiddlewaretoken: csrf, keyword: $('#search').val(), time_start: $('#time_start').val(), time_end: $('#time_end').val()},
            success: function(response) {
                Plotly.newPlot('line_figure_1', response['line_figure_1']);
                Plotly.newPlot('dot4d_figure', response['dot4d_figure']);
                Plotly.newPlot('line_figure_2', response['line_figure_2']);
            },
            error: function() {}
        });
    });
});