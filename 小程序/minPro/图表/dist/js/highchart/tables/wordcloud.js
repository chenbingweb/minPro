function _WorldCloud(ele){
    this.ele=ele;
    var text = '女士短裙 女士短裙 女士短裙 蕾丝花边连衣裙 足球袜 男士羽毛球拍 小米4S手机8G 华为NOTE10 花牛苹果 富士苹果 飞利浦剃须刀 防水剃须刀 辅食 睡袋 户外帐篷AOC21寸显示器 2019年新款女装 老人代步车 LV新款女包高仿  儿童玩具  高端家装饰品 外贸百货 雨靴  蕾丝男装 清朝风格画 小龙虾 大闸蟹 生鲜 ';
    var data = text.split(/[,\. ]+/g)
    .reduce(function (arr, word) {
        var obj = arr.find(function (obj) {
            return obj.name === word;
        });
        if (obj) {
            obj.weight += 1;
        } else {
            obj = {
                name: word,
                weight: 1
            };
            arr.push(obj);
        }
        return arr;
    }, []);
    this.options= {
        tooltip:{
            enabled:false
        },
      
        series: [{
           
            type: 'wordcloud',
            data: data,
            style:{ cursor:'pointer',margin:'20px 20px 20px 20px',padding:'20px 20px 20px 20px'},
           
            events:{
                click:function(ele){
                    console.log(ele.point)
                }
            }
        }],
        credits:{
            enabled:false
        },
        chart: {
        //    tyle:{margin:'20px 20px 20px 20px',transform: 'scale(1.2)'},
            type: 'wordcloud',
            backgroundColor:'transparent',
         
        },
        title: {
            enabled:false,
            text: ''
        }
        
    }
    this.init()
}
_WorldCloud.prototype.init=function(){
    
Highcharts.chart(this.ele, this.options);

}