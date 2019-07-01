function Arrow(ele){
    this.ele=$(ele);
    this.data=[
       {
           name:'京东',
           value:'125',
           color:'#589dfa'
       },
       {
        name:'淘宝',
        value:'89',
        color:'#589dfa'
       },
       {
        name:'拼多多',
        value:'98',
        color:'#589dfa'
       },
       {
        name:'聚美',
        value:'98',
        color:'#589dfa'
       },
       {
        name:'虎扑',
        value:'125',
        color:'#589dfa'
       },
       {
        name:'小红书',
        value:'45',
        color:'#589dfa'
       }
    ]
    setTimeout(() => {
        this.init()
        
    }, 1000);
   
}
Arrow.prototype.init=function(){
    var that=this;
    that.ele.empty()
    this.data.forEach(function(item,index){
        that.ele.append('<li class="bar_box">'
        +'<span>'+item.name+'</span>'
        +'<span class="process">'
        +'<span class="p_bar p_bar_'+index+'" style="background:'+item.color+'"></span>'
        +'</span>'
        +'<span>'+item.value+'</span>'
        +'</li>')
      
       console.log((item.value/125)*100)
        anime.timeline().add({
            targets: '.p_bar_'+index,
            width: ((item.value/125)*100) +'%',
            easing: 'easeOutExpo',
            delay: index * 100
          })
    })


}