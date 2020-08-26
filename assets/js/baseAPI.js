//每次调用$.get()或$.post() 或 $.ajax()的时候会先调用ajaxPrefilter这个函数
$.ajaxPrefilter(function(options){
    //发起ajax请求前，统一拼接根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url

    //统一为有权限 的接口设置headers 请求头
    if(options.url.indexOf('/my/') !== -1) {
        options.headers={
            Authorization:localStorage.getItem('token') || ''
        }
    }
    

    //全局统一挂载
    options.complete= function(res) {
        
            // console.log(111);
            // console.log(res);
            //在complete 回调函数中，可以使用responseJSON拿到服务器响应回来的数据
            if(res.responseJSON.status ===1 && res.responseJSON.message==='身份认证失败！') {
                //强制清空token
                localStorage.removeItem('token')
                //强制跳转到登录页
                location.href='/login.html'
            }
        }
    
})