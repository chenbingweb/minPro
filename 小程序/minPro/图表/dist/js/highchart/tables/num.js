function Num(param){
    this.imgs=param.imgs;
    this.ele=$(param.ele);
    //合作宽高
    this.width=param.width;
    this.height=param.height;
    this.total=param.num;
    this.ele_bg_img=param.bg
    this.ele.empty()
    //debugger
   this._1= this.init()
   this._2 = this.init()
   this._3 = this.init()
   this._4 = this.init()
   this._5 = this.init()
   this.num=0;
   var that=this;
   setTimeout(function(){
    that.change(that.total);
   },2)
   
}
Num.prototype.init=function(){
    
    this.ele.css({
        'perspective':'303300px',
        overflow:'hidden',
    })
    var parent_1=$('<div></div>').css({
        width:  this.width+'px',
        height: this.height+'px',
        background:'url('+this.ele_bg_img+') no-repeat center bottom',
        backgroundSize:'100%',
      
    })
    var parent =$('<div></div>').css({
        width:  this.width+'px',
        height: this.height+'px',
        'transform-style': 'preserve-3d',
        'position':'relative',
        transition: 'transform 1s linear'
    })
    parent_1.append(parent)
  
    var per =360/this.imgs.length;
    var deg = Math.PI/180 * per;
    var z =  (this.height/2)/ Math.tan(deg/2);
    console.log(z)
    this.imgs.forEach(function(item,index){
        
        var child=$('<div></div>').css({
            'backface-visibility':'hidden',
            position: 'absolute',
            left: 0,
            top:0,
            right: 0,
            bottom: 0,
            background: 'url('+item+') no-repeat center center',
            'background-size': '100% 100%',
            transform:'rotateX('+(-per*index)+'deg) translateZ('+z+'px)'
        })

      
        parent.append(child)
    })
    this.ele.append(parent_1);
    return parent
    // this.move()
}
Num.prototype.start=function(){
    var that=this;
   this.timmer= setInterval(function(){
        if(that.num>=that.total)
        {
           
            clearInterval(that.timmer)
            return
        }
        that.move(that.num++)
    },30)
}
Num.prototype.change=function(num){

    this._1.css({
        transform:'rotateX('+parseInt(num/10000%10)*36+'deg)',
        'transition-delay': '0.5s'
    })
    this._2.css({
        transform:'rotateX('+parseInt(num/1000%10)*36+'deg)',
        'transition-delay': '0.3s'
    })
    this._3.css({
        transform:'rotateX('+parseInt(num/100%10)*36+'deg)',
        'transition-delay': '0.1s'
    })
    this._4.css({
        transform:'rotateX('+parseInt(num/10%10)*36+'deg)',
        'transition-delay': '0'
    })
    this._5.css({
        transform:'rotateX('+parseInt(num/1%10)*36 +'deg)'
    })
}
Num.prototype.move=function(i){
    this._1.css({
        transform:'rotateX('+i/100+'deg)'
    })
    this._2.css({
        transform:'rotateX('+i/10+'deg)'
    })
    this._3.css({
        transform:'rotateX('+i +'deg)'
    })
}
/** 
 *   that.parent.css({
            transform:'rotateX('+that.deg+'deg)'
        })
 * 
 * 
*/
Num.prototype.transform=function(num,index){
    var per =360/num;
    var deg = Math.PI/180 * per;
    
    var z =  (this.height/2)/ Math.tan(deg/2);
    console.log('rotateX('+per*index+'deg) translateZ('+z+'px);')
    return 'rotateX('+deg*index+'deg) translateZ('+z+'px);'
}