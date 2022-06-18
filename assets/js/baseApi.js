$.ajaxPrefilter(function(options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url

    options.headers = {
        Authorization: localStorage.getItem('token') || ''
    }
    options.complete = function(res) {
        var resJson = res.responseJSON
        if (resJson.status == 1 && resJson.message == '身份认证失败！') {
            localStorage.removeItem('token')
            window.location.href = 'login.html'
        }
    }
})