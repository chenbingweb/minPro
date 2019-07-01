$(function(){
    //首页banner轮播
    new Swiper('#banner', {
        loop:true,
        speed:300,
        autoplay: {
            delay:3000,
            disableOnInteraction:false
        },
        pagination: {
            //el:'swiper-pagination',
        },
    });
    //首页底部banner轮播 
    new Swiper('#bottom_banner', {
         loop:true,
         speed:300,
        autoplay: {
            delay:3000,
            disableOnInteraction:false
        },
        pagination: {
            el:'#swiper-pagination',
            dynamicBullets: true,

        }
    }).pagination.$el.addClass('my-pagination-total');
    var productSwiper= new Swiper('#product', {
        loop:true,
        speed:300,
        pagination: {
           // el:'swiper-pagination',
        },
    });
    // 上下页
    $('.move_box_left').click(function(e){
        productSwiper.slidePrev()
   
        return 
    })
    $('.move_box_right').click(function(e){
        productSwiper.slideNext()
        return 
    })
    UpdateEle()   
   
})
function UpdateEle(){
    $.each( $('.bc_item'),function(index,item){
        $.CountImg(360/230,item)
    })
    $.each( $('.bc_item_more'),function(index,item){
        $.CountImg(360/230,item)
    })
    $.each($('.case_item'),function(index,item){
        if(index!==($('.case_item').length-1))
        {
            $.CountImg(280/480,item)
        }
        else
        {
           
            $.CountImg( 210/480,item)
        }
     
    })
    //child_li
    $.each($('.child_li'),function(index,item){
        $.CountImg(257/158,item)
     
    })
    $.each($('.product_child'),function(index,item){
        $.CountImg(360/500,item)
     
    })
    //b_img_bottom
    $.each($('.b_img_bottom'),function(index,item){
        $.CountImg(1444/280,item)
     
    })
    //bannerImg
    $.each($('.bannerImg'),function(index,item){
        $.CountImg(1444/660,item)
     
    })
    // $.each($('#footer'),function(index,item){ product_child
    //     $.CountImg(1440/417,item)
     
    // })
}