$(function() {
    var layer = layui.layer
    initArtCateList()


    //获取文章分类的列表
    function initArtCateList() {
        $.ajax({
           method:'get',
           url:'/my/article/cates',
           
           success:function(res) {
             var htmlStr = template('tpl-table',res)
             $('tbody').html(htmlStr)
           }
        })
    }


    //为添加类别按钮绑定点击事件
    $('#btnAddCate').on('click',function(){
        layer.open({
            type:1,
            area:['500px','250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })


    //通过代理的形式，为form -add表单绑定submit事件
    $('body').on('submit','#form-add',function(e) {
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'/my/article/addcates',
            
        })
    })
})