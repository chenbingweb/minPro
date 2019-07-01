(function ($) {
    //Ajax
    $.Ajax = function (senddata, success, fail, url, flag) {
        //转字符串
        senddata = JSON.stringify(senddata);
        $.ajax({
            type: 'post',
            url: url,
            data: senddata,
            dataType: 'json',
            //contentType:'application/json',
            contentType: 'text/plain',
            //contentType:'application/x-www-form-urlencoded',
            async: true,
            success: function (jo) {
                //成功获取数据
                if (jo.errcode == 0) {
                    //如果为真，返回整个数据
                    if (!flag) {
                        success(jo)
                    } else //默认返回data数据
                    {
                        success(jo.data)
                    }
                }
                //获取失败
                else if (jo.errcode == 1) {
                    fail(jo)
                } else if (jo.status == 200) {
                    success(jo)
                }
            },
            error: function (msg) {
                //测试
                fail(msg.status)
                //	window.close();
                //	$(window).attr('location',$.httpType+window.location.host)
            }
        });
    }
    $.CountImg=function(per,e,px=0){
        if(e)
        {
            console.log(e.offsetWidth)
          //  e.style.width=(e.offsetWidth -px) +'px';
            e.style.height=Math.ceil(((e.offsetWidth - px) / per) )+'px';
            return {w:e.offsetWidth+'px',h:e.style.height}
        }
       
       
    }
})(jQuery)