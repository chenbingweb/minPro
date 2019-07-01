
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
