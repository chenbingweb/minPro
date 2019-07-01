function _CustomMap(ele){
    this.imgs=['../../../imgs/img/map/map.png'];

    this.data=[
        {
            img:'../../../imgs/img/map/map.png',
            pos:[{
                city:'张家镇3',
                value:0,
                target:120,
                pos_x:250,
                pos_y:144,
                children:[
                    {
                        img:'../../../imgs/img/map/zhong_shang.png',
                        pos:[
                            {
                                city:'张家镇4',
                                value:0,
                                target:120,
                                pos_x:250,
                                pos_y:144
                            }
                        ]
                    }
                ]
            },
            {
                city:'张家镇2',
                value:0,
                target:120,
                pos_x:156,
                pos_y:280,
                children:[
                    {
                        img:'../../../imgs/img/map/zhong_shang.png',
                        pos:[
                            {
                                city:'张家镇4',
                                value:0,
                                target:120,
                                pos_x:250,
                                pos_y:144,
                            }
                        ]
                    }
                ]
            }
             ]
        }
    ]
    this.ele=$(ele);
    this.copy=[...this.data]
    this.init(this.data)
    // this.setData(0)
    
}
_CustomMap.prototype.reLoad=function(){
    this.ele.empty();
    this.init(this.copy)
}
_CustomMap.prototype.setData=function(index){
    this.data[index].arrFn.forEach(function(item){
       item()
    })
  
}
_CustomMap.prototype.play=function(arrFn){
  
    arrFn.forEach(function(item){
        
        item()
     })
}
_CustomMap.prototype.init=function(data){
    var that=this;
    data.forEach(function(item){
        var arrFn=[]
        var div = $('<div class="img" style="transform: scale(0); transition: 0.7s all linear;;background-image:url('+item.img+')"> </div>')
        item.pos.forEach(function(child,_index){
            var d_1=$('<div class="pos" style="opacity:0;left:'+child.pos_x+'px;top:'+child.pos_y+'px"></div>')
            var d_2=$('<div class="address_name"><p>'+child.city+'</p></div>');
            var d_3=$('<div class="pos_line"></div>')
            var d_4=$('<p class="pop_num">0</p>')
            var d_5=$('<p class="line"></p>');
            d_1.append(d_2)
            d_2.append(d_3)
            d_3.append(d_4).append(d_5);
            div.append(d_1);
            if(child.children)
            {
                d_1.click(function(){
                    div.remove()
                    that.init(child.children)
                    console.log(item)
                  //  that.play(item.arrFn)
                   // that.setData(0)
                })
            }
           
            //添加动画
            var fn=function(){
                item.pos.forEach(function(child,__index){
                    console.log(child)
                    anime({
                        targets: d_1[0],
                        opacity: 1,
                        delay: 500*__index,
                        complete:function(){
                            anime({
                                targets: child,
                                value: child.target,
                                easing: 'linear',
                                round: 1,
                           
                                update: function() {
                                    d_4.html(child.value)
                                }
                              });
                            
                            anime({
                                targets: d_5[0],
                                height: 50,
                                delay: 500*__index,
                                
                            });
                        }
                    });

                })
            }
            arrFn.push(fn)
            // div.append('<div class="pos" style="left:'+child.pos_x+'px;top:'+child.pos_y+'px">'
            // +'<div class="address_name"><p>'+child.city+'</p></div>'
            // +'<div class="pos_line"><p class="value_'+_index+'">0</p><p class="line"></p></div>'
            // +'</div> ')
            
        })
        item.arrFn=arrFn;
        
        that.ele.append(div);
       
        // anime({
        //     targets: div[0],
        //     translateX: 0,
        //     opacity:1,
          
        //     complete:function(){
                
        //         anime({
        //             targets: div[0],
                  
        //             scale: 1.001,
                    
        //            // rotate: '1turn'
        //             complete:function(){
                      
        //             }
        //         });
        //     }
        //    // rotate: '1turn'
            
        // });
        setTimeout(()=>{
            div.css({
                transform: 'scale(1)',
                opacity: 1
            })
            setTimeout(function(){
                that.play(arrFn)
            },500)
           
        },500)
        
      that.change()
      
       
      
    })

       
}
_CustomMap.prototype.num3=function(data,ele){
    var targets=data
    return function(){
        anime({
            targets: targets,
            value:targets.target,
            easing: 'linear',
            round: 1,
            delay: 1000,
            update: function() {
                ele.innerHTML = targets.value
            }
          });
    }
 
}
_CustomMap.prototype.change=function(){
    new _Pie('pie_1')
    var bar= new _Bar('bar_1');
    new _Tree("tree")
    new _Areas('area')
    new Arrow('#custom_bar')
    var num =  new Num({
        ele:'#num',
        imgs:['./imgs/num/0.png','./imgs/num/1.png','./imgs/num/2.png','./imgs/num/3.png','./imgs/num/4.png','./imgs/num/5.png','./imgs/num/6.png','./imgs/num/7.png','./imgs/num/8.png','./imgs/num/9.png'],
        width:43,
        height:67,
        num:473434,
        bg:'./imgs/img/mun_bg.png'
    })
    new _WorldCloud('words')
    new _Range('.range_data')
    var that=this;
    $.each($('.num_item'),function(index,item){
        var data={value:0,target:parseInt($(item).attr('data-num'))}
            that.num3(data,item)()
      
    })
    
}