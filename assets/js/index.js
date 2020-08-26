$(function () {
    getUserInfo()
    var layer = layui.layer
    //点击按钮，实现退出功能
    $('#btnLogout').on('click', function () {
        //弹出提示信息框

        layer.confirm('确定奶出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            console.log('ok');
            // 清空本地存储中的token
            localStorage.removeItem('token')
            //跳转到登录页
            location.href ='/login.html'
            // 关闭询问框
            layer.close(index);
        });
    })
})

//获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //headers请求头
        // headers:{
        //     Authorization:localStorage.getItem('token') || ''
        // },

        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            //调用renderAvatar 渲染用户的头像
            renderAvatar(res.data)
        },
        //不论成功还是失败最终都会调用complete回调函数
        // complete:function(res) {
        //     // console.log(111);
        //     // console.log(res);
        //     //在complete 回调函数中，可以使用responseJSON拿到服务器响应回来的数据
        //     if(res.responseJSON.status ===1 && res.responseJSON.message==='身份认证失败！') {
        //         //强制清空token
        //         localStorage.removeItem('token')
        //         //强制跳转到登录页
        //         location.href='/login.html'
        //     }
        // }

    })
}

//渲染用户头像
function renderAvatar(user) {
    var name = user.nickname || user.username
    $('.welcome').html('欢迎&nbsp;&nbsp' + name)
    // 3按需渲染头像
    if (user.user_pic !== null) {
        //3.1渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //3.2渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}