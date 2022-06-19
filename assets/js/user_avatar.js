$(function() {
    var layer = layui.layer

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    if (localStorage.getItem('avatar')) {
        $image.attr('src', localStorage.getItem('avatar'))
    }
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)


    $('#chocePic').on('click', function() {
        $('#fileup').click()
    })

    $('#fileup').on('change', function(e) {
        if (e.target.files.length < 1) {
            return layer.msg('用户取消了上传图片')
        }
        var fileu = e.target.files[0]
        var imgUrl = URL.createObjectURL(fileu)

        $image
            .cropper('destroy') // 销毁原文件
            .attr('src', imgUrl)
            .cropper(options)
    })

    $('#upPic').on('click', function() {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('头像更新失败')
                }

                window.parent.getUserInfo()
            }
        })

    })
})