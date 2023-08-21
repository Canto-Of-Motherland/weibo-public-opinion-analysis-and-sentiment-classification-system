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
    $('#btn_out').click(function() {
        let cookies = document.cookie.split(',');
        let pattern = /csrftoken=(.*)/m;
        for (let j = 0; j < cookies.length; j++) {
            if (pattern.test(cookies[j])) {
                var csrf = pattern.exec(cookies[j])[1];
            }
        }
        $.ajax({
            url: '/',
            type: 'POST',
            data: {csrfmiddlewaretoken: csrf, func_code: '01'},
            success: function() {
                Swal.fire({
                    title: '已安全退出',
                    icon: 'success',
                    showConfirmButton: true,
                    confirmButtonText: "确　定",
                    width: '300px',
                }).then(() => {
                    window.location.assign('/signin/');
                });
            },
            error: function() {}
        });
    });
    
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
            data: {csrfmiddlewaretoken: csrf, func_code: '1', keyword: $('#search').val(), time_start: $('#time_start').val(), time_end: $('#time_end').val()},
            success: function(response) {
                Plotly.newPlot('line_figure_1', response['line_figure_1']);
                Plotly.newPlot('dot4d_figure', response['dot4d_figure']);
                Plotly.newPlot('line_figure_2', response['line_figure_2']);
            },
            error: function() {}
        });
    });

    $('#btn_upload').click(function() {
        const form = new FormData();
        let file = $('#file')[0].files[0];
        let cookies = document.cookie.split(',');
        let pattern = /csrftoken=(.*)/m;
        for (let j = 0; j < cookies.length; j++) {
            if (pattern.test(cookies[j])) {
                var csrf = pattern.exec(cookies[j])[1];
            }
        }
        form.append('func_code', '2');
        form.append('file', file);
        form.append('csrfmiddlewaretoken', csrf);

        Swal.fire({
            title: '已提交',
            html: '预计运算时间小于 5 分钟',
            icon: 'success',
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: true,
            confirmButtonText: "确　定",
            width: '300px',
        });
        $.ajax({
            url: 'http://127.0.0.1:8000/main-opinion-analysis/',
            type: 'POST',
            processData: false,
            contentType: false,
            data: form,
            success: function(response) {
                Plotly.newPlot('line_figure_1', response['line_figure_1']);
                Plotly.newPlot('dot4d_figure', response['dot4d_figure']);
                Plotly.newPlot('line_figure_2', response['line_figure_2']);
            },
            error: function() {}
        });
    });
});

function setPath(obj) {
    let path = $(obj);
    let file = path.prop('files')[0];
    let fileName = file.name;
    $('.occupy').text(fileName);
}