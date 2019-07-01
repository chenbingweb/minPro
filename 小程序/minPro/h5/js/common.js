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
    //表单序列化 subInfo=$("form").serializeArray()
    $.serializeObj = function (subInfo) {
        var subInfoObj = {};
        if ($.type(subInfo) == 'array') {
            $.each(subInfo, function (index, item) {
                subInfoObj[item.name] = item.value
            })
        }
        return subInfoObj
    }
    // 图片压缩
    $.imgCompress_ = function (dataURL, callBack, shouldCompress = false) {
        console.log(dataURL)
        var img = new window.Image();
        img.src = dataURL.result;
        img.onload = function () {
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            $('body').append(canvas)
            canvas.width = img.width;
            canvas.height = img.height;
            
            if (!!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
                // iOS
                console.log(canvas.width, canvas.height)
                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.rotate(90 * Math.PI / 180); //旋转47度
                ctx.translate(-canvas.width, -canvas.height);
                ctx.drawImage(img, canvas.width - img.width / 2, canvas.height - img.height / 2);
                ctx.restore();

            } else {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            }

            var compressedDataUrl;
            if (shouldCompress) {
                compressedDataUrl = canvas.toDataURL(dataURL.type, 0.2);
            } else {
                compressedDataUrl = canvas.toDataURL(dataURL.type, 1);
            }
            callBack(compressedDataUrl, img.width/img.height);
        }
    }
     // 图片压缩
    $.imgCompress = function (dataURL, callBack, shouldCompress = false) {
        
        var img = new window.Image();
        img.src = dataURL.result;
        img.onload = function () {
          
            console.log('width',img.width,'height',img.height)
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            canvas.width = img.width*0.5;
            canvas.height = img.height*0.5;
            var per= img.width/img.height;
            EXIF.getData(img, function(){
                var d=EXIF.getTag(this, 'Orientation');
              console.log(d)  
                
                if (!!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
                    
                    // iOS
                    if(d==1)
                    {
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                        per= img.width /img.height 
                    }
                    else if(d==3)
                    {
                      
                        ctx.translate(canvas.width / 2, canvas.height / 2);
                        ctx.rotate(180 * Math.PI / 180); //旋转47度
                        ctx.translate(-canvas.width, -canvas.height);
                        ctx.drawImage(img, canvas.width - img.width / 2, canvas.height - img.height / 2);
                        ctx.restore();
                        per= img.width /img.height 
                    }
                    else
                    {
                        canvas.width = img.height;
                        canvas.height = img.width;
                        ctx.translate(canvas.width / 2, canvas.height / 2);
                        ctx.rotate(90 * Math.PI / 180); //旋转47度
                        ctx.translate(-canvas.width, -canvas.height);
                        ctx.drawImage(img, canvas.width - img.width / 2, canvas.height - img.height / 2);
                        ctx.restore();
                        per=img.height / img.width
                    }
                   
                    console.log('ios',per)

                } else {
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                }

                var compressedDataUrl;
                if (shouldCompress) {
                    compressedDataUrl = canvas.toDataURL('image/jpeg', 0.2);
                } else {
                    compressedDataUrl = canvas.toDataURL('image/jpeg', 0.2);
                }
                console.log(per)
                callBack(compressedDataUrl,per);
            })
        }
    }
    // 将file转成dataUrl
    $.transformFileToDataUrl= function (file,callBack) {
        
        var imgCompassMaxSize = 200 * 1024; // 超过 200k 就压缩
   
        // 存储文件相关信息
        // imgFile.type = file.type || 'image/jpeg'; // 部分安卓出现获取不到type的情况
        // imgFile.size = file.size;
        // imgFile.name = file.name;
        // imgFile.lastModifiedDate = file.lastModifiedDate;
    
        // 封装好的函数
        var reader = new FileReader();
    
        // file转dataUrl是个异步函数，要将代码写在回调里
        reader.onload = function (e) {
            var result = e.target.result;
            var imgObj={};
            imgObj.type = file.type || 'image/jpeg'; // 部分安卓出现获取不到type的情况
            imgObj.size = file.size;
            imgObj.name = file.name;
            imgObj.lastModifiedDate = file.lastModifiedDate;
            imgObj.result=result;

            if (imgObj.result.length < imgCompassMaxSize) {
                
                $.imgCompress(imgObj, callBack,false); // 图片不压缩
            } else {
                
                $.imgCompress(imgObj,callBack,false); // 图片压缩
            }
        };
    
        reader.readAsDataURL(file);
    }
    //获取图片地址列表
    $.imgSrc=function (richText){
        var srcArr = []
        var imgReg = /<img.*?(?:>|\/>)/gi //匹配图片中的img标签
        var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i // 匹配图片中的src
        var str = richText;
        var arr = str.match(imgReg)||[] //筛选出所有的img
        
        for (let i = 0; i < arr.length; i++) {
            var src = arr[i].match(srcReg)
            // 获取图片地址
            srcArr.push(src[1])
        }
        return srcArr 
    }
    $.itemData=function (datas,callBack){
        var i=0;
        return function(){
            var next=arguments.callee
            if(i>=datas.length)
            {
                callBack()
                return
            }
            var imgUrls=$.imgSrc(datas[i]);
             $.imgLoaders(imgUrls,function(){
                i++
                next()
            })();
            
            
        }

    }

    $.imgLoaders= function (imgUrls,callBack){
        var index=0;
        return function(){
            var next=arguments.callee
            if(index>=imgUrls.length)
            {
                callBack()
                return 
            }
            var img=new Image();  
            img.src=imgUrls[index];  
            img.onload=function(){
                index++
                next()
            };  
            img.onerror=function(){
                index++
                next()
            };  
        }
     
    }
  
    $.countDown=function(callback){
        if (typeof callback !='function'){
          console.error('请传入function对象')
          return 
        }
        let time=arguments[1]||60;
        let timmer=null;
        return ()=>{
          timmer=setInterval(()=>{
           
            if (time<0)
            {
              callback(time)
              clearInterval(timmer)
              return 
            }
            callback(time)
            time--
          },1000)
        }
      }
})(jQuery)

