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
});