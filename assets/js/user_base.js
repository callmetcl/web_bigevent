$(function() {
    var layer = layui.layer
    var form = layui.form

    function initUserInfo() {
        $.get('/my/userinfo', function(res) {
            if (res.status !== 0) {
                // 失败
                return layer.msg(res.message)
            }
            console.log(res.data);
            // 调用layui内部方法给form表单复制
            form.val('fm_user_base', res.data);
        })
    }

    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.post('/my/userinfo', $(this).serialize(), function(res) {
            if (res.status !== 0) {
                // 失败
                return layer.msg(res.message)
            }
            layer.msg(res.message)
            if (window.parent.parent.getUserInfo) {
                window.parent.parent.getUserInfo()
            } else {
                console.log(window.parent.parent.getUserInfo)
            }
            console.log('?????????');
        })
    })

    $('#fm_reset').on('click', function(e) {
        e.preventDefault()
        initUserInfo()
    })

    initUserInfo()
})