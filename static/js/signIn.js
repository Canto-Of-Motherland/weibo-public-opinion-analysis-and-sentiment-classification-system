// 验证码输入框
$(document).ready(function() {
    let codeInput = $('#code_input');
    let codeCell = $("div[name='code_cell']");
    let regex = /^[\d]+$/;
    let codeLength = 0
    $('#code_area').on('click', () => {
        codeInput.focus();
    });
    codeInput.on('input propertychange change', (e) => {
        codeLength = codeInput.val().length;
        if (codeInput.val() && regex.test(codeInput.val())) {
            $(codeCell[codeLength - 1]).text(codeInput.val().substring(codeLength - 1, codeLength));
        }
    });
    $(this).on('keyup', (e) => {
        if (e.keyCode === 8) {
            $(codeCell[codeLength]).text('');
        }
    });
});

function checkForNum(obj) {
    obj.value = obj.value.replace(/[\D]/g, '');
}
// 邮箱输入框衬底协作动作
$(document).ready(function() {
        $('.user_email_code').mouseover(function() {
            $('.occupy').addClass('hovered');
        });
        $('.user_email_code').mouseout(function() {
            $('.occupy').removeClass('hovered');
        });
    });
// cover左移
function left() {
    $('.container_left').css({
        'visibility': 'hidden',
        'transition-delay': '0ms'
    });
    $('.left_labels').css({
        'visibility': 'hidden'
    });
    $('.cover').animate({
        'margin-left': '-300px',
        'border-top-right-radius': '0',
        'border-bottom-right-radius': '0',
        'border-top-left-radius': '20px',
        'border-bottom-left-radius': '20px'
    }, 500);
    $('.container_right').css({
        'visibility': 'visible',
        'transition-delay': '500ms',
    });
}
// cover右移
function right() {
    $('.container_right').css({
        'visibility': 'hidden',
        'transition-delay': '0ms'
    });
    $('.right_labels').css({
        'visibility': 'hidden'
    });
    $('.cover').animate({
        'margin-left': '0px',
        'border-top-right-radius': '20px',
        'border-bottom-right-radius': '20px',
        'border-top-left-radius': '0',
        'border-bottom-left-radius': '0'
    }, 500);
    $('.container_left').css({
        'visibility': 'visible',
        'transition-delay': '500ms',
    });
}

function checkEmptyEmailPass(obj) {
    const value = $(obj).val();
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value.length === 0) {
        $('#email_info_pass').text('邮箱不能为空');
        $('#email_info_pass').css({
            'visibility': 'visible'
        });
        $('#btn_signin_pass').css({
            'pointer-events': 'none'
        });
    } else {
        if (pattern.test(value)) {
            $('#email_info_pass').css({
                'visibility': 'hidden'
            });
            $('#btn_signin_pass').css({
                'pointer-events': 'auto'
            });
        } else {
            $('#email_info_pass').text('邮箱格式错误');
            $('#email_info_pass').css({
                'visibility': 'visible'
            });
            $('#btn_signin_pass').css({
                'pointer-events': 'none'
            });
        }
    }
}

function checkEmptyPass(obj) {
    const value = $(obj).val();
    if (value.length === 0) {
        $('#pass_info').text('密码不能为空');
        $('#pass_info').css({
            'visibility': 'visible'
        });
        $('#btn_signin_pass').css({
            'pointer-events': 'none'
        });
    } else {
        $('#pass_info').css({
            'visibility': 'hidden'
        });
        $('#btn_signin_pass').css({
            'pointer-events': 'auto'
        });
    }
}

function checkEmptyEmailCode(obj) {
    const value = $(obj).val();
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value.length === 0) {
        $('#email_info_code').text('邮箱不能为空');
        $('#email_info_code').css({
            'visibility': 'visible'
        });
        $('#btn_signin_code').css({
            'pointer-events': 'none'
        });
        $('#btn_get_code').css({
            'pointer-events': 'none'
        });
    } else {
        if (pattern.test(value)) {
            $('#email_info_code').css({
                'visibility': 'hidden'
            });
            $('#btn_signin_code').css({
                'pointer-events': 'auto'
            });
            $('#btn_get_code').css({
                'pointer-events': 'auto'
            });
        } else {
            $('#email_info_code').text('邮箱格式错误');
            $('#email_info_code').css({
                'visibility': 'visible'
            });
            $('#btn_signin_code').css({
                'pointer-events': 'none'
            });
            $('#btn_get_code').css({
                'pointer-events': 'none'
            });
        }
    }
}

function checkEmptyCode(obj) {
    const value = $(obj).val();
    if (value.length === 0) {
        $('#code_info').text('验证码不能为空');
        $('#code_info').css({
            'visibility': 'visible'
        });
        $('#btn_signin_code').css({
            'pointer-events': 'none'
        });
    } else if (value.length !== 6) {
        $('#code_info').text('验证码需为六位');
        $('#code_info').css({
            'visibility': 'visible'
        });
        $('#btn_signin_code').css({
            'pointer-events': 'none'
        });
    } else {
        $('#code_info').css({
            'visibility': 'hidden'
        });
        $('#btn_signin_code').css({
            'pointer-events': 'auto'
        });
    }
}
// 登录提示
$(document).ready(function() {
    $('#btn_signin_pass').click(function() {
        let cookies = document.cookie.split(',');
        let pattern = /csrftoken=(.*)/m;
        for (let j = 0; j < cookies.length; j++) {
            if (pattern.test(cookies[j])) {
                var csrf = pattern.exec(cookies[j])[1];
            }
        }
        $.ajax({
            url: '/signin/',
            type: 'POST',
            data: {csrfmiddlewaretoken: csrf, func_code: '1', user_email_pass: $('#user_email_pass').val(), user_password: $('#user_password').val()},
            success: function(response) {
                const status_code = response['status_code']
                if (status_code === 1) {
                    $('#email_info_pass').text('必填项不能为空');
                    $('#email_info_pass').css({
                        'visibility': 'visible'
                    });
                    $('#pass_info').text('必填项不能为空');
                    $('#pass_info').css({
                        'visibility': 'visible'
                    });
                } else if (status_code === 2) {
                    $('#pass_info').text('密码错误');
                    $('#pass_info').css({
                        'visibility': 'visible'
                    });
                } else if (status_code === 3) {
                    $('#email_info_pass').text('该邮箱未注册');
                    $('#email_info_pass').css({
                        'visibility': 'visible'
                    });
                } else {
                    window.location.href = '/';
                }
            },
            error: function() {}
        });
    });

    $('#btn_signin_code').click(function() {
        let cookies = document.cookie.split(',');
        let pattern = /csrftoken=(.*)/m;
        for (let j = 0; j < cookies.length; j++) {
            if (pattern.test(cookies[j])) {
                var csrf = pattern.exec(cookies[j])[1];
            }
        }
        $.ajax({
            url: '/signin/',
            type: 'POST',
            data: {csrfmiddlewaretoken: csrf, func_code: '2', user_email_code: $('#user_email_code').val(), code_input: $('#code_input').val()},
            success: function(response) {
                const status_code = response['status_code']
                if (status_code === 1) {
                    $('#email_info_code').text('必填项不能为空');
                    $('#email_info_code').css({
                        'visibility': 'visible'
                    });
                    $('#code_info').text('必填项不能为空');
                    $('#code_info').css({
                        'visibility': 'visible'
                    });
                } else if (status_code === 2) {
                    $('#code_info').text('验证码超时，请重新获取验证码');
                    $('#code_info').css({
                        'visibility': 'visible'
                    });
                } else if (status_code === 3) {
                    $('#code_info').text('验证码错误或已被使用');
                    $('#code_info').css({
                        'visibility': 'visible'
                    });
                } else {
                    window.location.href = '/';
                }
            },
            error: function() {}
        });
    });

    $('#btn_get_code').click(function() {
        let cookies = document.cookie.split(',');
        let pattern = /csrftoken=(.*)/m;
        $('#btn_get_code').css({
            'pointer-events': 'none'
        });
        for (let j = 0; j < cookies.length; j++) {
            if (pattern.test(cookies[j])) {
                var csrf = pattern.exec(cookies[j])[1];
            }
        }
        $.ajax({
            url: '/signin/',
            type: 'POST',
            data: {csrfmiddlewaretoken: csrf, func_code: '3', user_email_code: $('#user_email_code').val()},
            success: function(response) {
                const status_code = response['status_code']
                if (status_code === 1) {
                    $('#email_info_code').text('邮箱不能为空');
                    $('#email_info_code').css({
                        'visibility': 'visible'
                    });
                } else if (status_code === 2) {
                    $('#email_info_code').text('邮箱发送失败，请检查邮箱是否可用');
                    $('#email_info_code').css({
                        'visibility': 'visible'
                    });
                } else if (status_code === 3) {
                    $('#email_info_code').text('该邮箱未注册');
                    $('#email_info_code').css({
                        'visibility': 'visible'
                    });
                } else {
                    $('#email_info_code').text('验证码已发送，有效期2分钟');
                    $('#email_info_code').css({
                        'visibility': 'visible'
                    });
                    countDown();
                }
            },
            error: function() {}
        });
    });
});

const time_init = 60;
let time_now = time_init;
let t;

function changeButtonText() {
    if (time_now > 0) {
        $('#btn_get_code').text('已发送 (' + time_now + ')');
        time_now = time_now - 1;
        $('#btn_get_code').css({
            'pointer-events': 'none'
        });
    } else {
        const btnGetCode = $('#btn_get_code');
        $('#btn_get_code').css({
            'pointer-events': 'auto'
        });
        btnGetCode.text('获取验证码');
        clearInterval(t);
        time_now = time_init;
    }
}

function countDown() {
    $('#btn_get_code').text('已发送 (' + time_now + ')');
    time_now = time_now - 1;
    t = setInterval('changeButtonText()', 1000);
}