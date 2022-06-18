$(function() {
    $('#link_reg').on('click', function() {
        $('.reg-box').show()
        $('.login-box').hide()
    })
    $('#link_login').on('click', function() {
        $('.reg-box').hide()
        $('.login-box').show()
    })


    var form = layui.form
    var layer = layui.layer

    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能包含空格'],
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd != value) {
                return "两次密码不一致"
            }
        }
    })

    $('#reg_form').on('submit', function(e) {
        e.preventDefault()
        var data = {
            username: $('#reg_form [name=username]').val(),
            password: $('#reg_form [name=password]').val()
        }
        $.post('/api/reguser', data, function(res) {
            if (res.status == 0) {
                layer.msg('注册成功，跳转登录')
                document.querySelector('#link_login').click()
            } else {
                layer.msg(res.message)
            }
        })
    })

    $('#login_form').on('submit', function(e) {
        e.preventDefault()
        var data = $(this).serialize()
        $.post('/api/login', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            localStorage.setItem('token', res.token)
                // sessionStorage.setItem('token', res.token)
            layer.msg('登录成功跳转页面')
            location.href = 'index.html'
        })
    })


})