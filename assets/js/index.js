$(function() {
    getUserInfo();

    $('#quitSystem').on('click', function() {

        var layer = layui.layer
        layer.confirm('确定要退出么?', { icon: 3, title: '提示' }, function(index) {

            localStorage.removeItem('token')
            location.href = 'login.html'
            layer.close(index);
        })
    })

})

function renderUserInfo(user) {

    var name = user.nickname == "" ? user.username : user.nickname;
    if (user.user_pic != null) {
        console.log(1);
        $('.user-header img').attr('src', user.user_pic).show()
        $('.user-header span').hide()
        localStorage.setItem('avatar', user.user_pic)
    } else {
        $('.header-span').html(name[0].toUpperCase()).show();
        $('.user-header img').hide();
    }
    $('#huanying').html('欢迎&nbsp;&nbsp;' + name);
}

function getUserInfo() {
    console.log('执行getUserInfo');
    $.get('/my/userinfo', function(res) {
        if (res.status != 0) {
            console.log(res);
            return layui.layer.msg('获取用户信息失败')
        }
        renderUserInfo(res.data)

    })
}