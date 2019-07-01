function _Range(ele){
    this.ele = $(ele);
    this.data=[
        {
            address:'山东',
            shop_name:'XXX农产品自营店',
            value:parseInt(Math.random()*10000),
            flag:Math.random()>0.5 ? true :false
        },
        {
            address:'山东',
            shop_name:'XXX农产品自营店',
            value:parseInt(Math.random()*10000),
            flag:Math.random()>0.5 ? true :false
        },
        {
            address:'山东',
            shop_name:'XXX农产品自营店',
            value:parseInt(Math.random()*10000),
            flag:Math.random()>0.5 ? true :false
        },
        {
            address:'山东',
            shop_name:'XXX农产品自营店',
            value:parseInt(Math.random()*10000),
            flag:Math.random()>0.5 ? true :false
        },
        {
            address:'山东',
            shop_name:'XXX农产品自营店',
            value:parseInt(Math.random()*10000),
            flag:Math.random()>0.5 ? true :false
        },
        {
            address:'山东',
            shop_name:'XXX农产品自营店',
            value:parseInt(Math.random()*10000),
            flag:Math.random()>0.5 ? true :false
        },
        {
            address:'山东',
            shop_name:'XXX农产品自营店',
            value:parseInt(Math.random()*10000),
            flag:Math.random()>0.5 ? true :false
        },
        {
            address:'山东',
            shop_name:'XXX农产品自营店',
            value:parseInt(Math.random()*10000),
            flag:Math.random()>0.5 ? true :false
        }
    ]
    this.init()
}
_Range.prototype.init=function(){
    this.ele.empty()
    var that = this;
    this.data.forEach(function(item,index){
        var str ='<li class="rang_li">'
        if(index<3)
        {
            str +='<span class="rang_'+(index+1)+'">'+(index+1)+'</span>'
        }
        else
        {
            str +='<span class="rang_4">'+(index+1)+'</span>'
        }

        str+='<span>'+item.address+'</span>'
        +'<span>'+item.shop_name+'</span>'
        +'<span>'+item.value+'</span>'

        str+= item.flag ? '<span class="range_up"></span></li>' :'<span class="range_down"></span></li>'
        that.ele.append(str)
    })
}