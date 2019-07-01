
function Poster(canvas,scroll){
    // this.height=document.body.offsetHeight*0.8,
    this.scale=1;
    //海报比例设置
    this.PSDW=750*this.scale;
    this.PSDH=1334*this.scale;
    this.scroll=scroll
    this.per = this.PSDW/this.PSDH;
    //初始化海报容器
   
    this.clientX=0;
    this.clientY=0;
    this.isGesture=false;
    this.currentPhotoX=0;//当前图片地址位置
    this.currentPhotoY=0;//当前图片地址位置
    this.currentPhotoScale=[1,1];
    this.startDis=0;
    // this.width=document.body.offsetWidth;
    this.tempObj_1={};
    this.tempObj_2={};
    this.tempObj_3={};
    //标语模板img
    this.BY=[];
    //当前标语
    this.currentBY=0;
    //当前模板
    this.currentTemp=0;
    //获取上个页面的缓存数据
    this.localData={}
    this.initContent(canvas);
    this.pathBase="../images/"
}
//获取本地数据
Poster.prototype.GetData=function(){
    /** 
     * 
  window.sessionStorage.setItem('info',JSON.stringify({
            photoImg:'../images/2.jpg',
            user_name:'张三',
            user_date:'2019-08-08',
            user_days:100,
            user_address:'北京'
        }))
     * 
     * 
    */
    try{

        this.localData= JSON.parse( window.sessionStorage.getItem('info') );
    }catch(e){
        
    }
}
//获取标语图片信息
Poster.prototype.BYImg=function(path,imgsArr,currentObj,callBack){
    var path =path;// "../images/poster/temp_1/"
    var imgsArr =imgsArr;// ['f1.png','f2.png'];
    var i=0;
    var that=this;
    var _imgs=[]
    return function(){
        var next=arguments.callee;
        if(i>=imgsArr.length)
        {
        

            currentObj.BY=_imgs;
            callBack && callBack(_imgs)
            return 
        }
        var img =new Image();
        img.src=path + imgsArr[i];
        img.onload=function(){
           
            _imgs.push({
                width:img.width,
                height:img.height,
                path:img.src
            })
            i++;
            next()
            
        }
    }
}
//加载所有图片
Poster.prototype.LoadAllBY=function(callBack){
    var index=0;
    var that=this;
    var pathBase=that.pathBase;
    var path = ["../images/poster/temp_1/","../images/poster/temp_2/"];
    var obj =[this.tempObj_1,this.tempObj_2];
    var imgsArr = [['f1.png','f2.png','f3.png','f4.png','f5.png','f6.png'],['f1.png','f2.png','f3.png','f4.png','f5.png','f6.png']];
    
    //console.log(pos)
    return function(){
                var next = arguments.callee;
                if(index>=imgsArr.length)
                {
                    callBack()
                
                }
                if(imgsArr[index])
                {
                    that.BYImg(path[index],imgsArr[index],obj[index],function(){
                
                    
                        index++;
                        next()
                    })()
                }
                
    }  
}
//设置海报图片容器大小
Poster.prototype.initContent=function(canvas){
    //获取容器dom
    this.cv = document.getElementById(canvas);
    //获取容器css 样式
    var style = window.getComputedStyle ? window.getComputedStyle(this.cv, "") : this.cv.currentStyle;
    //获取容器宽度
    this.width= parseFloat(style.width) || document.body.offsetWidth;
    //计算出容器的高度
    var height =  this.width / this.per;
    //将计算出的高度赋值到容器
    this.cv.style.height = height+'px';
    //实例zrender对象
    this.zr = zrender.init(this.cv,{
        renderer:'canavs'
    });
    this.w = this.zr.getWidth();
    this.h = this.zr.getHeight();
    var that = this;
    this.GetData()
    this.LoadAllBY(function(){
        that.tempArr(0)
       that.init()
    })()
    // this.BYImg(path,imgsArr,this.tempObj_1,function(){
    //     that.tempArr(0)
    //     that.init()
    // })()

    
    
}
Poster.prototype.clear=function(){
    if(this.tempObj_1.logo ||  this.tempObj_1.logo_2)
    {
        this.zr.remove(this.tempObj_1.logo)
        this.zr.remove(this.tempObj_1.logo_2)
        this.zr.remove(this.tempObj_1.text)
        this.zr.remove(this.tempObj_1.biao_yu)
        this.zr.remove(this.tempObj_1.text)
    }
    if(this.tempObj_2.logo  || this.tempObj_2.rect||this.tempObj_2.bg||this.tempObj_2.sq_4)
    {
        this.zr.remove(this.tempObj_2.logo)
        this.zr.remove(this.tempObj_2.rect)
        this.zr.remove(this.tempObj_2.bg)
        this.zr.remove(this.tempObj_2.sq_4)
        this.zr.remove(this.tempObj_2.bu_fan)
        this.zr.remove(this.tempObj_2.biao_yu)
        this.zr.remove(this.tempObj_2.text)//removeAll
       // this.tempObj_2.group_info.removeAll()
        this.zr.remove(this.tempObj_2.group_info)
        //  this.zr.remove(this.tempObj_2.line)
         //    group_info.add(this.tempObj_2.info);
   // group_info.add(this.tempObj_2.line)
    }
    if(this.tempObj_3.logo ||  this.tempObj_3.logo_2)
    {
        this.zr.remove(this.tempObj_3.logo)
        this.zr.remove(this.tempObj_3.logo_2)
    }
}
//模板选择
Poster.prototype.tempArr=function(index){
    var that=this;
    this.currentTemp=index;
    var temps =[];
    temps[0]=that.temp_1.bind(this);
    temps[1]=that.temp_2.bind(this);
    temps[2]=that.temp_3.bind(this);
    return (temps[index])()

}
//标语切换
Poster.prototype.changeBY=function(index){
    this.currentBY=index;
    var biObj = this['tempObj_'+(this.currentTemp+1)].biao_yu;
    var BYimg = this['tempObj_'+(this.currentTemp+1)].BY[this.currentBY] || {}
    if(this.currentTemp==0)
    {
        biObj.attr('style',{
            image:BYimg.path,
            width:this.ToWith(BYimg.width),
            height:this.ToHeight(BYimg.height),
            x:this.ToWith(750-BYimg.width),
            y:this.ToHeight(716)
        })
    }
    if(this.currentTemp==1)
    {   
        biObj.attr('style',{
            image:BYimg.path,
            width:this.ToWith(BYimg.width),
            height:this.ToHeight(BYimg.height),
            x:this.ToWith(0),
            y:this.ToHeight(318)-this.ToHeight(BYimg.height)
        })
    }
   
}

Poster.prototype.temp_1=function(){
    //添加logo
    var that=this;
    this.clear();
    var BYimg= this['tempObj_'+(this.currentTemp+1)].BY[this.currentBY];
    console.log(BYimg)
    this.tempObj_1.logo = new zrender.Image({
        draggable:false,
        style: {
            image:'../images/poster/temp_1/logo.png',
            width:that.ToWith(153),
            height:that.ToHeight(43),
            x:that.ToWith(460),
            y:that.ToHeight(40)
        }
    });
    
    this.tempObj_1.logo_2 = new zrender.Image({
        draggable:false,
        style: {
            image:'../images/poster/temp_1/logo_1.png',
            width:that.ToWith(55),
            height:that.ToHeight(48),
            x:that.ToWith(646),
            y:that.ToHeight(36)
        }
    });
    this.tempObj_1.qrcode = new zrender.Image({
        draggable:false,
        style: {
            image:'../images/poster/temp_1/qrcode.png',
            width:that.ToWith(138),
            height:that.ToHeight(135),
            x:that.ToWith(574),
            y:that.ToHeight(1162)
        }
    });
    //标语
    this.tempObj_1.biao_yu=new zrender.Image({
        draggable:false,
        style: {
            image:BYimg.path,
            width:that.ToWith(BYimg.width),
            height:that.ToHeight(BYimg.height),
            x:that.ToWith(750-BYimg.width),
            y:that.ToHeight(716)
        }
    });
    this.tempObj_1.text=new zrender.Text({
        position:[ that.ToWith(44),that.ToHeight(1273) ],
        style:{
           
            text:'扫码生成专属海报，六万个红包等你拿！',//'邀请你参加',
            fontSize:that.ToWith(25),
            textFill:'#fff',
            textAlign:'left'
            
        }
    })
    //入职时间
    this.tempObj_1.jobTime=new zrender.Text({
        position:[ that.ToWith(70),that.ToHeight(1170) ],
        style:{
          
            text:'入职'+that.localData.user_days+'天',
            fontSize:that.ToWith(30),
            textFill:'#fff',
            textAlign:'left'
            
        }
    })
    //地址
    this.tempObj_1.address=new zrender.Text({
        position:[ that.ToWith(70),that.ToHeight(1110) ],
        style:{
            text:that.localData.user_address,
            fontSize:that.ToWith(40),
            textFill:'#fff',
            textAlign:'left'
            
        }
    })
  
    var addressLen = this.tempObj_1.address.getBoundingRect().width;
    //姓名
    this.tempObj_1.userName=new zrender.Text({
        position:[ that.ToWith(70),that.ToHeight(1110) ],
        style:{
            text:that.localData.user_name,
            fontSize:that.ToWith(40),
            textFill:'#fff',
            textAlign:'left',
            fontWeight:'bold'
        }
    })
  
  
    var pos =[that.ToWith(70)+addressLen+that.ToWith(20),that.ToHeight(1110) ]
    this.tempObj_1.userName.attr('position',pos)
    this.tempObj_1.text.attr('z',110);
    this.tempObj_1.logo.attr('z',100);
    this.tempObj_1.logo_2.attr('z',100);
    this.tempObj_1.qrcode.attr('z',110);
    this.tempObj_1.jobTime.attr('z',100);
    this.tempObj_1.userName.attr('z',100);
    this.tempObj_1.address.attr('z',100);
    this.tempObj_1.biao_yu.attr('z',100);
    this.zr.add(this.tempObj_1.logo);
    this.zr.add(this.tempObj_1.logo_2);
    this.zr.add(this.tempObj_1.qrcode);
    this.zr.add(this.tempObj_1.text);
    this.zr.add(this.tempObj_1.jobTime);
    this.zr.add(this.tempObj_1.address);
    this.zr.add(this.tempObj_1.userName);
    this.zr.add(this.tempObj_1.biao_yu);
    
}
Poster.prototype.temp_2=function(){
    //添加logo
    var that=this;
    var BYimg= this['tempObj_'+(this.currentTemp+1)].BY[this.currentBY];
    console.log(BYimg)
    this.clear()
    // 背景颜色
    this.tempObj_2.rect=new zrender.Rect({
        shape:{
            x:0,
            y:0,
            width:that.ToWith(750),
            height:that.ToHeight(1334)
        },
        style:{
            fill: '#fff'
        }

    })
    //logo
    this.tempObj_2.logo = new zrender.Image({
        draggable:false,
        style: {
            image:that.pathBase+'/poster/temp_2/logo_1.png',
            width:that.ToWith(259),
            height:that.ToHeight(53),
            x:that.ToWith(50),
            y:that.ToHeight(60)
        }
    });
    //标语
    this.tempObj_2.biao_yu=new zrender.Image({
        draggable:false,
        style: {
            image:BYimg.path,
            width:that.ToWith(BYimg.width),
            height:that.ToHeight(BYimg.height),
            x:that.ToWith(0),
            y:this.ToHeight(318)-this.ToHeight(BYimg.height)
        }
    });
    //图片
    this.tempObj_2.bg = new zrender.Image({
        draggable:false,
        style: {
            image:that.pathBase+'/poster/temp_2/bg_2.png',
            width:that.ToWith(736),
            height:that.ToHeight(733),
            x:that.ToWith((750-736)),
            y:that.ToHeight(270)
        }
    });
    //图片
    this.tempObj_2.bu_fan = new zrender.Image({
        draggable:false,
        style: {
            image:that.pathBase+'/poster/temp_2/bu_fan.png',
            width:that.ToWith(581),
            height:that.ToHeight(392),
            x:that.ToWith(40),
            y:that.ToHeight(754)
        }
    });
    this.tempObj_2.text=new zrender.Text({
        position:[ that.ToWith(44),that.ToHeight(1263) ],
        style:{
            text:'扫码生成专属海报，六万个红包等你拿！',//'邀请你参加',
            fontSize:that.ToWith(25),
            textFill:'#595758',
            textAlign:'left'
            
        }
    })
    var points=[
                    [that.ToWith(0),that.ToHeight(0)],
                    [that.ToWith(750),that.ToHeight(0)],
                    [that.ToWith(750),that.ToHeight(270)],
                    [that.ToWith(270),that.ToHeight(407)],
                    [that.ToWith(345),that.ToHeight(970)],
                    [that.ToWith(750),that.ToHeight(862)],
                    [that.ToWith(750),that.ToHeight(1334)],
                    [that.ToWith(0),that.ToHeight(1334)],
                    [that.ToWith(0),that.ToHeight(0)]
                    
                ]
 
    this.tempObj_2.sq_4=new zrender.Polyline({
        culling:false,
        shape:{
            
            points:points,
           
        },
        style:{
            stroke:null,
            fill:'#fff'
        }
    })
    //裁减
    var points_2=[
        [that.ToWith(0),that.ToHeight(407)],
        [that.ToWith(270),that.ToHeight(407)],
        [that.ToWith(345),that.ToHeight(970)],
        [that.ToWith(345),that.ToHeight(1042)],
        [that.ToWith(0),that.ToHeight(1042)]
    ]
    this.tempObj_2.sq_5=new zrender.Polyline({
        culling:false,
        shape:{
            
            points:points_2,
           
        }
        
    })
    
    var text = that.localData.user_address +'  '+that.localData.user_name+'  '+'入职'+that.localData.user_days+'天'
    //地址
    this.tempObj_2.info=new zrender.Text({
        // position:[ that.ToWith(70),that.ToHeight(1110) ],
        // position:[ 0,0],
        style:{
            text:text,
            fontSize:that.ToWith(30),
            textFill:'#7f7f7f',
            textAlign:'left'
            
        }
    })
    var infoLen = this.tempObj_2.info.getBoundingRect().width;
    this.tempObj_2.line= new zrender.Line({
        style:{
            stroke:'#7f7f7f',
        },
        shape:{
            x1:infoLen+that.ToWith(10),
            y1:that.ToHeight(26) ,
            x2:infoLen+that.ToWith(50),
            y2:that.ToHeight(26)
        }
    })
    //用户信息
    this.tempObj_2.group_info = new zrender.Group({
        position:[that.ToWith(99),that.ToHeight(326)],
        rotation: 13 * Math.PI / 180,
    });
    this.tempObj_2.group_info.add(this.tempObj_2.info);
   // this.tempObj_2.group_info.add(this.tempObj_2.line)
    this.tempObj_2.bg.setClipPath(this.tempObj_2.sq_5)
    this.tempObj_2.bg.attr('z',100)
    this.tempObj_2.logo.attr('z',110);
    this.tempObj_2.sq_4.attr('z',100);
    this.tempObj_2.text.attr('z',100);
    this.tempObj_2.bu_fan.attr('z',100);
    this.tempObj_2.biao_yu.attr('z',100);

    this.tempObj_2.info.attr('z',100);
    this.tempObj_2.line.attr('z',100);

    this.zr.add(this.tempObj_2.rect);
     this.zr.add(this.tempObj_2.logo);

     this.zr.add(this.tempObj_2.sq_4);
     this.zr.add(this.tempObj_2.bg);
     this.zr.add(this.tempObj_2.text);
     this.zr.add(this.tempObj_2.bu_fan);
    this.zr.add(this.tempObj_2.biao_yu);
    this.zr.add(this.tempObj_2.group_info)

}
Poster.prototype.temp_3=function(){
    
    //添加logo
    var that=this;
    this.clear()
    return
    this.tempObj_3.logo = new zrender.Image({
        draggable:false,
        style: {
            image:'../images/poster/temp_1/logo.png',
            width:that.ToWith(153),
            height:that.ToHeight(43),
            x:that.ToWith(460),
            y:that.ToHeight(100)
        }
    });
    
    this.tempObj_3.logo_2 = new zrender.Image({
        draggable:false,
        style: {
            image:'../images/poster/temp_1/logo_1.png',
            width:that.ToWith(55),
            height:that.ToHeight(48),
            x:that.ToWith(646),
            y:that.ToHeight(0)
        }
    });
    this.tempObj_3.logo.attr('z',100);
    this.tempObj_3.logo_2.attr('z',100);

    this.zr.add(this.tempObj_3.logo);
    this.zr.add(this.tempObj_3.logo_2);
}
Poster.prototype.drawBgImg=function(bg_img){
    var that=this;
    var bgImg = new zrender.Image({
        draggable:false,
        style: {
            image:bg_img,
            width:that.w,
            height:that.h,
            x:0,
            y:0
        }
    });
    this.setName('sdfasdf');
    this.zr.add(bgImg);
    bgImg.attr('z',0);
}
//添加姓名
Poster.prototype.setName=function(name){
    var nickname=new zrender.Text({
        style:{
            textOrigin:[0.0],
            text:name,//'邀请你参加',
            fontSize:this.ToWith(30),
            textFill:'#000',
            textAlign:'center'
        }
    })
    console.log(nickname.style)
    nickname.position=[(this.w-nickname.getBoundingRect().width)/2+(nickname.getBoundingRect().width/2),this.ToHeight(20)];
    nickname.attr('z',100);
    this.zr.add(nickname);
}
//添加用户头像
Poster.prototype.addPhoto=function(img){
    var photo= new Image()
    photo.src=img;
    var that=this;
    photo.onload=function(){
        console.log(this.width)
       var w=this.width;
       var h=this.height;
        var photoImg =that.photoImg = new zrender.Image({
            draggable:true,
            scale:[2,2],
            origin:[that.ToWith(w)/2,that.ToHeight(h)/2],
            style: {
                image:img,
                width:that.ToWith(w),
                height:that.ToHeight(h),
                x:0,
                y:0,
               
            }
        });
        console.log(photoImg.origin)
        photoImg.attr('z',60);
        
        photoImg.on("mousedown",function(){
            that.scroll.disable()
             $('html')[0].style.pointerEvents='none'
             document.body.addEventListener('touchmove', function (e) {
                e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
              }, {passive: false});
            // document.body.style.pointerEvents='none'
        })
        photoImg.on("mouseup",function(){
            console.log(2)
            that.scroll.enable()
            $('html')[0].style.pointerEvents='all'
             document.body.style.pointerEvents='all'
        })
        that.zr.add(photoImg);
    }
  
}
Poster.prototype.resetImg=function(img){
    this.photoImg.attr('style',{
        image:img
    })
}
Poster.prototype.init=function(){

   // this.drawBgImg('../images/6.png');
    this.addPhoto(this.localData.photoImg);
    this.Event()

  //  this.Rose()
}
Poster.prototype.getPiontScale=function(Piont1,Piont2){
    // 勾股定理.
    var x = Piont1.pageX - Piont2.pageX,
        y = Piont1.pageY - Piont2.pageY;
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y,2));
},
//绑定事件
Poster.prototype.Event=function(){
    var that=this;

    this.cv.addEventListener('touchstart', function(e){
        var touches = e.targetTouches;
       
        if(touches.length>=2)
        { that.scroll.disable()
            document.body.style.overflow='hidden'
            that.currentPhotoScale=that.photoImg.scale
            console.log(3,that.currentPhotoScale)
            that.startDis = that.getPiontScale(touches[0],touches[1]);
            that.photoImg.attr('draggable',false)
        }
        else
        {
            that.isGesture=false;
            
            that.clientX = touches[0].clientX;
            that.clientY = touches[0].clientY;
            //获取当前图片位置
            that.currentPhotoX=that.photoImg.style.x;//当前图片地址位置
            that.currentPhotoY=that.photoImg.style.y;//当前图片地址位置
           
            console.log(that.photoImg.style.x)
            // that.blobX = that.blobLayer.position().x;
            // that.blobY = that.blobLayer.position().y;
           
          
        }
      //  that.blobLayer.zIndex(-12)
       
    }, false);
    this.cv.addEventListener('touchmove', function(e){
        var touches=e.targetTouches;
        if(touches.length>=2)
        {
            // 缩放后两指的距离
            var nowDis = that.getPiontScale(touches[0],touches[1]);
            // 比例.
            var scale=(nowDis-that.startDis)/that.startDis;
            
            console.log(scale)
            var x1 =that.x1 = scale*0.12+that.currentPhotoScale[0];
            var y1 =that.y1= scale*0.12 +that.currentPhotoScale[1];
            if(x1<=0||y1<=0)
            {
                x1=0;
                y1=0
            }
             that.photoImg.attr('scale',[x1,y1])
         
        }

    }, false);
    this.cv.addEventListener('touchend', function(e){
        console.log(that.x1,that.y1)
        document.body.style.overflow='scroll'
        that.currentPhotoScale=that.photoImg.scale;
        that.photoImg.attr('draggable',true)
        that.scroll.enable()
        console.log('end',that.currentPhotoScale)
    }, false);
}
//生成图片
Poster.prototype.canvasToImg= function (canvas,callBack){
    var data = canvas.toDataURL('image/png', 1);  //1表示质量(无损压缩)
    console.log(data)
    var img=new Image()
    img.src = data;
    img.onload=function(){
        callBack(img)
    //  $('body').append(img)
    }

}

Poster.prototype.ToWith=function(width){
      
    var totalW=this.PSDW;
    return this.w*(width*this.scale/totalW)
    
}
Poster.prototype.ToHeight=function(height){
  
    var totalW= this.PSDH;
    return this.h*(height*this.scale/totalW)
    
}

/** 
 const zrender=window.zrender

export default class Poster{
    constructor(ele){
        this.zr = zrender.init(ele,{
            renderer:'canavs'
        });
        this.w = this.zr.getWidth();
        this.h = this.zr.getHeight();
       console.log(this.w, this.h)
    }
    ToWith(width){
      
        var totalW=686;
        return this.w*(width/totalW)
        
    }
    ToHeight(height){
  
        var totalW=886;
        return this.h*(height/totalW)
        
    }
    drawImg(bg_img,text,qrcode,callBack,moveY=226){
        //背景图片
        var bgImg = new zrender.Image({
                
            style: {
                image:bg_img,//../../../public/images/wechat/show.png',
                width:this.w,
                height:this.h,
                x:0,
                y:0
            }
        });
        this.zr.add(bgImg);
        var nickname=new zrender.Text({
            style:{
               
                textOrigin:[0.0],
                text:text,//'邀请你参加',
                fontSize:this.ToWith(40),
                textFill:'#000',
                textAlign:'center'
            }
        })
        nickname.position=[(this.w-nickname.getBoundingRect().width)/2+(nickname.getBoundingRect().width/2),this.ToHeight(46)];
        this.zr.add(nickname);
        var qr = new zrender.Image({
                
            style: {
                image:qrcode,//../../../public/images/wechat/show.png',
                width:this.ToWith(440),
                height:this.ToWith(440),
                x:this.w/2-this.ToWith(440)/2,
                y:this.ToWith(moveY)
            }
        });
        this.zr.add(qr);
        callBack && callBack()
    }
    
}

*/