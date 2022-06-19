$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码长度必须6-12位'],

        samePwd: function(value) {
            if ($('.layui-form [name=oldPwd]').val() == value) {
                return "新密码和旧密码不能相同"
            }
        },

        repwd: function(value) {
            if ($('.layui-form [name=newPwd]').val() != value) {
                return "两次新密码不相同"
            }
        }
    })

    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        var data1 = form.val("form_pwd")
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: data1,
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                $('.layui-form')[0].reset()
            }
        })

    })
})