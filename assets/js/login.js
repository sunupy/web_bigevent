$(function () {
    //点击去注册账号的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    //点击去登录的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //从layui中获取form对象
    var form = layui.form
    var  layer = layui.layer
    //通过form.verify()函数自定义检验规则
    form.verify({
        //自定义了一个叫做pwd的校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            //通过形参拿 到的是确认密码框 中的内容
            //还需要拿 到密码框中的内容
            //然后进行一次等于的判断
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }

    })


    //监听注册表单的提交事件

    $('#form_reg').on('submit', function (e) {
        var data = {
            username: $('#form_reg [name = username]').val(),               
            password: $('#form_reg [name = password]').val()
        }
        e.preventDefault()
        $.post('/api/reguser',
            data,
            function (res) {
                if(res.status !== 0) {
                    // return console.log(res.message);
                     return layer.msg(res.message);
                }
                layer.msg("注册成功,请登录");
                //调用登录
                $('#link_login').click()
            })
    })


    //监听登录表彰的提交事件
    $('#form_login').submit(function(e) {
        e.preventDefault()
        $.ajax({
           url: '/api/login',
           method: 'POST',
           data: $(this).serialize(),
           success: function(res) {
               if(res.status !==0) {
                   return layer.msg('登录失败')
               }
               layer.msg('登录成功')
            //    将登录成功得到的字符串保存到localStorage
            localStorage.setItem('token',res.token)
               console.log(res.token);
               location.href = '/index.html'
           }
        })
    })



})