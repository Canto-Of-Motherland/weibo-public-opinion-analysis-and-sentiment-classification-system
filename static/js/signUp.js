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
    $('.user_email').mouseover(function() {
        $('.occupy').addClass('hovered');
    });
    $('.user_email').mouseout(function() {
        $('.occupy').removeClass('hovered');
    });
});

function checkEmptyEmail(obj) {
    const value = $(obj).val();
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value.length === 0) {
        $('#email_info').text('邮箱不能为空');
        $('#email_info').css({
            'visibility': 'visible'
        });
        $('#btn_get_code').css({
            'pointer-events': 'none'
        });
        $('#btn_to_next').css({
            'pointer-events': 'none'
        });
        $('#btn_signup').css({
            'pointer-events': 'none'
        });
    } else {
        if (pattern.test(value)) {
            $('#email_info').css({
                'visibility': 'hidden'
            });
            $('#btn_get_code').css({
                'pointer-events': 'auto'
            })
            $('#btn_to_next').css({
                'pointer-events': 'auto'
            });
            $('#btn_signup').css({
                'pointer-events': 'auto'
            });
        } else {
            $('#email_info').text('邮箱格式错误');
            $('#email_info').css({
                'visibility': 'visible'
            });
            $('#btn_get_code').css({
                'pointer-events': 'none'
            });
            $('#btn_to_next').css({
                'pointer-events': 'none'
            });
            $('#btn_signup').css({
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
        $('#btn_to_next').css({
            'pointer-events': 'none'
        });
        $('#btn_signup').css({
            'pointer-events': 'none'
        });
    } else if (value.length !== 6) {
        $('#code_info').text('验证码需为六位');
        $('#code_info').css({
            'visibility': 'visible'
        });
        $('#btn_to_next').css({
            'pointer-events': 'none'
        });
        $('#btn_signup').css({
            'pointer-events': 'none'
        });
    } else {
        $('#code_info').css({
            'visibility': 'hidden'
        });
        $('#btn_to_next').css({
            'pointer-events': 'auto'
        });
        $('#btn_signup').css({
            'pointer-events': 'auto'
        });
    }
}

function checkEmptyName(obj) {
    const value = $(obj).val();
    if (value.length === 0) {
        $('#name_info').text('用户名不能为空');
        $('#name_info').css({
            'visibility': 'visible'
        });
        $('#btn_signup').css({
            'pointer-events': 'none'
        });
    } else if (value.length > 16) {
        $('#name_info').text('用户名过长，应小于16个字符');
        $('#name_info').css({
            'visibility': 'visible'
        });
        $('#btn_signup').css({
            'pointer-events': 'none'
        });
    } else {
        $('#name_info').css({
            'visibility': 'hidden'
        });
        $('#btn_signup').css({
            'pointer-events': 'auto'
        });
    }
}

function checkEmptyPass(obj) {
    const value = $(obj).val();
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    if (value.length === 0) {
        $('#pass_info').text('密码不能为空');
        $('#pass_info').css({
            'visibility': 'visible'
        });
        $('#btn_signup').css({
            'pointer-events': 'none'
        });
    } else {
        if (value.length <= 32 && value.length >= 8) {
            if (pattern.test(value)) {
                $('#pass_info').css({
                    'visibility': 'hidden'
                });
                $('#btn_signup').css({
                    'pointer-events': 'auto'
                });
            } else {
                $('#pass_info').text('密码需含数字、大小写字母与特殊符号');
                $('#pass_info').css({
                    'visibility': 'visible'
                });
                $('#btn_signup').css({
                    'pointer-events': 'none'
                });  
            }
        } else {
            $('#pass_info').text('密码长度需在8-32位之间');
            $('#pass_info').css({
                'visibility': 'visible'
            });
            $('#btn_signup').css({
                'pointer-events': 'none'
            });
        }
    }
}

function checkEmptyConfirm(obj) {
    const value = $(obj).val();
    const pattern = $('#user_password').val();
    if (value.length === 0) {
        $('#confirm_info').text('确认密码不能为空')
        $('#confirm_info').css({
            'visibility': 'visible'
        });
        $('#btn_signup').css({
            'pointer-events': 'none'
        });
    } else {
        if (value === pattern) {
            $('#confirm_info').css({
                'visibility': 'hidden'
            });
            $('#btn_signup').css({
                'pointer-events': 'auto'
            });
        } else {
            $('#confirm_info').text('前后密码不一致')
            $('#confirm_info').css({
                'visibility': 'visible'
            });
            $('#btn_signup').css({
                'pointer-events': 'none'
            });
        }
    }

}

function left() {
    $('.container_in').animate({
        'margin-left': '-453px',
    }, 500);
}

function right() {
    $('.container_in').animate({
        'margin-left': '-150px',
    }, 500);
}

$(document).ready(function() {
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
            url: '/signup/',
            type: 'POST',
            data: {csrfmiddlewaretoken: csrf, func_code: '1', user_email: $('#user_email').val()},
            success: function(response) {
                const status_code = response['status_code']
                if (status_code === 1) {
                    $('#email_info').text('邮箱不能为空');
                    $('#email_info').css({
                        'visibility': 'visible'
                    });
                } else if (status_code === 2) {
                    $('#email_info').text('该邮箱已注册');
                    $('#email_info').css({
                        'visibility': 'visible'
                    });
                } else if (status_code === 3) {
                    $('#email_info').text('邮箱发送失败，请检查邮箱是否可用');
                    $('#email_info').css({
                        'visibility': 'visible'
                    });
                } else {
                    $('#email_info').text('验证码已发送，有效期2分钟');
                    $('#email_info').css({
                        'visibility': 'visible'
                    });
                    countDown();
                }
            }, 
            error: function() {}
        });
    });

    $('#btn_to_next').click(function() {
        let cookies = document.cookie.split(',');
        let pattern = /csrftoken=(.*)/m;
        for (let j = 0; j < cookies.length; j++) {
            if (pattern.test(cookies[j])) {
                var csrf = pattern.exec(cookies[j])[1];
            }
        }
        $.ajax({
            url: '/signup/',
            type: 'POST',
            data: {csrfmiddlewaretoken: csrf, func_code: '2', user_email: $('#user_email').val(), code_input: $('#code_input').val()},
            success: function(response) {
                const status_code = response['status_code']
                if (status_code === 1) {
                    $('#email_info').text('必填项不能为空');
                    $('#email_info').css({
                        'visibility': 'visible'
                    });
                    $('#code_info').text('必填项不能为空');
                    $('#code_info').css({
                        'visibility': 'visible'
                    });
                } else if (status_code == 2) {
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
                    left();
                }
            },
            error: function() {}
        });
    });

    $('#btn_signup').click(function() {
        let cookies = document.cookie.split(',');
        let pattern = /csrftoken=(.*)/m;
        for (let j = 0; j < cookies.length; j++) {
            if (pattern.test(cookies[j])) {
                var csrf = pattern.exec(cookies[j])[1];
            }
        }
        $.ajax({
            url: '/signup/',
            type: 'POST',
            data: {csrfmiddlewaretoken: csrf, func_code: '3', user_email: $('#user_email').val(), user_name: $('#user_name').val(), user_password: $('#user_password').val(), password_confirm: $('#password_confirm').val()},
            success: function(response) {
                const status_code = response['status_code']
                if (status_code === 1) {
                    $('#name_info').text('必填项不能为空');
                    $('#name_info').css({
                        'visibility': 'visible'
                    });
                    $('#pass_info').text('必填项不能为空');
                    $('#pass_info').css({
                        'visibility': 'visible'
                    });
                    $('#confirm_info').text('必填项不能为空');
                    $('#confirm_info').css({
                        'visibility': 'visible'
                    });
                } else if (status_code === 2) {
                    $('#confirm_info').text('前后密码不一致')
                    $('#confirm_info').css({
                        'visibility': 'visible'
                    });
                } else if (status_code === 3) {
                    $('#pass_info').text('密码长度需在8-32位之间');
                    $('#pass_info').css({
                        'visibility': 'visible'
                    });
                } else if (status_code === 4) {
                    $('#pass_info').text('密码需含数字、大小写字母与特殊符号');
                    $('#pass_info').css({
                        'visibility': 'visible'
                    });   
                } else {
                    Swal.fire({
                        title: '注册成功',
                        html: '将在 <b></b> 秒后自动跳转',
                        icon: 'success',
                        timer: 3000,
                        timerProgressBar: true,
                        showConfirmButton: true,
                        confirmButtonText: "确　定",
                        width: '300px',
                        height: '400px',
                        onBeforeOpen: () => {
                            timerInterval = setInterval(() => {
                                const content = Swal.getContent()
                                if (content) {
                                    const b = content.querySelector('b')
                                    if (b) {
                                    b.textContent = parseInt(Swal.getTimerLeft() / 1000)
                                    }
                                }
                            }, 100)
                        },
                        onClose: () => {
                            clearInterval(timerInterval)
                        }
                    }).then(() => {
                        window.location.assign('/signin/');
                    });
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